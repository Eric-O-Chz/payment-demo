const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/checkoutController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/checkout/create-payment-intent
// @desc    Create a new payment intent
// @access  Private (requires a valid JWT)
router.post('/create-payment-intent', authMiddleware, createPaymentIntent);

module.exports = router;