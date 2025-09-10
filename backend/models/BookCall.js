const mongoose = require('mongoose');

const bookCallSchema = new mongoose.Schema({
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
    required: [true, 'Phone number is required'],
    trim: true,
    maxLength: [20, 'Phone number cannot exceed 20 characters']
  },
  preferredDateTime: {
    type: Date,
    required: [true, 'Preferred date and time is required'],
    validate: {
      validator: function(v) {
        return v > new Date();
      },
      message: 'Preferred date and time must be in the future'
    }
  },
  topicDiscussion: {
    type: String,
    required: [true, 'Topic of discussion is required'],
    trim: true,
    maxLength: [500, 'Topic description cannot exceed 500 characters']
  },
  additionalNotes: {
    type: String,
    trim: true,
    maxLength: [1000, 'Additional notes cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
    default: 'pending'
  },
  submittedDate: {
    type: Date,
    default: Date.now
  },
  actualDateTime: {
    type: Date  // For when the call is rescheduled
  },
  callDuration: {
    type: Number  // Duration in minutes
  },
  callNotes: {
    type: String,
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  assignedTo: {
    type: String,
    trim: true  // Team member assigned to handle the call
  }
}, {
  timestamps: true
});

// Index for faster queries
bookCallSchema.index({ email: 1 });
bookCallSchema.index({ preferredDateTime: 1 });
bookCallSchema.index({ submittedDate: -1 });
bookCallSchema.index({ status: 1 });

module.exports = mongoose.model('BookCall', bookCallSchema);
