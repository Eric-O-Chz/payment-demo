"use client";
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-black dark:to-zinc-950"
    >
      <main className="flex flex-col items-center justify-center px-6 py-24 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-xl w-full gap-8">
        <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight text-center">
          Payment Demo Playground
        </h1>
        <h2 className="text-lg text-gray-700 dark:text-zinc-200 font-semibold text-center mb-4 animate-fade-in">
          A safe developer sandbox to test Stripe payments, order placement, and user authentication.
        </h2>
        <div className="border rounded-2xl shadow-inner p-5 bg-indigo-50 dark:bg-zinc-800 w-full">
          <ul className="space-y-3 text-base">
            <li><b>🛒 Test:</b> Browse <span className="text-indigo-600 font-bold">Products</span>, buy a product (check My Orders), and simulate payments.</li>
            <li><b>🔑 Try:</b> Register/login with any email and see how order history works.</li>
            <li><b>💻 Dev Tip:</b> Order data is mock and resets regularly. Play around freely!</li>
          </ul>
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-zinc-400 mt-4">
          Built for developers exploring <span className="font-semibold text-indigo-700">Next.js</span> and <span className="font-semibold text-purple-700">Stripe API</span> integrations.<br/>
          <span className="text-xs">(No real money is involved. Safe for tests!)</span>
        </p>
      </main>
    </motion.div>
  );
}
