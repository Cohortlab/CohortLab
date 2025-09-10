const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Developer = require('../models/Developer');
const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads', 'developer-resumes');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'developer-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only PDF and DOC/DOCX files
  if (file.mimetype === 'application/pdf' || 
      file.mimetype === 'application/msword' || 
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and DOC/DOCX files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// POST /api/developer - Create new developer application
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const {
      name,
      email,
      contactNumber,
      githubUrl,
      liveProjects,
      techStack,
      linkedinUrl,
      portfolioWebsite
    } = req.body;

    // Check if developer already exists
    const existingDeveloper = await Developer.findOne({ email });
    if (existingDeveloper) {
      // Delete uploaded file if developer already exists
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
      return res.status(400).json({
        status: 'error',
        message: 'Developer with this email already exists'
      });
    }

    // Validate required file upload
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Resume file is required'
      });
    }

    // Create new developer
    const developer = new Developer({
      name,
      email,
      contactNumber,
      githubUrl,
      liveProjects,
      techStack,
      linkedinUrl,
      portfolioWebsite,
      resume: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });

    await developer.save();

    res.status(201).json({
      status: 'success',
      message: 'Developer application submitted successfully',
      data: {
        id: developer._id,
        name: developer.name,
        email: developer.email,
        status: developer.status,
        appliedDate: developer.appliedDate
      }
    });

  } catch (error) {
    // Delete uploaded file if there's an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    console.error('Developer application error:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Failed to submit developer application'
    });
  }
});

// GET /api/developer - Get all developer applications (admin use)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};
    
    const developers = await Developer.find(query)
      .select('-resume.filename') // Don't expose file paths
      .sort({ appliedDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Developer.countDocuments(query);

    res.json({
      status: 'success',
      data: developers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get developers error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve developer applications'
    });
  }
});

// GET /api/developer/:id - Get specific developer application
router.get('/:id', async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id)
      .select('-resume.filename'); // Don't expose file paths
    
    if (!developer) {
      return res.status(404).json({
        status: 'error',
        message: 'Developer application not found'
      });
    }

    res.json({
      status: 'success',
      data: developer
    });
  } catch (error) {
    console.error('Get developer error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve developer application'
    });
  }
});

// PUT /api/developer/:id/status - Update application status (admin use)
router.put('/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    if (!['pending', 'reviewing', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status value'
      });
    }

    const developer = await Developer.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    ).select('-resume.filename');

    if (!developer) {
      return res.status(404).json({
        status: 'error',
        message: 'Developer application not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Developer application status updated',
      data: developer
    });
  } catch (error) {
    console.error('Update developer status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update developer application status'
    });
  }
});

module.exports = router;
