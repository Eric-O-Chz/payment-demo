const express = require('express');
const router = express.Router();
const { handleStripeWebhook } = require('../controllers/webhookController');

// @route   POST /api/webhooks/stripe
// @desc    Listen for Stripe webhook events
// @access  Public (Secured by signature verification)
router.post('/stripe', handleStripeWebhook);

module.exports = router;