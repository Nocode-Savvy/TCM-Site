import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'House Cleaning & Handyman Services in San Augustine, TX | TCM Home Solutions',
    template: '%s | TCM Home Solutions LLC',
  },
  description: 'TCM Home Solutions LLC offers professional residential cleaning, deep cleans, move-in/out cleaning, handyman services, pressure washing, and painting in San Augustine, TX and across East Texas.',
  keywords: ['house cleaning San Augustine TX', 'handyman services East Texas', 'move out clean East Texas', 'deep clean Nacogdoches', 'TCM Home Solutions'],
  authors: [{ name: 'TCM Home Solutions LLC' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tcmhomesolutions.com',
    siteName: 'TCM Home Solutions LLC',
    title: 'House Cleaning & Handyman Services in San Augustine, TX | TCM Home Solutions',
    description: 'Reliable cleaning and handyman services across East Texas. Locally owned and operated in San Augustine, TX.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TCM Home Solutions LLC — East Texas Cleaning & Handyman',
    description: 'Professional cleaning and handyman services in San Augustine, TX and across East Texas.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileBottomBar />
        <ScrollToTop />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1F3325',
              color: '#F5EFE3',
              border: '1px solid #C9A24B',
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
            },
          }}
        />
      </body>
    </html>
  );
}
