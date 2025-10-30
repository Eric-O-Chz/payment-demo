const Stripe = require('stripe');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Initialize Stripe with your *SECRET* key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create a new payment intent
// @route   POST /api/checkout/create-payment-intent
// @access  Private
exports.createPaymentIntent = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; // We get this from authMiddleware

  try {
    // 1. Find the product in our DB
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // 2. Create the Order in our database (status: 'pending')
    // We assume a quantity of 1 for this demo
    const newOrder = new Order({
      user: userId,
      products: [
        {
          product: product._id,
          name: product.name,
          priceInCents: product.priceInCents,
          quantity: 1,
        },
      ],
      totalAmount: product.priceInCents,
      status: 'pending',
    });
    
    await newOrder.save();

    // 3. Create a Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: newOrder.totalAmount, // Amount in cents
      currency: 'usd',
      // --- This metadata is CRUCIAL ---
      // It links the Stripe payment to our internal Order ID
      metadata: {
        orderId: newOrder._id.toString(),
        userId: userId,
      },
    });

    // 4. Send the clientSecret and orderId back to the frontend
    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId: newOrder._id,
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};