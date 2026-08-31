'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/#areas', label: 'Areas We Serve' },
  { href: '/booking', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#1F3325] shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0"
            aria-label="TCM Home Solutions — Home"
          >
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="TCM Home Solutions LLC logo"
                fill
                className="object-contain rounded-full"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-cream text-base font-semibold leading-tight block">
                TCM Home Solutions
              </span>
              <span className="text-gold text-[10px] font-sans tracking-widest uppercase block -mt-0.5">
                LLC
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/booking"
              id="nav-cta-button"
              className="btn-gold text-sm py-2.5 px-6"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            className="lg:hidden text-cream p-2.5 rounded-xl bg-[#1F3325]/80 hover:bg-[#1F3325] transition-colors border border-cream/15"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── FULLY OPAQUE SOLID MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#1F3325] text-cream flex flex-col justify-between overflow-y-auto"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            {/* Header in overlay */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-cream/15 bg-[#172A1D] flex-shrink-0">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="TCM Home Solutions"
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <div>
                  <span className="font-serif text-cream text-base font-semibold block leading-tight">
                    TCM Home Solutions
                  </span>
                  <span className="text-gold text-[10px] font-sans tracking-widest uppercase block">
                    LLC
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-cream p-2.5 rounded-xl bg-cream/10 hover:bg-cream/20 transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Navigation links */}
            <nav
              className="flex-1 flex flex-col justify-center px-6 py-8 space-y-4 max-w-sm mx-auto w-full"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-2xl text-cream hover:text-gold transition-colors duration-200 block py-2 border-b border-cream/10"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="px-6 py-6 border-t border-cream/15 bg-[#172A1D] flex flex-col gap-3 max-w-sm mx-auto w-full flex-shrink-0">
              <Link
                href="/booking"
                onClick={() => setMenuOpen(false)}
                className="btn-gold justify-center text-center text-sm py-3.5"
                id="mobile-menu-quote-btn"
              >
                <CalendarCheck size={16} />
                Get a Free Quote
              </Link>
              <a
                href="tel:9362012261"
                className="btn-outline-cream justify-center text-center text-sm py-3.5"
                id="mobile-menu-call-btn"
              >
                <Phone size={16} />
                Call Carolyn: 936-201-2261
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
