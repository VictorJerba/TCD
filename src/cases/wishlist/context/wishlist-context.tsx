import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ProductDTO } from "@/cases/products/dtos/product.dto"; 

type WishlistContextType = {
  items: ProductDTO[];
  addToWishlist: (product: ProductDTO) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
};

const WishlistContext = createContext({} as WishlistContextType);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ProductDTO[]>([]);

  
  useEffect(() => {
    const saved = localStorage.getItem("@oasis:wishlist");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("@oasis:wishlist", JSON.stringify(items));
  }, [items]);

  function addToWishlist(product: ProductDTO) {
    setItems((current) => {
      
      if (current.find((i) => i.id === product.id)) return current;
      return [...current, product];
    });
  }

  function removeFromWishlist(productId: string) {
    setItems((current) => current.filter((item) => item.id !== productId));
  }

  function isInWishlist(productId: string) {
    return items.some((item) => item.id === productId);
  }

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);