import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/app/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Payment Demo (Real World)',
  description: 'A real-world payment web app powered by Next.js and Express',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <Toaster position="bottom-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
