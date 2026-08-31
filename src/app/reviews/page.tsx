import type { Metadata } from 'next';
import { AnimatedSection, AnimatedGroup, AnimatedItem } from '@/components/ui/AnimatedSection';
import GoldDivider from '@/components/ui/GoldDivider';
import ReviewCard from '@/components/ui/ReviewCard';
import StarRating from '@/components/ui/StarRating';
import CTABand from '@/components/ui/CTABand';
import { REVIEWS, BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Customer Reviews',
  description: 'Read real customer reviews for TCM Home Solutions LLC — professional home cleaning and handyman services in San Augustine, TX. 100% recommended by our clients.',
};

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'TCM Home Solutions LLC',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '1',
    reviewCount: '21',
  },
  review: REVIEWS.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.author },
    reviewRating: { '@type': 'Rating', ratingValue: r.stars, bestRating: '5' },
    reviewBody: r.text,
  })),
};

export default function ReviewsPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-forest pt-36 pb-24 px-4 text-center" aria-label="Reviews hero">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <p className="section-label text-gold/80 mb-4">What Clients Say</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream mb-6">
              Real People.<br /><span className="text-gold italic">Real Results.</span>
            </h1>
            <GoldDivider />
            <div className="flex items-center justify-center gap-4 mt-6">
              <StarRating rating={5} size="lg" />
              <p className="text-cream/70 text-base font-sans">
                {BUSINESS.rating} · {BUSINESS.reviewCount} Reviews
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* REVIEWS GRID */}
      <section className="bg-cream py-24 px-4" aria-label="Customer reviews">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-body/60 text-sm font-sans max-w-lg mx-auto">
              Every review below is from a real client who trusted us in their home. We&apos;re honored by every kind word.
            </p>
          </AnimatedSection>

          <AnimatedGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <AnimatedItem key={review.id}>
                <ReviewCard
                  author={review.author}
                  text={review.text}
                  stars={review.stars}
                  className="h-full"
                />
              </AnimatedItem>
            ))}
          </AnimatedGroup>

          <AnimatedSection delay={0.2} className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-forest rounded-card-lg px-8 py-6">
              <div className="text-center sm:text-left">
                <p className="font-serif text-cream text-xl">Want to leave a review?</p>
                <p className="text-cream/60 text-sm mt-1">Find us on Facebook and let us know how we did!</p>
              </div>
              <a
                href={BUSINESS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-sm whitespace-nowrap flex-shrink-0"
                id="reviews-facebook-btn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Review Us on Facebook
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTABand
        heading="Ready to Experience It for Yourself?"
        subtext="Join our happy clients across East Texas."
        buttonText="Book Your Clean"
        buttonHref="/booking"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </>
  );
}
