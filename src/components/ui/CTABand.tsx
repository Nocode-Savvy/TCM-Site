import Link from 'next/link';

interface CTABandProps {
  heading: string;
  subtext?: string;
  buttonText: string;
  buttonHref: string;
  variant?: 'forest' | 'gold';
}

export default function CTABand({ heading, subtext, buttonText, buttonHref, variant = 'forest' }: CTABandProps) {
  const isForest = variant === 'forest';
  return (
    <section className={`py-20 px-4 text-center ${isForest ? 'bg-forest' : 'bg-gold'}`}>
      <div className="max-w-2xl mx-auto">
        <h2 className={`font-serif text-3xl md:text-4xl mb-4 ${isForest ? 'text-cream' : 'text-forest'}`}>
          {heading}
        </h2>
        {subtext && (
          <p className={`text-sm mb-8 font-sans ${isForest ? 'text-cream/70' : 'text-forest/80'}`}>
            {subtext}
          </p>
        )}
        <Link
          href={buttonHref}
          className={`inline-flex items-center gap-2 rounded-full px-8 py-4 font-sans font-semibold text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-gold active:scale-[0.98] ${
            isForest
              ? 'bg-gold text-white hover:bg-gold-dark'
              : 'bg-forest text-cream hover:bg-forest-dark'
          }`}
        >
          {buttonText}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
