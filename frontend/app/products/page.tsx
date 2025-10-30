"use client";
import { useEffect, useState } from 'react';
import api from '@/app/lib/api';
import { IProduct } from '@/types';
import ProductCard from '@/components/ProductCard';
import toast from 'react-hot-toast';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '@/app/lib/stripe';
import CheckoutForm from '@/components/CheckoutForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Could not fetch products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckout = async (product: IProduct) => {
    setCheckoutLoading(true);
    setSelectedProduct(product);
    try {
      const res = await api.post('/checkout/create-payment-intent', { productId: product._id });
      setClientSecret(res.data.clientSecret);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Could not start checkout.');
      setSelectedProduct(null);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const closeCheckoutModal = () => {
    setClientSecret(null);
    setSelectedProduct(null);
  };

  if (loading) {
    return <p className="text-center text-xl">Loading products...</p>;
  }

  if (clientSecret && selectedProduct) {
    return (
      <AnimatePresence>
        <motion.div
          key="modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-indigo-400/10 to-white/50 backdrop-blur-md"></div>
          <motion.div
            key="modal-content"
            initial={{ scale: 0.93, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 40 }}
            transition={{ duration: 0.33, type: 'spring' }}
            className="relative bg-white p-8 rounded-xl shadow-2xl w-full max-w-md z-10"
          >
            <h2 className="text-2xl font-semibold mb-2">Complete your purchase</h2>
            <p className="text-gray-700 mb-4">
              You are buying: <strong>{selectedProduct.name}</strong>
            </p>
            <Elements 
              stripe={stripePromise} 
              options={{ clientSecret, appearance: { theme: 'stripe' } }}
            >
              <CheckoutForm 
                onSuccess={closeCheckoutModal} 
                onClose={closeCheckoutModal}
              />
            </Elements>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            onCheckout={handleCheckout} 
          />
        ))}
      </div>
      {checkoutLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-40">
          <p className="text-xl">Starting secure checkout...</p>
        </div>
      )}
    </motion.div>
  );
}
