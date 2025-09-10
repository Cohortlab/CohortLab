const express = require('express');
const { body, validationResult } = require('express-validator');
const Newsletter = require('../models/Newsletter');

const router = express.Router();

// Validation middleware
const validateSubscription = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name can only contain letters, spaces, hyphens and apostrophes'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('source')
    .optional()
    .isIn(['blog_page', 'homepage', 'footer', 'popup', 'other'])
    .withMessage('Invalid source value')
];

// GET /api/newsletter/stats - Get subscription statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Newsletter.getSubscriptionStats();
    
    res.status(200).json({
      status: 'success',
      data: {
        stats,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching newsletter stats:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch subscription statistics',
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/newsletter/subscribers - Get all active subscribers (admin only)
router.get('/subscribers', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const subscribers = await Newsletter.getActiveSubscribers()
      .skip(skip)
      .limit(limit)
      .select('-metadata.ipAddress -metadata.userAgent');

    const total = await Newsletter.countDocuments({ isActive: true });

    res.status(200).json({
      status: 'success',
      data: {
        subscribers,
        pagination: {
          current_page: page,
          total_pages: Math.ceil(total / limit),
          total_items: total,
          items_per_page: limit
        },
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch subscribers',
      timestamp: new Date().toISOString()
    });
  }
});

// POST /api/newsletter/subscribe - Subscribe to newsletter
router.post('/subscribe', validateSubscription, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
        timestamp: new Date().toISOString()
      });
    }

    const { name, email, source = 'blog_page', preferences = {} } = req.body;

    // Get request metadata
    const metadata = {
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referrer')
    };

    // Create new subscription
    const subscription = new Newsletter({
      name,
      email,
      source,
      preferences: {
        webDevelopment: preferences.webDevelopment !== false,
        digitalMarketing: preferences.digitalMarketing !== false,
        businessGrowth: preferences.businessGrowth !== false,
        aiIntegration: preferences.aiIntegration !== false,
        ...preferences
      },
      metadata
    });

    await subscription.save();

    // Success response
    res.status(201).json({
      status: 'success',
      message: 'Successfully subscribed to newsletter!',
      data: {
        subscriber: {
          id: subscription._id,
          name: subscription.name,
          email: subscription.email,
          subscriptionDate: subscription.subscriptionDate,
          source: subscription.source
        },
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);

    // Handle duplicate email error
    if (error.message === 'REACTIVATED') {
      return res.status(200).json({
        status: 'success',
        message: 'Welcome back! Your newsletter subscription has been reactivated.',
        data: {
          subscriber: {
            id: error.subscriber._id,
            name: error.subscriber.name,
            email: error.subscriber.email,
            subscriptionDate: error.subscriber.subscriptionDate
          },
          reactivated: true,
          timestamp: new Date().toISOString()
        }
      });
    }

    if (error.status === 409 || error.message.includes('already subscribed')) {
      return res.status(409).json({
        status: 'error',
        message: 'This email is already subscribed to our newsletter.',
        code: 'ALREADY_SUBSCRIBED',
        timestamp: new Date().toISOString()
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        status: 'error',
        message: 'This email is already subscribed to our newsletter.',
        code: 'DUPLICATE_EMAIL',
        timestamp: new Date().toISOString()
      });
    }

    // Generic error response
    res.status(500).json({
      status: 'error',
      message: 'Failed to subscribe to newsletter. Please try again later.',
      timestamp: new Date().toISOString()
    });
  }
});

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
router.post('/unsubscribe', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid email address',
        errors: errors.array(),
        timestamp: new Date().toISOString()
      });
    }

    const { email } = req.body;

    const subscriber = await Newsletter.findOne({ email, isActive: true });
    if (!subscriber) {
      return res.status(404).json({
        status: 'error',
        message: 'Email not found in our newsletter subscribers',
        timestamp: new Date().toISOString()
      });
    }

    await subscriber.deactivate();

    res.status(200).json({
      status: 'success',
      message: 'Successfully unsubscribed from newsletter',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to unsubscribe. Please try again later.',
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
