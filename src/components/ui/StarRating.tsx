import { Star } from 'lucide-react';

interface StarRatingProps {
  rating?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ rating = 5, size = 'md' }: StarRatingProps) {
  const pixelSize = {
    sm: 14,
    md: 18,
    lg: 22,
  }[size];

  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < rating;
        return (
          <Star
            key={i}
            size={pixelSize}
            className={isFilled ? 'text-gold' : 'text-gray-300'}
            fill={isFilled ? '#C9A24B' : 'none'}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}
