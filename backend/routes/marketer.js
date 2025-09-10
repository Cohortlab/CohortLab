const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Marketer = require('../models/Marketer');
const router = express.Router();

// Create uploads directory if it doesn't exist (only if file uploads are supported)
const uploadsDir = path.join(__dirname, '..', 'uploads', 'marketer-resumes');
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

// Custom middleware to handle optional file upload
const optionalUpload = (req, res, next) => {
  // If resumeGoogleDriveUrl is provided, skip file upload processing
  if (req.body.resumeGoogleDriveUrl?.trim() && !req.file) {
    return next();
  }
  
  upload.single('resume')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      // If there's an error but Google Drive URL is provided, continue
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

// POST /api/marketer - Create new marketer application
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
      pastWorks,
      linkedinUrl,
      portfolioWebsite,
      resumeGoogleDriveUrl
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

    // Validate required resume - either file upload or Google Drive URL
    if (!req.file && !resumeGoogleDriveUrl?.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Resume is required - either upload a file or provide a Google Drive URL'
      });
    }

    // Create new marketer
    const marketerData = {
      name,
      email,
      contactNumber,
      pastWorks,
      linkedinUrl,
      portfolioWebsite
    };

    // Handle resume - either file upload or Google Drive URL
    if (req.file) {
      marketerData.resume = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      };
    } else if (resumeGoogleDriveUrl?.trim()) {
      marketerData.resumeGoogleDriveUrl = resumeGoogleDriveUrl.trim();
    }

    const marketer = new Marketer(marketerData);

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
      message: 'Failed to submit marketer application',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
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
