const mongoose = require('mongoose');

const consultancySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxLength: [100, 'Full name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phoneNumber: {
    type: String,
    trim: true,
    maxLength: [20, 'Phone number cannot exceed 20 characters']
  },
  serviceInterest: {
    type: String,
    required: [true, 'Service/Area of interest is required'],
    enum: [
      'web-development',
      'mobile-development', 
      'digital-marketing',
      'seo',
      'social-media',
      'paid-ads',
      'cloud-services',
      'consulting',
      'other'
    ]
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxLength: [2000, 'Message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'in-progress', 'completed'],
    default: 'pending'
  },
  submittedDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Index for faster queries
consultancySchema.index({ email: 1 });
consultancySchema.index({ submittedDate: -1 });
consultancySchema.index({ status: 1 });

module.exports = mongoose.model('Consultancy', consultancySchema);
