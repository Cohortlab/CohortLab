const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
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
    trim: true,
    maxLength: [20, 'Contact number cannot exceed 20 characters']
  },
  linkedinUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/.test(v);
      },
      message: 'Please provide a valid LinkedIn URL'
    }
  },
  message: {
    type: String,
    trim: true,
    maxLength: [2000, 'Message cannot exceed 2000 characters']
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
  },
  partnershipType: {
    type: String,
    enum: ['technical', 'business', 'investment', 'other'],
    default: 'other'
  }
}, {
  timestamps: true
});

// Index for faster queries
partnerSchema.index({ email: 1 });
partnerSchema.index({ status: 1 });
partnerSchema.index({ appliedDate: -1 });
partnerSchema.index({ partnershipType: 1 });

module.exports = mongoose.model('Partner', partnerSchema);
