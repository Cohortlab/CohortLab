const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
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
  githubUrl: {
    type: String,
    required: [true, 'GitHub URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/(www\.)?github\.com\/.+/.test(v);
      },
      message: 'Please provide a valid GitHub URL'
    }
  },
  liveProjects: {
    type: String,
    required: [true, 'At least one live project URL is required'],
    trim: true
  },
  techStack: {
    type: String,
    required: [true, 'Tech stack is required'],
    trim: true
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
    required: [true, 'Portfolio website is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\..+/.test(v);
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
developerSchema.index({ email: 1 });
developerSchema.index({ status: 1 });
developerSchema.index({ appliedDate: -1 });

module.exports = mongoose.model('Developer', developerSchema);
