const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// --- Import Routes ---
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const checkoutRoutes = require('./routes/checkout');
const webhookRoutes = require('./routes/webhooks');
const orderRoutes = require('./routes/orders');


const app = express();

// --- 1. Middleware ---
// Enable Cross-Origin Resource Sharing for all routes
app.use(cors()); 

// --- ❗ SPECIAL WEBHOOK ROUTE ❗ ---
// This route MUST come *BEFORE* express.json()
// Stripe requires the raw request body, not the parsed JSON.
app.use('/api/webhooks', express.raw({type: 'application/json'}), webhookRoutes);

// IMPORTANT: We will add a raw body parser for webhooks *before* this
// For now, we'll just use the standard JSON parser
app.use(express.json());

// --- 2. Database Connection ---
const MONGO_URI = process.env.MONGO_URI;



mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- 3. Basic Routes (for testing) ---
app.get('/', (req, res) => {
  res.send('Payment Demo API is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);

// We will add our main routes here later
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// ...etc

// --- 4. Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});