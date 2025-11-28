import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface StarRatingProps {
  totalStars?: number;
  initialRating?: number;
  readOnly?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: number;
}

export function StarRating({
  totalStars = 5,
  initialRating = 0,
  readOnly = false,
  onRatingChange,
  size = 20,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  function handleClick(starValue: number) {
    if (!readOnly) {
      setRating(starValue);
      if (onRatingChange) onRatingChange(starValue);
    }
  }

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        
        // Lógica: Se o mouse estiver em cima, usa o valor do hover. Senão, usa o valor fixo.
        const isFilled = starValue <= (hover || rating);

        return (
          <Star
            key={index}
            size={size}
            className={cn(
              "transition-all duration-200",
              readOnly ? "cursor-default" : "cursor-pointer hover:scale-110",
              isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            )}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onMouseLeave={() => !readOnly && setHover(0)}
          />
        );
      })}
    </div>
  );
}