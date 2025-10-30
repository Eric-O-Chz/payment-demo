const express = require('express');
const router = express.Router();
const { getMyOrders } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/orders
// @desc    Get all orders for the logged-in user
// @access  Private
router.get('/', authMiddleware, getMyOrders);

module.exports = router;