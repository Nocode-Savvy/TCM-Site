import type { Metadata } from 'next';
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '@/components/ui/AnimatedSection';
import GoldDivider from '@/components/ui/GoldDivider';
import CTABand from '@/components/ui/CTABand';
import {
  Phone,
  ShieldCheck,
  Search,
  HeartHandshake,
  BadgeDollarSign,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us — Our Story & Team',
  description: 'Learn about TCM Home Solutions LLC — a locally owned home cleaning and handyman company based in San Augustine, TX. Honest work, real people, serving East Texas.',
};

const VALUES = [
  {
    icon: <ShieldCheck size={28} className="text-forest group-hover:text-gold transition-colors" />,
    title: 'Reliable',
    desc: 'We show up when we say we will, every time.',
  },
  {
    icon: <Search size={28} className="text-forest group-hover:text-gold transition-colors" />,
    title: 'Detail-Oriented',
    desc: 'We clean and fix with intention, not just to check a box.',
  },
  {
    icon: <HeartHandshake size={28} className="text-forest group-hover:text-gold transition-colors" />,
    title: 'Judgment-Free',
    desc: 'Every home has a story. We\'re honored to be part of yours.',
  },
  {
    icon: <BadgeDollarSign size={28} className="text-forest group-hover:text-gold transition-colors" />,
    title: 'Honest Pricing',
    desc: 'No surprise fees, no fine print games. Just clear, upfront quotes.',
  },
];

const TEAM = [
  {
    name: 'Carolyn',
    phone: BUSINESS.contacts.carolyn.phone,
    phoneHref: BUSINESS.contacts.carolyn.phoneHref,
    // CLIENT: ADD FINAL BIO below before launch
    bio: 'Carolyn co-founded TCM Home Solutions and leads the cleaning team with care, precision, and a genuine love for helping East Texas families feel at home. [CLIENT: REPLACE WITH FINAL BIO]',
    initial: 'C',
  },
  {
    name: 'Tommy',
    phone: BUSINESS.contacts.tommy.phone,
    phoneHref: BUSINESS.contacts.tommy.phoneHref,
    // CLIENT: ADD FINAL BIO below before launch
    bio: 'Tommy brings expertise in handyman work, painting, and home improvement to every project — ensuring every job is done right and built to last. [CLIENT: REPLACE WITH FINAL BIO]',
    initial: 'T',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-forest pt-36 pb-24 px-4 text-center" aria-label="About hero">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <p className="section-label text-gold/80 mb-4">Our Story</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream mb-6 leading-tight">
              Solutions for<br /><span className="text-gold italic">Everyday Life.</span>
            </h1>
            <GoldDivider />
            <p className="text-cream/70 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              We believe a clean, well-kept home shouldn&apos;t be complicated to get. That&apos;s the whole reason TCM Home Solutions exists.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-cream py-24 px-4" aria-label="Our story">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="section-label text-gold mb-3">How It Started</p>
            <h2 className="section-heading text-forest mb-6">One Team, Every Home Need</h2>
            <GoldDivider className="mb-8" />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <AnimatedSection className="space-y-5 text-body/80 leading-relaxed text-base">
              <p>
                TCM Home Solutions started with a simple idea: home care shouldn&apos;t mean juggling five different people for five different jobs. What began as trusted local cleaning services grew into something bigger — a full home solutions team offering cleaning, handyman work, painting, pressure washing, and everything in between, all under one roof.
              </p>
              <p>
                We&apos;re locally owned and operated, proudly based in San Augustine and serving communities across East Texas. Whether it&apos;s a deep clean before a big event, a move-out clean to help you close on a sale, or a repair you&apos;ve been putting off for months, our goal is the same every time: show up, do it right, and treat your home like it matters — because it does.
              </p>
              <p className="font-semibold text-forest font-serif text-lg italic">
                No judgment. No shortcuts. Just honest work from people who actually care.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="bg-forest rounded-card-lg p-8 text-center shadow-card">
                <div className="w-14 h-14 rounded-full bg-forest-light border border-gold/20 flex items-center justify-center mx-auto mb-4 text-gold">
                  <MapPin size={26} />
                </div>
                <h3 className="font-serif text-cream text-xl mb-3">Locally Rooted</h3>
                <p className="text-cream/70 text-sm leading-relaxed mb-5">
                  Proudly based in San Augustine, TX, and serving 11+ East Texas communities with the same care we&apos;d give our own home.
                </p>
                <div className="border-t border-cream/10 pt-5">
                  <p className="text-gold font-serif text-3xl font-semibold">21</p>
                  <p className="text-cream/60 text-xs font-sans mt-1">Five-star reviews &amp; 100% recommended</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="bg-white py-24 px-4" aria-label="Our values">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label text-gold mb-3">What Sets Us Apart</p>
            <h2 className="section-heading text-forest mb-3">How We Work</h2>
            <GoldDivider />
          </AnimatedSection>

          <AnimatedGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((item) => (
              <AnimatedItem key={item.title}>
                <div className="card p-7 text-center h-full flex flex-col items-center group">
                  <div className="w-14 h-14 rounded-2xl bg-forest/5 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-forest text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-body/65 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedGroup>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="bg-cream py-24 px-4" aria-label="Meet the team">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label text-gold mb-3">The People Behind It All</p>
            <h2 className="section-heading text-forest mb-3">Meet the Team</h2>
            <GoldDivider />
            <p className="text-body/70 mt-4 max-w-lg mx-auto text-sm">
              TCM Home Solutions is run by a team that treats your home like our own.
            </p>
          </AnimatedSection>

          <AnimatedGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TEAM.map((member) => (
              <AnimatedItem key={member.name}>
                <div className="bg-white rounded-card shadow-card p-8 flex flex-col items-center text-center hover:shadow-card-hover transition-all duration-200">
                  <div className="w-20 h-20 rounded-full bg-forest flex items-center justify-center text-3xl font-serif text-gold font-bold mb-5 shadow-md">
                    {member.initial}
                  </div>
                  <h3 className="font-serif text-forest text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-body/65 text-sm leading-relaxed mb-5 max-w-xs">{member.bio}</p>
                  <a
                    href={member.phoneHref}
                    className="inline-flex items-center gap-2 text-gold font-semibold text-sm font-sans hover:text-gold-dark transition-colors"
                  >
                    <Phone size={14} />
                    {member.phone}
                  </a>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedGroup>
        </div>
      </section>

      {/* CLOSING CTA */}
      <CTABand
        heading="Ready to Experience the TCM Difference?"
        subtext="Honest work. Real results. No shortcuts."
        buttonText="Get a Free Quote"
        buttonHref="/booking"
      />
    </>
  );
}
