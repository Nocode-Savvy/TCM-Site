import type { Metadata } from 'next';
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '@/components/ui/AnimatedSection';
import GoldDivider from '@/components/ui/GoldDivider';
import CTABand from '@/components/ui/CTABand';
import { CheckCircle2, Wrench, Droplets, Paintbrush } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services & Pricing',
  description: 'Full list of cleaning and handyman services offered by TCM Home Solutions LLC — residential cleaning, deep clean, move-in/out, pressure washing, painting, and more in East Texas.',
};

const CLEANING_SERVICES = [
  {
    id: 'signature',
    name: 'Residential Cleaning',
    subtitle: 'Signature / Maintenance Clean',
    description: 'A detailed refresh to keep your home consistently fresh and comfortable.',
    includes: [
      'Dusting & surface cleaning',
      'Kitchen wipe-down',
      'Bathroom cleaning',
      'Vacuuming & mopping',
      'Trash removal',
    ],
    pricing: [
      { size: '1 Bed / 1 Bath', price: '$125–$150' },
      { size: '2 Bed / 1 Bath', price: '$150–$200' },
      { size: '3 Bed / 2 Bath', price: '$200–$275' },
      { size: '4 Bed / 2+ Bath', price: '$250–$400+' },
    ],
  },
  {
    id: 'deep-clean',
    name: 'Deep Clean',
    subtitle: null,
    description: 'A full reset for every room — perfect for seasonal refreshes or before/after special occasions.',
    includes: [
      'Everything in Signature Clean',
      'Baseboards & doors',
      'Detailed bathroom cleaning',
      'Kitchen detailing',
      'Buildup removal',
      'Inside appliances (upon request)',
    ],
    pricing: [
      { size: 'Starting at', price: '$250' },
      { size: 'Average range', price: '$300–$600+' },
    ],
  },
  {
    id: 'move',
    name: 'Move-In / Move-Out Clean',
    subtitle: null,
    description: 'A fresh start or a clean handoff — done right.',
    includes: [
      'Deep cleaning of all areas',
      'Cabinets & drawers inside/out',
      'Appliances inside/out',
      'Bathrooms fully detailed',
      'Floors & baseboards',
      'Interior windows',
      'Trash removal',
    ],
    pricing: [
      { size: '1 Bed / 1 Bath', price: 'Starting at $250' },
      { size: '2–3 Bed / 2 Bath', price: 'Starting at $350' },
      { size: '4+ Bed / 2+ Bath', price: 'Starting at $450+' },
    ],
    note: 'Construction cleanouts & heavy buildup quoted separately.',
  },
  {
    id: 'commercial',
    name: 'Office & Commercial Cleaning',
    subtitle: null,
    description: 'Keep your workspace as fresh as your home. Custom quotes based on space size and frequency.',
    includes: [],
    pricing: [{ size: 'Custom quote', price: 'Contact us' }],
  },
  {
    id: 'upholstery',
    name: 'Furniture & Upholstery Steam Cleaning',
    subtitle: null,
    description: 'Deep, sanitizing steam clean for sofas, mattresses, and upholstered furniture.',
    includes: [],
    pricing: [{ size: 'Custom quote', price: 'Contact us' }],
  },
];

const ADDONS_LIST = [
  { name: 'Inside Oven', price: '$40' },
  { name: 'Inside Fridge', price: '$40' },
  { name: 'Interior Windows', price: '$5–10 each' },
  { name: 'Ceiling Fans', price: '$5–15 each' },
  { name: 'Carpet Shampooing', price: 'Custom quote' },
  { name: 'Pet Hair Removal', price: 'Custom quote' },
  { name: 'Organization Projects', price: 'Custom quote' },
  { name: 'Mattress Steam Cleaning', price: 'Custom quote' },
];

