"use client";
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center font-bold text-indigo-600 text-2xl bg-indigo-50 px-4 py-1 rounded-full shadow-md animate-in">
              <span className="tracking-tight font-extrabold">PaymentDemo</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
              <Link href="/products" className="transition-colors px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">
                Products
              </Link>
            </motion.div>
            {user ? (
              <>
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                  <Link href="/profile/orders" className="transition-colors px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">
                    My Orders
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}>
                  <button
                    onClick={handleLogout}
                    className="transition-colors px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md hover:from-purple-600 hover:to-indigo-700 hover:shadow-lg"
                  >
                    Logout ({user.name})
                  </button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                  <Link href="/login" className="transition-colors px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}>
                  <Link href="/register" className="ml-2 inline-flex items-center px-5 py-2 rounded-full shadow-lg bg-indigo-600 text-white font-bold border-2 border-transparent transition-all hover:bg-white hover:text-indigo-700 hover:border-indigo-700 focus:outline-none">
                    Register
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
