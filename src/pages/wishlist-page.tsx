import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "@/cases/wishlist/context/wishlist-context";
import { ProductCard } from "@/cases/products/components/product-card";
import { Button } from "@/components/ui/button";

export function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        <h1 className="text-2xl font-bold">Meus Favoritos</h1>
        <span className="text-gray-500 text-sm ml-2">({items.length} itens)</span>
      </div>

      {items.length === 0 ? (
        // Estado Vazio
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl bg-gray-50/50">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <Heart className="w-8 h-8 text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Sua lista está vazia</h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Você ainda não curtiu nenhum produto. Explore nossa loja e clique no coração para salvar o que você ama.
          </p>
          <Link to="/">
            <Button>Ir para a Loja</Button>
          </Link>
        </div>
      ) : (
        // Grid de Produtos Favoritos
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product.id} className="flex justify-center">
                {}
                <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}