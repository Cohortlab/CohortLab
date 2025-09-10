const express = require('express');
const Consultancy = require('../models/Consultancy');
const router = express.Router();

// POST /api/consultancy - Create new consultancy request
router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      serviceInterest,
      message
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !serviceInterest || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Please fill in all required fields'
      });
    }

    // Check if consultancy request already exists for this email recently (within 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingRequest = await Consultancy.findOne({ 
      email,
      submittedDate: { $gte: twentyFourHoursAgo }
    });
    
    if (existingRequest) {
      return res.status(400).json({
        status: 'error',
        message: 'You have already submitted a consultancy request in the last 24 hours. We will get back to you soon!'
      });
    }

    // Create new consultancy request
    const consultancy = new Consultancy({
      fullName,
      email,
      phoneNumber,
      serviceInterest,
      message
    });

    await consultancy.save();

    res.status(201).json({
      status: 'success',
      message: 'Your consultation request has been submitted successfully! We will get back to you within 24 hours.',
      data: {
        id: consultancy._id,
        fullName: consultancy.fullName,
        email: consultancy.email,
        serviceInterest: consultancy.serviceInterest,
        status: consultancy.status,
        submittedDate: consultancy.submittedDate
      }
    });

  } catch (error) {
    console.error('Consultancy request error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: messages.join('. ')
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while submitting your request. Please try again.'
    });
  }
});

// GET /api/consultancy - Get all consultancy requests (Admin endpoint)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = status ? { status } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const consultancies = await Consultancy.find(query)
      .sort({ submittedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Consultancy.countDocuments(query);
    
    res.json({
      status: 'success',
      data: consultancies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get consultancies error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve consultancy requests'
    });
  }
});

// GET /api/consultancy/:id - Get single consultancy request
router.get('/:id', async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.params.id);
    
    if (!consultancy) {
      return res.status(404).json({
        status: 'error',
        message: 'Consultancy request not found'
      });
    }
    
    res.json({
      status: 'success',
      data: consultancy
    });
  } catch (error) {
    console.error('Get consultancy error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve consultancy request'
    });
  }
});

// PUT /api/consultancy/:id - Update consultancy request status
router.put('/:id', async (req, res) => {
  try {
    const { status, notes, priority } = req.body;
    
    const consultancy = await Consultancy.findByIdAndUpdate(
      req.params.id,
      { 
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
        ...(priority && { priority })
      },
      { new: true, runValidators: true }
    );
    
    if (!consultancy) {
      return res.status(404).json({
        status: 'error',
        message: 'Consultancy request not found'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Consultancy request updated successfully',
      data: consultancy
    });
  } catch (error) {
    console.error('Update consultancy error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update consultancy request'
    });
  }
});

// DELETE /api/consultancy/:id - Delete consultancy request
router.delete('/:id', async (req, res) => {
  try {
    const consultancy = await Consultancy.findByIdAndDelete(req.params.id);
    
    if (!consultancy) {
      return res.status(404).json({
        status: 'error',
        message: 'Consultancy request not found'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Consultancy request deleted successfully'
    });
  } catch (error) {
    console.error('Delete consultancy error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete consultancy request'
    });
  }
});

module.exports = router;
