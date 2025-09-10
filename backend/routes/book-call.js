const express = require('express');
const BookCall = require('../models/BookCall');
const router = express.Router();

// POST /api/book-call - Create new book call request
router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      preferredDateTime,
      topicDiscussion,
      additionalNotes
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !preferredDateTime || !topicDiscussion) {
      return res.status(400).json({
        status: 'error',
        message: 'Please fill in all required fields'
      });
    }

    // Validate preferred date/time is in the future
    const selectedDate = new Date(preferredDateTime);
    const now = new Date();
    
    if (selectedDate <= now) {
      return res.status(400).json({
        status: 'error',
        message: 'Please select a future date and time for the call'
      });
    }

    // Check if there's already a call scheduled for this user in the near future
    const existingCall = await BookCall.findOne({
      email,
      status: { $in: ['pending', 'confirmed'] },
      preferredDateTime: { $gte: now }
    });

    if (existingCall) {
      return res.status(400).json({
        status: 'error',
        message: 'You already have a call scheduled. Please wait for confirmation or contact us to reschedule.'
      });
    }

    // Check if the requested time slot is available (basic check - you might want more sophisticated scheduling)
    const conflictingCall = await BookCall.findOne({
      preferredDateTime: {
        $gte: new Date(selectedDate.getTime() - 30 * 60000), // 30 minutes before
        $lte: new Date(selectedDate.getTime() + 30 * 60000)  // 30 minutes after
      },
      status: { $in: ['confirmed', 'pending'] }
    });

    if (conflictingCall) {
      return res.status(400).json({
        status: 'error',
        message: 'The requested time slot is not available. Please choose a different time.'
      });
    }

    // Create new book call request
    const bookCall = new BookCall({
      fullName,
      email,
      phoneNumber,
      preferredDateTime: selectedDate,
      topicDiscussion,
      additionalNotes
    });

    await bookCall.save();

    res.status(201).json({
      status: 'success',
      message: 'Your call has been scheduled successfully! We will contact you to confirm the appointment.',
      data: {
        id: bookCall._id,
        fullName: bookCall.fullName,
        email: bookCall.email,
        phoneNumber: bookCall.phoneNumber,
        preferredDateTime: bookCall.preferredDateTime,
        topicDiscussion: bookCall.topicDiscussion,
        status: bookCall.status,
        submittedDate: bookCall.submittedDate
      }
    });

  } catch (error) {
    console.error('Book call request error:', error);
    
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
      message: 'Something went wrong while scheduling your call. Please try again.'
    });
  }
});

// GET /api/book-call - Get all book call requests (Admin endpoint)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 10, date } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.preferredDateTime = { $gte: startDate, $lt: endDate };
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const bookCalls = await BookCall.find(query)
      .sort({ preferredDateTime: 1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await BookCall.countDocuments(query);
    
    res.json({
      status: 'success',
      data: bookCalls,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get book calls error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve book call requests'
    });
  }
});

// GET /api/book-call/:id - Get single book call request
router.get('/:id', async (req, res) => {
  try {
    const bookCall = await BookCall.findById(req.params.id);
    
    if (!bookCall) {
      return res.status(404).json({
        status: 'error',
        message: 'Book call request not found'
      });
    }
    
    res.json({
      status: 'success',
      data: bookCall
    });
  } catch (error) {
    console.error('Get book call error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve book call request'
    });
  }
});

// PUT /api/book-call/:id - Update book call request
router.put('/:id', async (req, res) => {
  try {
    const { 
      status, 
      actualDateTime, 
      callDuration, 
      callNotes, 
      priority, 
      assignedTo 
    } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (actualDateTime) updateData.actualDateTime = new Date(actualDateTime);
    if (callDuration !== undefined) updateData.callDuration = callDuration;
    if (callNotes !== undefined) updateData.callNotes = callNotes;
    if (priority) updateData.priority = priority;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    
    const bookCall = await BookCall.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!bookCall) {
      return res.status(404).json({
        status: 'error',
        message: 'Book call request not found'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Book call request updated successfully',
      data: bookCall
    });
  } catch (error) {
    console.error('Update book call error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update book call request'
    });
  }
});

// DELETE /api/book-call/:id - Delete book call request
router.delete('/:id', async (req, res) => {
  try {
    const bookCall = await BookCall.findByIdAndDelete(req.params.id);
    
    if (!bookCall) {
      return res.status(404).json({
        status: 'error',
        message: 'Book call request not found'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Book call request deleted successfully'
    });
  } catch (error) {
    console.error('Delete book call error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete book call request'
    });
  }
});

// GET /api/book-call/availability/:date - Check availability for a specific date
router.get('/availability/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const selectedDate = new Date(date);
    
    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid date format'
      });
    }
    
    // Get all booked slots for the day
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const bookedCalls = await BookCall.find({
      preferredDateTime: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['pending', 'confirmed'] }
    }).select('preferredDateTime');
    
    res.json({
      status: 'success',
      data: {
        date: selectedDate.toISOString().split('T')[0],
        bookedSlots: bookedCalls.map(call => call.preferredDateTime)
      }
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to check availability'
    });
  }
});

module.exports = router;
