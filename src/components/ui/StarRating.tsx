
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  interactive?: boolean;
  disabled?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  maxStars = 5,
  onChange,
  size = 'md',
  className,
  interactive = true,
  disabled = false
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  const starSizes = {
    sm: { size: 14, className: 'space-x-0.5' },
    md: { size: 18, className: 'space-x-1' },
    lg: { size: 24, className: 'space-x-2' },
  };

  const { size: starSize, className: starSpacing } = starSizes[size];

  const handleClick = (index: number) => {
    if (interactive && onChange && !disabled) {
      try {
        // If clicking the same star twice, clear the rating
        const newRating = rating === index ? 0 : index;
        console.log(`StarRating: Updating rating to ${newRating}`);
        onChange(newRating);
      } catch (error) {
        console.error('StarRating: Error handling click:', error);
      }
    }
  };

  return (
    <div 
      className={cn('flex items-center', starSpacing, className)}
      onMouseLeave={() => interactive && setHoverRating(0)}
    >
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = hoverRating ? starValue <= hoverRating : starValue <= rating;
        
        return (
          <Star
            key={index}
            size={starSize}
            className={cn(
              'transition-all duration-200',
              isFilled ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300',
              interactive && !disabled && 'cursor-pointer hover:scale-110',
              (!interactive || disabled) && 'pointer-events-none',
              disabled && 'opacity-50'
            )}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => interactive && !disabled && setHoverRating(starValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
