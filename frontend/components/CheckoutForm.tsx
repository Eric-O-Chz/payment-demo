"use client";
import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface CheckoutFormProps {
  onSuccess: () => void;
  onClose: () => void;
}
export default function CheckoutForm({ onSuccess, onClose }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);
    setErrorMessage(undefined);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/profile/orders` },
      redirect: 'if_required',
    });
    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    } else {
      toast.success('Payment successful!');
      setIsLoading(false);
      onSuccess();
    }
  };
  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <PaymentElement id="payment-element" />
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full px-4 py-2 text-base text-white font-semibold tracking-wide rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-700 hover:to-indigo-800 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
      >
        <span id="button-text">
          {isLoading ? 'Processing...' : 'Pay Now'}
        </span>
      </motion.button>
      {errorMessage && (
        <div id="payment-message" className="text-sm text-red-600">
          {errorMessage}
        </div>
      )}
      <button
        type="button"
        onClick={onClose}
        className="w-full text-sm text-center text-gray-600 hover:text-gray-800"
      >
        Cancel
      </button>
    </motion.form>
  );
}
