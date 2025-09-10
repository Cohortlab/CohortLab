const express = require('express');
const Partner = require('../models/Partner');
const router = express.Router();

// POST /api/partner - Create new partner application
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      contactNumber,
      linkedinUrl,
      message
    } = req.body;

    // Check if partner already exists
    const existingPartner = await Partner.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({
        status: 'error',
        message: 'Partner with this email already exists'
      });
    }

    // Create new partner
    const partner = new Partner({
      name,
      email,
      contactNumber,
      linkedinUrl,
      message
    });

    await partner.save();

    res.status(201).json({
      status: 'success',
      message: 'Partner application submitted successfully',
      data: {
        id: partner._id,
        name: partner.name,
        email: partner.email,
        status: partner.status,
        appliedDate: partner.appliedDate
      }
    });

  } catch (error) {
    console.error('Partner application error:', error);
    
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
      message: 'Failed to submit partner application'
    });
  }
});

// GET /api/partner - Get all partner applications (admin use)
router.get('/', async (req, res) => {
  try {
    const { status, partnershipType, page = 1, limit = 10 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (partnershipType) query.partnershipType = partnershipType;
    
    const partners = await Partner.find(query)
      .sort({ appliedDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Partner.countDocuments(query);

    res.json({
      status: 'success',
      data: partners,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get partners error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve partner applications'
    });
  }
});

// GET /api/partner/:id - Get specific partner application
router.get('/:id', async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    
    if (!partner) {
      return res.status(404).json({
        status: 'error',
        message: 'Partner application not found'
      });
    }

    res.json({
      status: 'success',
      data: partner
    });
  } catch (error) {
    console.error('Get partner error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve partner application'
    });
  }
});

// PUT /api/partner/:id/status - Update application status (admin use)
router.put('/:id/status', async (req, res) => {
  try {
    const { status, notes, partnershipType } = req.body;
    
    if (!['pending', 'reviewing', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status value'
      });
    }

    const updateData = { status, notes };
    if (partnershipType && ['technical', 'business', 'investment', 'other'].includes(partnershipType)) {
      updateData.partnershipType = partnershipType;
    }

    const partner = await Partner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!partner) {
      return res.status(404).json({
        status: 'error',
        message: 'Partner application not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Partner application status updated',
      data: partner
    });
  } catch (error) {
    console.error('Update partner status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update partner application status'
    });
  }
});

// PUT /api/partner/:id/partnership-type - Update partnership type (admin use)
router.put('/:id/partnership-type', async (req, res) => {
  try {
    const { partnershipType } = req.body;
    
    if (!['technical', 'business', 'investment', 'other'].includes(partnershipType)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid partnership type'
      });
    }

    const partner = await Partner.findByIdAndUpdate(
      req.params.id,
      { partnershipType },
      { new: true, runValidators: true }
    );

    if (!partner) {
      return res.status(404).json({
        status: 'error',
        message: 'Partner application not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Partnership type updated',
      data: partner
    });
  } catch (error) {
    console.error('Update partnership type error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update partnership type'
    });
  }
});

module.exports = router;
