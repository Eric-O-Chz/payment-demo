const Stripe = require('stripe');
const Order = require('../models/Order');

// Use the *Secret* key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// This is the "Webhook Signing Secret" you get from the Stripe CLI (see step 3)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // 1. Verify the event came from Stripe
    // We use req.body (the raw buffer) and the signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`❌ Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. Handle the event
  console.log(`✅ Webhook received: ${event.type}`);
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      
      // --- This is why metadata was crucial ---
      const orderId = paymentIntent.metadata.orderId;
      
      console.log(`Payment successful for Order ID: ${orderId}`);

      try {
        // Find the order in our DB and update it
        await Order.findByIdAndUpdate(orderId, {
          status: 'completed',
          stripePaymentIntentId: paymentIntent.id,
        });
        console.log(`Order ${orderId} updated to 'completed'.`);
      } catch (err) {
        console.error(`Error updating order ${orderId}:`, err);
        // If this fails, you should have a retry mechanism or alert
        // For now, we'll return 500
        return res.status(500).send('Error updating order.');
      }
      break;
    
    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object;
      const failedOrderId = failedPaymentIntent.metadata.orderId;
      
      try {
        // Update order to 'failed'
        await Order.findByIdAndUpdate(failedOrderId, { status: 'failed' });
        console.log(`Order ${failedOrderId} updated to 'failed'.`);
      } catch (err)
 {
        console.error(`Error updating failed order ${failedOrderId}:`, err);
        return res.status(500).send('Error updating failed order.');
      }
      break;
    
    // ... handle other event types if needed
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // 3. Acknowledge receipt to Stripe
  // If you don't send this, Stripe will keep retrying.
  res.status(200).send();
};