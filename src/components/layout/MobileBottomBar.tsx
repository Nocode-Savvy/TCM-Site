'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, CalendarCheck } from 'lucide-react';

export default function MobileBottomBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="region"
      aria-label="Quick actions"
    >
      <div className="bg-forest border-t border-gold/30 px-4 py-3 flex gap-3 safe-area-inset-bottom">
        <a
          href="tel:9362012261"
          id="mobile-bar-call-btn"
          className="flex-1 flex items-center justify-center gap-2 bg-forest-light border border-cream/20 text-cream rounded-full py-3 text-sm font-semibold font-sans hover:border-gold hover:text-gold transition-all duration-200 active:scale-95"
          aria-label="Call TCM Home Solutions"
        >
          <Phone size={16} />
          Call Now
        </a>
        <Link
          href="/booking"
          id="mobile-bar-quote-btn"
          className="flex-1 flex items-center justify-center gap-2 bg-gold text-white rounded-full py-3 text-sm font-semibold font-sans hover:bg-gold-dark transition-all duration-200 active:scale-95"
        >
          <CalendarCheck size={16} />
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
