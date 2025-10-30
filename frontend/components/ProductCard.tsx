"use client";
import { IProduct } from '@/types';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: IProduct;
  onCheckout: (product: IProduct) => void;
}
const formatPrice = (priceInCents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceInCents / 100);

export default function ProductCard({ product, onCheckout }: ProductCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const handleBuyClick = () => {
    if (!user) router.push('/login');
    else onCheckout(product);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.04, boxShadow: '0 4px 18px 4px rgba(80,72,222,0.12)' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="border rounded-2xl shadow-lg overflow-hidden flex flex-col bg-white hover:border-indigo-200 mb-6"
    >
      <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-white h-48 w-full flex items-center justify-center glassy relative">
        <span className="text-gray-400 font-bold text-lg drop-shadow animate-pulse">🛒 Image</span>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-[1.25rem] font-bold mb-2 text-indigo-900 tracking-tight">{product.name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-bold bg-gradient-to-tr from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            {formatPrice(product.priceInCents)}
          </span>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={handleBuyClick}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
