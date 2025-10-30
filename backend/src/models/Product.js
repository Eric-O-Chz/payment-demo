const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Store price in cents to avoid floating point issues
  priceInCents: {
    type: Number,
    required: true,
    min: 0,
  },
  // We'll get these from the Stripe Dashboard
  stripeProductId: {
    type: String,
    required: true,
  },
  stripePriceId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);