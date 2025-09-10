const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  subscriptionDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  source: {
    type: String,
    default: 'blog_page',
    enum: ['blog_page', 'homepage', 'footer', 'popup', 'other']
  },
  preferences: {
    webDevelopment: { type: Boolean, default: true },
    digitalMarketing: { type: Boolean, default: true },
    businessGrowth: { type: Boolean, default: true },
    aiIntegration: { type: Boolean, default: true }
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    referrer: String
  }
}, {
  timestamps: true,
  collection: 'newsletter_subscribers'
});

// Create indexes for better performance
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ subscriptionDate: -1 });
newsletterSchema.index({ isActive: 1 });

// Pre-save middleware to handle duplicate emails gracefully
newsletterSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const existingSubscriber = await this.constructor.findOne({ 
        email: this.email 
      });
      
      if (existingSubscriber) {
        if (!existingSubscriber.isActive) {
          // Reactivate existing inactive subscriber
          await this.constructor.findByIdAndUpdate(existingSubscriber._id, {
            isActive: true,
            name: this.name,
            subscriptionDate: new Date(),
            source: this.source,
            preferences: this.preferences
          });
          
          const error = new Error('REACTIVATED');
          error.subscriber = existingSubscriber;
          return next(error);
        } else {
          const error = new Error('Email already subscribed to newsletter');
          error.status = 409;
          return next(error);
        }
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Instance methods
newsletterSchema.methods.deactivate = function() {
  this.isActive = false;
  return this.save();
};

newsletterSchema.methods.updatePreferences = function(newPreferences) {
  this.preferences = { ...this.preferences.toObject(), ...newPreferences };
  return this.save();
};

// Static methods
newsletterSchema.statics.getActiveSubscribers = function(filter = {}) {
  return this.find({ isActive: true, ...filter }).sort({ subscriptionDate: -1 });
};

newsletterSchema.statics.getSubscriptionStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        active: { 
          $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] } 
        },
        inactive: { 
          $sum: { $cond: [{ $eq: ['$isActive', false] }, 1, 0] } 
        }
      }
    }
  ]);

  return stats[0] || { total: 0, active: 0, inactive: 0 };
};

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter;
