import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductService } from "@/cases/products/services/product.service";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { ProductCard } from "@/cases/products/components/product-card";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, Check } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProductListPage() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  
  const mainCategories = ["Todos", "CDs", "Vinil", "Camisetas", "Adidas", "Livros"];
  const moreCategories = ["Colecionáveis", "Posters", "Pão (The only one)"]; 

  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => {
    ProductService.list().then(setProducts);
  }, []);

  const filteredProducts = products.filter(p => {
    
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    
    
    let matchesCategory = true;

    if (activeCategory !== "Todos") {
        
        
        const getSearchTerm = (category: string) => {
            switch (category) {
                case "Colecionáveis": return "funko"; 
                case "Pão (The only one)": return "pao";
                case "CDs": return "cd";
                case "Camisetas": return "camiseta";
                case "Vinil": return "vinil"; 
                case "Adidas": return "adidas";
                case "Livros": return "livro"; 
                case "Posters": return "poster";
                default: return category.toLowerCase().replace(/s$/, ""); 
            }
        };

        const term = getSearchTerm(activeCategory);
        
        matchesCategory = 
            p.name.toLowerCase().includes(term) || 
           
            (p.category && p.category.toString().toLowerCase().includes(term));
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      
      <div className="mb-10 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Nossos Produtos
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              A coleção oficial da banda Oasis.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {}
            {mainCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-black text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}

            {}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    moreCategories.includes(activeCategory)
                      ? "bg-black text-white shadow-md" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {moreCategories.includes(activeCategory) ? activeCategory : "Mais"}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end">
                {moreCategories.map((cat) => (
                  <DropdownMenuItem 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className="flex justify-between items-center cursor-pointer min-w-[120px]"
                  >
                    {cat}
                    {activeCategory === cat && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>

        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Buscar produto (ex: Definitely Maybe)..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchParams({ q: e.target.value });
            }}
            className="pl-12 h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500">
            <p className="text-lg">Nenhum produto encontrado para "{activeCategory}".</p>
            <button 
                onClick={() => { setActiveCategory("Todos"); setSearch(""); }}
                className="mt-2 text-blue-600 underline"
            >
                Ver todos os produtos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}