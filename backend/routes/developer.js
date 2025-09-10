const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Developer = require('../models/Developer');
const router = express.Router();

// Create uploads directory if it doesn't exist (only if file uploads are supported)
const uploadsDir = path.join(__dirname, '..', 'uploads', 'developer-resumes');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (error) {
  console.warn('Unable to create uploads directory:', error.message);
  console.warn('File uploads will not be available in this environment');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      // Ensure directory exists before using it
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      cb(null, uploadsDir);
    } catch (error) {
      console.error('Error setting upload destination:', error);
      cb(error);
    }
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

// Custom middleware to handle optional file upload
const optionalUpload = (req, res, next) => {
  // If resumeGoogleDriveUrl is provided and no file is being uploaded, skip multer
  if (req.body.resumeGoogleDriveUrl?.trim() && !req.files && !req.file) {
    console.log('Skipping file upload, using Google Drive URL');
    return next();
  }
  
  // Try to process with multer
  upload.single('resume')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      // If there's an error but Google Drive URL is provided, continue anyway
      if (req.body.resumeGoogleDriveUrl?.trim()) {
        console.log('File upload failed but Google Drive URL provided, continuing...');
        return next();
      }
      return res.status(400).json({
        status: 'error',
        message: err.message || 'File upload error'
      });
    }
    next();
  });
};

// POST /api/developer - Create new developer application
router.post('/', (req, res, next) => {
  // Check if this is multipart form data (file upload)
  if (req.headers['content-type']?.includes('multipart/form-data')) {
    // Use multer for file upload
    upload.single('resume')(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({
          status: 'error',
          message: err.message || 'File upload error'
        });
      }
      next();
    });
  } else {
    // Skip multer for JSON requests
    next();
  }
}, async (req, res) => {
  try {
    const {
      name,
      email,
      contactNumber,
      githubUrl,
      liveProjects,
      techStack,
      linkedinUrl,
      portfolioWebsite,
      resumeGoogleDriveUrl
    } = req.body;

    console.log('Developer application request:', {
      body: req.body,
      file: req.file ? 'File present' : 'No file',
      hasGoogleDriveUrl: !!resumeGoogleDriveUrl
    });

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

    // Validate required resume - either file upload or Google Drive URL
    if (!req.file && !resumeGoogleDriveUrl?.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Resume is required - either upload a file or provide a Google Drive URL'
      });
    }

    // Create new developer
    const developerData = {
      name,
      email,
      contactNumber,
      githubUrl,
      liveProjects,
      techStack,
      linkedinUrl,
      portfolioWebsite
    };

    // Handle resume - either file upload or Google Drive URL
    if (req.file) {
      developerData.resume = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      };
    } else if (resumeGoogleDriveUrl?.trim()) {
      developerData.resumeGoogleDriveUrl = resumeGoogleDriveUrl.trim();
    }

    const developer = new Developer(developerData);

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
    console.error('Request body:', req.body);
    console.error('Request file:', req.file ? 'File present' : 'No file');
    
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
      message: 'Failed to submit developer application',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
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
