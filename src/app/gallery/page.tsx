import type { Metadata } from 'next';
import GalleryGrid from './GalleryGrid';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import GoldDivider from '@/components/ui/GoldDivider';
import CTABand from '@/components/ui/CTABand';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse photos and videos of cleaning and home improvement results by TCM Home Solutions LLC — serving East Texas.',
};

export default function GalleryPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-forest pt-36 pb-24 px-4 text-center" aria-label="Gallery hero">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <p className="section-label text-gold/80 mb-4">Our Work</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream mb-6">
              Results You Can<br /><span className="text-gold italic">See & Feel.</span>
            </h1>
            <GoldDivider />
            <p className="text-cream/70 text-lg mt-6 max-w-xl mx-auto">
              Photos and videos from real jobs across East Texas. More are added regularly as we complete new projects.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="bg-cream py-24 px-4" aria-label="Photo gallery">
        <div className="max-w-6xl mx-auto">
          <GalleryGrid />
        </div>
      </section>

      <CTABand
        heading="Like What You See?"
        subtext="Let's make your home look this good."
        buttonText="Book a Service"
        buttonHref="/booking"
      />
    </>
  );
}
