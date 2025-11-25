import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../services/product.service";
import type { ProductDTO } from "../dtos/product.dto";

export function useProducts (categoryId?: string){
    return useQuery<ProductDTO[]>({
        queryKey: ['products', categoryId ?? 'all'],
        queryFn: () => ProductService.list(categoryId),
    });
}

export function useProduct(id: string){
    return useQuery<ProductDTO>({
        queryKey: ['product', id],
        queryFn: () => ProductService.getById(id),
        enabled: !!id,
    });
}