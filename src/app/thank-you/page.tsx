import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Quote Request Received',
  description: 'Thank you for reaching out to TCM Home Solutions LLC. We\'ll be in touch within 24 hours.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      {/* Future tracking pixel goes here */}
      {/* <!-- TRACKING PIXEL PLACEHOLDER --> */}

      <section className="min-h-screen bg-cream flex items-center justify-center px-4 py-24">
        <div className="max-w-lg w-full text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} className="text-forest" />
          </div>

          <h1 className="font-serif text-forest text-4xl sm:text-5xl mb-4">
            Request Received!
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-body/70 text-lg leading-relaxed mb-8">
            Thank you for reaching out. We&apos;ll give you a call or text <strong className="text-forest">within 24 hours</strong> to go over the details and get you scheduled.
          </p>

          <div className="bg-forest rounded-card-lg p-7 text-left mb-8">
            <h2 className="font-serif text-cream text-lg mb-4">What happens next?</h2>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-3">
                <span className="text-gold font-bold mt-0.5">1</span>
                <span>We review your request and check our schedule.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-bold mt-0.5">2</span>
                <span>You&apos;ll hear from Carolyn or Tommy within 24 hours by call or text.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-bold mt-0.5">3</span>
                <span>We confirm your quote, collect a deposit, and lock in your appointment.</span>
              </li>
            </ul>
          </div>

          <p className="text-body/60 text-sm mb-5">Need to reach us sooner?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BUSINESS.contacts.carolyn.phoneHref}
              id="thankyou-call-carolyn"
              className="btn-gold text-sm py-3"
            >
              <Phone size={14} />
              Call Carolyn: {BUSINESS.contacts.carolyn.phone}
            </a>
            <a
              href={BUSINESS.contacts.tommy.phoneHref}
              id="thankyou-call-tommy"
              className="btn-outline-gold text-sm py-3"
            >
              <Phone size={14} />
              Call Tommy: {BUSINESS.contacts.tommy.phone}
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-body/10">
            <Link href="/" className="text-gold text-sm hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
