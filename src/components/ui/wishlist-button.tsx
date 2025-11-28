import { Heart } from "lucide-react";
import { useWishlist } from "@/cases/wishlist/context/wishlist-context";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: ProductDTO;
  className?: string;
}

export function WishlistButton({ product, className }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  
  const isLiked = isInWishlist(product.id!);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) {
      removeFromWishlist(product.id!);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("rounded-full hover:bg-red-50 hover:text-red-500", className)}
      onClick={toggleLike}
    >
      <Heart 
        className={cn(
            "w-5 h-5 transition-all duration-300", 
            isLiked ? "fill-red-500 text-red-500 scale-110" : "text-gray-500"
        )} 
      />
    </Button>
  );
}