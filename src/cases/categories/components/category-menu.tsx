import { Button } from "@/components/ui/button";
import { useCategories } from "../hooks/use-category";
import { useEffect, useState } from "react";
import type { CategoryDTO } from "../dtos/category.dto";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export function CategoryMenu() {
  const { data: categories, isLoading } = useCategories();

  // Controla o agrupamento para exibir categorias
  const [visibleItems, setVisibleItems] = useState<CategoryDTO[]>([]);
  const [hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId") ?? undefined;

  // *** LINHA DO ERRO "const" REMOVIDA AQUI ***

  useEffect(() => {
    if (categories) {
      setVisibleItems(categories.slice(0, 5));
      setHiddenItems(categories.slice(5));
    }
  }, [categories]);

  function handleSelect(id: string | null) { // Alterei para aceitar null para o botão "Todos"
    const newParams = new URLSearchParams(searchParams);

    if (id) {
      newParams.set("categoryId", id);
    } else {
      newParams.delete("categoryId");
    }
    setSearchParams(newParams);
  }

  return (
    <nav className="w-full py-4 flex items-center justify-between">
      <div className="flex flex-col">
        <h5 className="font-bold text-2xl text-gray-950">Nossos Produtos</h5>
        <p className="text-sm text-gray-500"> Itens da Banda Oasis </p>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button 
            variant={!categoryId ? "default" : "ghost"} // Destaca se estiver selecionado
            onClick={() => handleSelect(null)} // Adicionado onClick
        >
          Todos
        </Button>

        {visibleItems.map((category) => (
          <Button
            key={category.id}
            variant={categoryId === category.id ? "default" : "ghost"} // Destaca se estiver selecionado
            onClick={() => handleSelect(category.id)} // Adicionado onClick
          >
            {category.name}
          </Button>
        ))}

        {hiddenItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Mais
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {hiddenItems.map((category) => (
                <DropdownMenuItem 
                    key={category.id}
                    onSelect={() => handleSelect(category.id)} 
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}