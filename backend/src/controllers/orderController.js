const Order = require('../models/Order');

// @desc    Get all orders for the logged-in user
// @route   GET /api/orders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    // Find orders belonging to the user ID from the auth token
    const orders = await Order.find({ user: req.user.id })
                             .sort({ createdAt: -1 }); // Show newest first
    
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};