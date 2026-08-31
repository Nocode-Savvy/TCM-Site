'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  MapPin,
  Star,
  Home,
  Users,
  ShieldCheck,
  Search,
  HeartHandshake,
  BadgeDollarSign,
} from 'lucide-react';
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '@/components/ui/AnimatedSection';
import GoldDivider from '@/components/ui/GoldDivider';
import ServiceCard from '@/components/ui/ServiceCard';
import ReviewCard from '@/components/ui/ReviewCard';
import CTABand from '@/components/ui/CTABand';
import { SERVICES, REVIEWS, SERVICE_AREAS } from '@/lib/constants';

const PREVIEW_SERVICES = SERVICES.slice(0, 6);

const TRUST_ITEMS = [
  { icon: <Home size={20} className="text-gold" />, text: 'Locally Owned', sub: 'San Augustine, TX' },
  { icon: <Star size={20} className="text-gold" fill="#C9A24B" />, text: '100% Recommended', sub: '21 Verified Reviews' },
  { icon: <Users size={20} className="text-gold" />, text: 'Cleaning + Handyman', sub: 'One Complete Team' },
  { icon: <MapPin size={20} className="text-gold" />, text: '11+ Communities', sub: 'Across East Texas' },
];

const HOW_WORK_ITEMS = [
  {
    icon: <ShieldCheck size={26} className="text-forest group-hover:text-gold transition-colors" />,
    title: 'Reliable',
    desc: 'We show up when we say we will, every time.',
  },
  {
    icon: <Search size={26} className="text-forest group-hover:text-gold transition-colors" />,
    title: 'Detail-Oriented',
    desc: 'We clean and fix with intention, not just to check a box.',
  },
  {
    icon: <HeartHandshake size={26} className="text-forest group-hover:text-gold transition-colors" />,
    title: 'Judgment-Free',
    desc: 'Every home has a story. We\'re honored to be part of yours.',
  },
  {
    icon: <BadgeDollarSign size={26} className="text-forest group-hover:text-gold transition-colors" />,
    title: 'Honest Pricing',
    desc: 'No surprise fees, no fine print games. Just clear, upfront quotes.',
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const featuredReview = REVIEWS[0];

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero section"
      >
        {/* Parallax background */}
        <motion.div className="absolute inset-0" style={{ y: yParallax }}>
          <Image
            src="/hero-bg.jpg"
            alt="Beautiful, clean East Texas home interior"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </motion.div>

        {/* Dark green gradient overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="section-label text-gold mb-4 tracking-widest">East Texas Home Services</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1] text-balance">
              One Call.<br />
              <span className="text-gold italic">Every Home Need,</span><br />
              Handled.
            </h1>
            <p className="text-cream/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Cleaning and handyman services under one roof. Reliable, honest, and local to East Texas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" id="hero-quote-btn" className="btn-gold text-base py-4 px-8">
                Get a Free Quote
              </Link>
              <a href="tel:9362012261" id="hero-call-btn" className="btn-outline-cream text-base py-4 px-8">
                Call Now
              </a>
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-cream/30 flex items-start justify-center p-1.5">
              <motion.div
                className="w-1.5 h-2.5 rounded-full bg-gold"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-cream py-10 px-4" aria-label="Trust indicators">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_ITEMS.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-serif text-forest text-sm font-semibold">{item.text}</p>
                  <p className="text-body/60 text-xs font-sans mt-0.5">{item.sub}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-forest py-24 px-4" id="services" aria-label="Our services">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-4">
            <p className="section-label text-gold/80">What We Do</p>
          </AnimatedSection>
          <AnimatedSection delay={0.06} className="text-center mb-2">
            <h2 className="section-heading text-cream">Our Services</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="text-center mb-10">
            <GoldDivider />
          </AnimatedSection>

          <AnimatedGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PREVIEW_SERVICES.map((service) => (
              <AnimatedItem key={service.id}>
                <ServiceCard
                  iconName={service.iconName}
                  name={service.name}
                  description={service.description}
                  href="/services"
                />
              </AnimatedItem>
            ))}
          </AnimatedGroup>

          <AnimatedSection delay={0.1} className="text-center mt-10">
            <Link href="/services" className="btn-outline-gold">
              See All Services <span aria-hidden="true">→</span>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* RESULTS + REVIEW */}
      <section className="bg-white py-24 px-4" aria-label="Client results and review">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <AnimatedSection>
              <div className="relative rounded-card-lg overflow-hidden shadow-card-hover aspect-[4/3]">
                <Image
                  src="/results-after.jpg"
                  alt="Professionally cleaned kitchen — spotless results by TCM Home Solutions"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-forest/90 text-cream text-xs font-sans font-semibold px-3 py-1.5 rounded-full">
                  ✓ After Clean
                </div>
              </div>
            </AnimatedSection>

            {/* Review */}
            <AnimatedSection delay={0.1}>
              <p className="section-label text-gold mb-3">What Clients Say</p>
              <h2 className="section-heading text-forest mb-6">Real Results.<br />Real People.</h2>
              <ReviewCard
                author={featuredReview.author}
                text={featuredReview.text}
                stars={featuredReview.stars}
              />
              <div className="mt-6">
                <Link href="/reviews" className="btn-outline-gold text-sm py-2.5">
                  Read More Reviews <span aria-hidden="true">→</span>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="bg-cream py-24 px-4" aria-label="About TCM Home Solutions">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="section-label text-gold mb-3">Our Story</p>
            <h2 className="section-heading text-forest mb-5">One Team, Every Home Need</h2>
            <GoldDivider />
            <p className="text-body/70 text-lg mt-6 mb-8 leading-relaxed max-w-2xl mx-auto">
              TCM Home Solutions started with a simple idea: home care shouldn&apos;t mean juggling five different people for five different jobs. We&apos;re locally owned, proudly based in San Augustine, and committed to treating your home like it matters — because it does.
            </p>
            <Link href="/about" className="btn-gold">
              Our Story <span aria-hidden="true">→</span>
            </Link>
          </AnimatedSection>

          {/* Values */}
          <AnimatedGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
            {HOW_WORK_ITEMS.map((item) => (
              <AnimatedItem key={item.title}>
                <div className="bg-white rounded-card p-5 shadow-card text-center hover:shadow-card-hover hover:scale-[1.02] transition-all duration-200 group flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center mb-3 group-hover:bg-gold/15 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-forest text-sm font-semibold mb-1">{item.title}</h3>
                  <p className="text-body/60 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedGroup>
        </div>
      </section>

      {/* AREAS WE SERVE */}
      <section className="bg-forest py-24 px-4" id="areas" aria-label="Service area">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <p className="section-label text-gold/80 mb-3">Where We Work</p>
            <h2 className="section-heading text-cream mb-3">Areas We Serve</h2>
            <GoldDivider />
            <p className="text-cream/60 text-sm mt-4 mb-10 max-w-xl mx-auto">
              Proudly serving families and businesses across East Texas. If you&apos;re nearby and don&apos;t see your town, reach out — we&apos;ll see what we can do.
            </p>
          </AnimatedSection>

          <AnimatedGroup className="flex flex-wrap justify-center gap-3">
            {SERVICE_AREAS.map((area) => (
              <AnimatedItem key={area}>
                <span className="inline-flex items-center gap-1.5 bg-cream/10 border border-gold/20 text-cream/80 rounded-full px-4 py-2 text-sm font-sans hover:border-gold hover:text-gold transition-all duration-200">
                  <MapPin size={12} className="text-gold" />
                  {area}, TX
                </span>
              </AnimatedItem>
            ))}
          </AnimatedGroup>
        </div>
      </section>

      {/* BOOKING CTA */}
      <CTABand
        heading="Now Booking — Get Your Free Quote Today"
        subtext="Fast response. No pressure. Honest pricing."
        buttonText="Request a Quote"
        buttonHref="/booking"
      />

      {/* Local Business JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'TCM Home Solutions LLC',
            description: 'Professional residential cleaning, deep cleaning, move-in/out cleaning, handyman services, pressure washing, and painting in San Augustine, TX and across East Texas.',
            url: 'https://tcmhomesolutions.com',
            telephone: '+19362012261',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'San Augustine',
              addressRegion: 'TX',
              postalCode: '75972',
              addressCountry: 'US',
            },
            areaServed: [
              'San Augustine', 'Fairmont', 'Lufkin', 'Broaddus', 'Hemphill',
              'Pineland', 'Carthage', 'Henderson County', 'Jasper', 'Nacogdoches', 'Huxley',
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Home Cleaning & Handyman Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Residential Cleaning' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Deep Clean' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Move-In / Move-Out Clean' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office & Commercial Cleaning' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Handyman & Home Improvement' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pressure Washing' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Painting' } },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              bestRating: '5',
              worstRating: '1',
              reviewCount: '21',
              ratingCount: '21',
            },
            sameAs: ['https://www.facebook.com/share/1DS1AB3QmF/?mibextid=wwXIfr'],
          }),
        }}
      />
    </>
  );
}
