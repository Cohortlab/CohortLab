const mongoose = require('mongoose');

const marketerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    trim: true,
    maxLength: [20, 'Contact number cannot exceed 20 characters']
  },
  pastWorks: {
    type: String,
    trim: true,
    maxLength: [1000, 'Past works description cannot exceed 1000 characters']
  },
  linkedinUrl: {
    type: String,
    required: [true, 'LinkedIn URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/.test(v);
      },
      message: 'Please provide a valid LinkedIn URL'
    }
  },
  portfolioWebsite: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+\..+/.test(v);
      },
      message: 'Please provide a valid website URL'
    }
  },
  resume: {
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  },
  resumeGoogleDriveUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/drive\.google\.com\/|^https?:\/\/docs\.google\.com\//.test(v);
      },
      message: 'Please provide a valid Google Drive URL'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'approved', 'rejected'],
    default: 'pending'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster queries
marketerSchema.index({ email: 1 });
marketerSchema.index({ status: 1 });
marketerSchema.index({ appliedDate: -1 });

module.exports = mongoose.model('Marketer', marketerSchema);
