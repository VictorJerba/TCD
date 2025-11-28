import { useCart } from "@/cases/cart/hooks/use-cart";
import { ShoppingCart, User, Heart } from "lucide-react"; // Adicionei Heart
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/cases/auth/hooks/use-auth";
// Importação do Contexto de Favoritos
import { useWishlist } from "@/cases/wishlist/context/wishlist-context";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Header() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, signOut } = useAuth();
  
  // Pegamos os itens da lista de desejos (renomeei para wishlistItems para não confundir)
  const { items: wishlistItems } = useWishlist();

  function handleSignOut() {
    signOut();
    navigate('/');
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 gap-4">

        {/* LOGO */}
        <Link to="/">
            <div className="flex items-center gap-2 cursor-pointer">
            <ShoppingCart className="text-green-600" />
            <h1 className="text-lg font-bold">
                <span className="font-light">Oasis</span> Shop
            </h1>
            </div>
        </Link>

        <div className="flex items-center gap-1">

          {!user && (
            <Link to="/signin">
              <Button variant="link">
                Entrar
              </Button>
            </Link>
          )}

          {/* --- BOTÃO DE FAVORITOS (NOVO) --- */}
          <Link to="/wishlist" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-red-600 hover:bg-red-50 relative group"
            >
              {/* O coração preenche (fill) quando passa o mouse */}
              <Heart className="group-hover:fill-current transition-all" />
              
              {wishlistItems.length > 0 && (
                <Badge
                  className={cn(
                    "absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-red-500 text-white hover:bg-red-600"
                  )}
                >
                  {wishlistItems.length}
                </Badge>
              )}
            </Button>
          </Link>
          {/* ------------------------------- */}

          {/* BOTÃO DO CARRINHO */}
          <Link to="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-700 relative"
            >
              <ShoppingCart />
              {cart.items.length > 0 && (
                <Badge
                  className={cn(
                    "absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-green-600 text-white"
                  )}
                >
                  {cart.items.length}
                </Badge>
              )}
            </Button>
          </Link>

          {/* MENU DO USUÁRIO */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-green-700"
                >
                  <User />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user.name}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                  Meus Favoritos
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => navigate('/orders')}>
                  Meus Pedidos
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

        </div>
      </div>
    </header>
  );
}