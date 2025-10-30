"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import api from '@/app/lib/api';
import { IOrder } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const formatPrice = (priceInCents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceInCents / 100);

const getStatusChip = (status: IOrder['status']) => {
  switch (status) {
    case 'completed':
      return (<span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Completed</span>);
    case 'failed':
      return (<span className="px-3 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">Failed</span>);
    case 'pending':
    default:
      return (<span className="px-3 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">Pending</span>);
  }
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('You must be logged in to view orders.');
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setLoading(true);
          const res = await api.get('/orders');
          setOrders(res.data);
        } catch (err) {
          toast.error('Could not fetch your orders.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user]);

  if (authLoading || loading) return <div className="text-center"><p>Loading your orders...</p></div>;
  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="max-w-4xl mx-auto mt-10"
    >
      <h1 className="text-3xl font-extrabold mb-2 text-indigo-700">My Orders</h1>
      <p className="text-sm mb-8 text-gray-500">🔄 All order data is for sandbox use only. Try placing new orders and see what happens.</p>
      {orders.length === 0 ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-base text-gray-700 bg-indigo-50 rounded-lg px-6 py-8 text-center font-medium shadow-inner">You haven't placed any orders yet.<br/>Try purchasing a product to see it here!</motion.p>
      ) : (
        <AnimatePresence>
          <motion.div initial="hidden" animate="visible" variants={{hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:0.155}}}} className="space-y-6">
            {orders.map((order) => (
              <motion.div key={order._id} variants={{hidden:{opacity:0,y:10},visible:{opacity:1,y:0}}} className="bg-white p-7 rounded-2xl shadow-lg border border-indigo-100 flex flex-col gap-3 hover:shadow-indigo-200 focus-within:shadow-indigo-200 transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold text-indigo-900">
                      Order <span className="font-mono">#{order._id.slice(-8)}</span>
                    </h2>
                    <p className="text-xs text-gray-400">
                      Placed on: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {getStatusChip(order.status)}
                </div>
                <div className="mb-2">
                  {order.products.map((item) => (
                    <div key={item._id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <span className="text-gray-800 font-medium">{item.name} (Qty: {item.quantity})</span>
                      <span className="text-gray-900">{formatPrice(item.priceInCents)}</span>
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-purple-700">
                    Total: {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
