const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Marketer = require('../models/Marketer');
const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads', 'marketer-resumes');
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
    cb(null, 'marketer-' + uniqueSuffix + path.extname(file.originalname));
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

// POST /api/marketer - Create new marketer application
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const {
      name,
      email,
      contactNumber,
      pastWorks,
      linkedinUrl,
      portfolioWebsite
    } = req.body;

    // Check if marketer already exists
    const existingMarketer = await Marketer.findOne({ email });
    if (existingMarketer) {
      // Delete uploaded file if marketer already exists
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
      return res.status(400).json({
        status: 'error',
        message: 'Marketer with this email already exists'
      });
    }

    // Validate required file upload
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Resume file is required'
      });
    }

    // Create new marketer
    const marketer = new Marketer({
      name,
      email,
      contactNumber,
      pastWorks,
      linkedinUrl,
      portfolioWebsite,
      resume: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });

    await marketer.save();

    res.status(201).json({
      status: 'success',
      message: 'Marketer application submitted successfully',
      data: {
        id: marketer._id,
        name: marketer.name,
        email: marketer.email,
        status: marketer.status,
        appliedDate: marketer.appliedDate
      }
    });

  } catch (error) {
    // Delete uploaded file if there's an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    console.error('Marketer application error:', error);
    
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
      message: 'Failed to submit marketer application'
    });
  }
});

// GET /api/marketer - Get all marketer applications (admin use)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};
    
    const marketers = await Marketer.find(query)
      .select('-resume.filename') // Don't expose file paths
      .sort({ appliedDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Marketer.countDocuments(query);

    res.json({
      status: 'success',
      data: marketers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get marketers error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve marketer applications'
    });
  }
});

// GET /api/marketer/:id - Get specific marketer application
router.get('/:id', async (req, res) => {
  try {
    const marketer = await Marketer.findById(req.params.id)
      .select('-resume.filename'); // Don't expose file paths
    
    if (!marketer) {
      return res.status(404).json({
        status: 'error',
        message: 'Marketer application not found'
      });
    }

    res.json({
      status: 'success',
      data: marketer
    });
  } catch (error) {
    console.error('Get marketer error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve marketer application'
    });
  }
});

// PUT /api/marketer/:id/status - Update application status (admin use)
router.put('/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    if (!['pending', 'reviewing', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status value'
      });
    }

    const marketer = await Marketer.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    ).select('-resume.filename');

    if (!marketer) {
      return res.status(404).json({
        status: 'error',
        message: 'Marketer application not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Marketer application status updated',
      data: marketer
    });
  } catch (error) {
    console.error('Update marketer status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update marketer application status'
    });
  }
});

module.exports = router;
