import StarRating from './StarRating';

interface ReviewCardProps {
  author: string;
  text: string;
  stars?: number;
  variant?: 'light' | 'dark';
  className?: string;
}

export default function ReviewCard({ author, text, stars = 5, variant = 'light', className = '' }: ReviewCardProps) {
  const isLight = variant === 'light';
  return (
    <div
      className={`rounded-card p-7 transition-all duration-200 hover:shadow-card-hover hover:scale-[1.02] ${
        isLight
          ? 'bg-white shadow-card'
          : 'bg-forest-light border border-gold/20'
      } ${className}`}
    >
      <StarRating rating={stars} size="md" />
      <blockquote className={`mt-4 text-base leading-relaxed italic ${isLight ? 'text-body' : 'text-cream/90'}`}>
        &ldquo;{text}&rdquo;
      </blockquote>
      <p className={`mt-4 font-semibold text-sm font-sans ${isLight ? 'text-forest' : 'text-gold'}`}>
        — {author}
      </p>
    </div>
  );
}
