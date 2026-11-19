import { Star } from 'lucide-react';

const STAR_VALUES = [1, 2, 3, 4, 5];

export function RatingStars({ rating = 0, count }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {STAR_VALUES.map((value) => (
          <Star
            key={value}
            size={13}
            className={value <= Math.round(rating) ? 'fill-accent text-accent' : 'text-border'}
          />
        ))}
      </div>
      {count !== undefined && <span className="text-xs text-ink-faint">({count})</span>}
    </div>
  );
}