const HANDYMAN_SERVICES = [
  {
    icon: <Wrench size={26} className="text-forest group-hover:text-gold transition-colors" />,
    name: 'Handyman & Home Improvement',
    description: 'From quick fixes to bigger projects, big or small, we do it all.',
  },
  {
    icon: <Droplets size={26} className="text-forest group-hover:text-gold transition-colors" />,
    name: 'Pressure Washing',
    description: 'Refresh driveways, siding, decks, and more — restore the outside of your home as much as the inside.',
  },
  {
    icon: <Paintbrush size={26} className="text-forest group-hover:text-gold transition-colors" />,
    name: 'Painting',
    description: 'Interior and exterior painting to bring new life to your space.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-forest pt-36 pb-24 px-4 text-center" aria-label="Services hero">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <p className="section-label text-gold/80 mb-4">What We Offer</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream mb-6">
              Our Services
            </h1>
            <GoldDivider />
            <p className="text-cream/70 text-lg mt-6 max-w-2xl mx-auto">
              From everyday cleaning to home repairs, we&apos;ve got it covered — one team, every solution.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CLEANING SERVICES */}
      <section className="bg-cream py-24 px-4" aria-label="Cleaning services">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="section-label text-gold mb-2">Cleaning</p>
            <h2 className="section-heading text-forest">Cleaning Services</h2>
            <GoldDivider className="mt-3 justify-start" />
          </AnimatedSection>

          <div className="space-y-8">
            {CLEANING_SERVICES.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.06}>
                <div className="bg-white rounded-card shadow-card p-8 hover:shadow-card-hover transition-all duration-200">
                  <div className="flex flex-col lg:flex-row lg:gap-12">
                    {/* Left: details */}
                    <div className="flex-1 mb-8 lg:mb-0">
                      <h3 className="font-serif text-forest text-2xl font-semibold">{service.name}</h3>
                      {service.subtitle && (
                        <p className="text-gold text-sm font-sans font-medium mt-1">{service.subtitle}</p>
                      )}
                      <p className="text-body/70 mt-3 leading-relaxed">{service.description}</p>

                      {service.includes.length > 0 && (
                        <div className="mt-5">
                          <p className="text-forest text-sm font-semibold font-sans mb-3">What&apos;s Included:</p>
                          <ul className="space-y-2">
                            {service.includes.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-body/70 text-sm">
                                <CheckCircle2 size={15} className="text-gold mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.note && (
                        <p className="text-body/50 text-xs mt-4 italic">{service.note}</p>
                      )}
                    </div>

                    {/* Right: pricing */}
                    <div className="lg:w-56 flex-shrink-0">
                      <div className="bg-cream rounded-card p-5">
                        <p className="text-forest text-xs font-semibold font-sans uppercase tracking-wider mb-4">Pricing</p>
                        <div className="space-y-3">
                          {service.pricing.map((p) => (
                            <div key={p.size} className="flex justify-between items-start gap-2">
                              <span className="text-body/60 text-xs leading-tight">{p.size}</span>
                              <span className="text-forest font-semibold text-sm font-sans text-right whitespace-nowrap">{p.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* ADD-ONS */}
          <AnimatedSection delay={0.1} className="mt-14">
            <div className="bg-forest rounded-card-lg p-8">
              <h3 className="font-serif text-cream text-2xl mb-2">Add-On Services</h3>
              <p className="text-cream/60 text-sm mb-7">Enhance any cleaning service with these extras.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ADDONS_LIST.map((addon) => (
                  <div key={addon.name} className="bg-forest-light rounded-card p-4 border border-gold/15">
                    <p className="text-cream text-sm font-semibold">{addon.name}</p>
                    <p className="text-gold text-sm font-sans mt-1">{addon.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* HANDYMAN SERVICES */}
      <section className="bg-white py-24 px-4" aria-label="Handyman services">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="section-label text-gold mb-2">Handyman</p>
            <h2 className="section-heading text-forest">Home Improvement Services</h2>
            <GoldDivider className="mt-3 justify-start" />
          </AnimatedSection>

          <AnimatedGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HANDYMAN_SERVICES.map((service) => (
              <AnimatedItem key={service.name}>
                <div className="card p-7 h-full flex flex-col group">
                  <div className="w-14 h-14 rounded-2xl bg-forest/5 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-serif text-forest text-xl font-semibold mb-3">{service.name}</h3>
                  <p className="text-body/65 text-sm leading-relaxed flex-1">{service.description}</p>
                  <p className="text-gold text-sm font-sans font-medium mt-5">Custom quote based on project scope</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedGroup>

          {/* Disclaimer */}
          <AnimatedSection delay={0.1} className="mt-10">
            <div className="bg-cream rounded-card p-5 border border-gold/10">
              <p className="text-body/55 text-xs leading-relaxed text-center">
                Prices may vary depending on the size and condition of the home. Additional charges may apply if extra time or heavy cleaning is required. All handyman, painting, and pressure washing services are custom-quoted based on project scope.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTABand
        heading="Not sure what you need? Let's talk it through."
        subtext="We'll help you figure out exactly what's right for your home."
        buttonText="Get a Free Quote"
        buttonHref="/booking"
      />
    </>
  );
}
