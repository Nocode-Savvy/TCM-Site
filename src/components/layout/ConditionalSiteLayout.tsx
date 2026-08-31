'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function ConditionalSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // On admin routes, render only the admin UI (no public navbar, footer, mobile bar, or scroll to top)
  if (isAdminRoute) {
    return <main className="min-h-screen bg-gray-50">{children}</main>;
  }

  // On public site routes, render the complete public layout
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <MobileBottomBar />
      <ScrollToTop />
    </>
  );
}
