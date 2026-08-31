'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

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
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-forest shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0" aria-label="TCM Home Solutions — Home">
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
              <span className="font-serif text-cream text-base font-semibold leading-tight block">TCM Home Solutions</span>
              <span className="text-gold text-[10px] font-sans tracking-widest uppercase block -mt-0.5">LLC</span>
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
            className="lg:hidden text-cream p-2 rounded-lg hover:bg-cream/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-forest/98 flex flex-col"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          <div className="flex items-center justify-between px-4 py-5 border-b border-cream/10">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image src="/logo.png" alt="TCM Home Solutions" fill className="object-contain rounded-full" />
              </div>
              <span className="font-serif text-cream text-base font-semibold">TCM Home Solutions</span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-cream p-2 rounded-lg hover:bg-cream/10 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-8 gap-6" aria-label="Mobile navigation">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-2xl text-cream/80 hover:text-gold transition-colors duration-200 border-b border-cream/10 pb-4"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="px-8 py-8 flex flex-col gap-3 border-t border-cream/10">
            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="btn-gold justify-center text-center"
              id="mobile-menu-quote-btn"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:9362012261"
              className="btn-outline-cream justify-center text-center"
              id="mobile-menu-call-btn"
            >
              Call Carolyn: 936-201-2261
            </a>
          </div>
        </div>
      )}
    </>
  );
}
