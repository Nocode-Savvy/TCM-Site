import type { Metadata } from 'next';
import BookingForm from './BookingForm';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import GoldDivider from '@/components/ui/GoldDivider';
import { POLICIES, BUSINESS } from '@/lib/constants';
import { Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Get a Free Quote',
  description: 'Request a free quote for cleaning or handyman services in East Texas. TCM Home Solutions LLC — fast response, honest pricing, no pressure.',
};

export default function BookingPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-forest pt-36 pb-20 px-4 text-center" aria-label="Booking hero">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <p className="section-label text-gold/80 mb-4">Free Quote Request</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-cream mb-5">
              Let&apos;s Get Your<br /><span className="text-gold italic">Home Handled.</span>
            </h1>
            <GoldDivider />
            <p className="text-cream/70 text-base mt-5">
              Fill out the form below and we&apos;ll get back to you within 24 hours. No pressure, no obligation — just a straight answer on what we can do for you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-cream py-16 px-4" aria-label="Quote request form">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-card-lg shadow-card p-8">
                <h2 className="font-serif text-forest text-2xl mb-2">Request a Quote</h2>
                <p className="text-body/60 text-sm mb-8">Fields marked with * are required.</p>
                <BookingForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Contact Card */}
              <div className="bg-forest rounded-card p-6 text-center">
                <h3 className="font-serif text-cream text-lg mb-4">Prefer to Call?</h3>
                <p className="text-cream/60 text-xs mb-5">We&apos;re happy to answer questions before you book.</p>
                <div className="space-y-3">
                  <a
                    href={BUSINESS.contacts.carolyn.phoneHref}
                    id="booking-sidebar-call-carolyn"
                    className="flex items-center justify-center gap-2 bg-gold text-white rounded-full py-2.5 px-5 text-sm font-semibold font-sans hover:bg-gold-dark transition-all w-full"
                  >
                    <Phone size={14} />
                    Carolyn: {BUSINESS.contacts.carolyn.phone}
                  </a>
                  <a
                    href={BUSINESS.contacts.tommy.phoneHref}
                    id="booking-sidebar-call-tommy"
                    className="flex items-center justify-center gap-2 bg-cream/10 border border-cream/20 text-cream rounded-full py-2.5 px-5 text-sm font-semibold font-sans hover:bg-cream/20 transition-all w-full"
                  >
                    <Phone size={14} />
                    Tommy: {BUSINESS.contacts.tommy.phone}
                  </a>
                </div>
              </div>

              {/* What to expect */}
              <div className="bg-white rounded-card shadow-card p-6">
                <h3 className="font-serif text-forest text-base mb-4">What to Expect</h3>
                <ul className="space-y-3 text-sm text-body/65">
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">✓</span>
                    <span>Response within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">✓</span>
                    <span>No pressure or obligation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">✓</span>
                    <span>Honest, upfront pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">✓</span>
                    <span>Deposit required to confirm booking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT POLICIES */}
      <section className="bg-white py-16 px-4" id="policies" aria-label="Service policies">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <p className="section-label text-gold mb-3">Before You Book</p>
            <h2 className="section-heading text-forest mb-3">Service Policies</h2>
            <GoldDivider />
            <p className="text-body/60 text-sm mt-4 max-w-lg mx-auto">
              Please review our policies below. By submitting a quote request, you&apos;re agreeing to these terms.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {POLICIES.map((policy) => (
                <div key={policy.title} className="bg-cream rounded-card p-6 border border-gold/10">
                  <h3 className="font-sans font-semibold text-forest text-sm mb-2">{policy.title}</h3>
                  <p className="text-body/65 text-sm leading-relaxed">{policy.content}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
