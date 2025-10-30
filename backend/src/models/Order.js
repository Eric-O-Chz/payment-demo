const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // We'll store a snapshot of the products at the time of purchase
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      name: String,
      priceInCents: Number,
      quantity: {
        type: Number,
        default: 1
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  // Link to the Stripe transaction
  stripePaymentIntentId: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);