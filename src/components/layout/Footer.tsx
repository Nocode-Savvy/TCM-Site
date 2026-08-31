import Link from 'next/link';
import Image from 'next/image';
import { Lock } from 'lucide-react';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';

const QUICK_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/booking', label: 'Get a Quote' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-cream" role="contentinfo">
      {/* Top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-4 mb-5" aria-label="TCM Home Solutions — Home">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="TCM Home Solutions LLC logo"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <div>
                <p className="font-serif text-lg text-cream font-semibold leading-tight">TCM Home Solutions</p>
                <p className="text-gold text-[10px] font-sans tracking-widest uppercase">LLC</p>
              </div>
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed mb-5">
              {BUSINESS.tagline}
            </p>
            <p className="text-cream/60 text-xs">
              Based in {BUSINESS.city}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-gold text-lg mb-5">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream/70 text-sm hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-gold text-lg mb-5">Contact Us</h3>
            <ul className="space-y-3 text-sm text-cream/70">
              <li>
                <span className="text-cream/50 text-xs uppercase tracking-wider font-sans block mb-1">Carolyn</span>
                <a href={BUSINESS.contacts.carolyn.phoneHref} className="hover:text-gold transition-colors duration-200 font-medium text-cream">
                  {BUSINESS.contacts.carolyn.phone}
                </a>
              </li>
              <li>
                <span className="text-cream/50 text-xs uppercase tracking-wider font-sans block mb-1">Tommy</span>
                <a href={BUSINESS.contacts.tommy.phoneHref} className="hover:text-gold transition-colors duration-200 font-medium text-cream">
                  {BUSINESS.contacts.tommy.phone}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={BUSINESS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cream/70 hover:text-gold transition-colors duration-200"
                  aria-label="TCM Home Solutions on Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h3 className="font-serif text-gold text-lg mb-5">Service Area</h3>
            <p className="text-cream/60 text-xs mb-3 font-sans">Serving East Texas communities including:</p>
            <ul className="grid grid-cols-2 gap-1">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="text-cream/70 text-xs">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>© {year} TCM Home Solutions LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p>San Augustine, TX · Serving East Texas</p>
            <Link
              href="/admin/login"
              id="footer-admin-link"
              className="inline-flex items-center gap-1.5 text-cream/40 hover:text-gold transition-colors duration-200 focus:outline-none focus:text-gold"
            >
              <Lock size={11} className="opacity-70" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
