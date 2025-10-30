const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');
const Product = require('../models/Product');

// This is a public route, anyone can see the products
router.get('/', getProducts);

// Run this *once* from your browser (e.g., http://localhost:5000/api/products/seed)
// to add your products to MongoDB. Then you can remove this route.
// router.get('/seed', async (req, res) => {
//   try {
//     // Clear existing products
//     await Product.deleteMany({});

//     const productsToSeed = [
//       {
//         name: 'AI Consultation',
//         description: '1-hour strategy session.',
//         priceInCents: 10000, // $100.00
//         stripeProductId: 'prod_YOUR_ID_HERE', // <-- PASTE YOUR ID
//         stripePriceId: 'price_YOUR_ID_HERE', // <-- PASTE YOUR ID
//       },
//       {
//         name: 'Web Design Package',
//         description: '5-page responsive website.',
//         priceInCents: 50000, // $500.00
//         stripeProductId: 'prod_YOUR_ID_HERE', // <-- PASTE YOUR ID
//         stripePriceId: 'price_YOUR_ID_HERE', // <-- PASTE YOUR ID
//       },
//     ];

//     const createdProducts = await Product.insertMany(productsToSeed);
//     res.status(201).json({
//       message: 'Products seeded successfully!',
//       products: createdProducts,
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Seeding failed', error: err.message });
//   }
// });



module.exports = router;