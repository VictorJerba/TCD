import { ProductDetail } from "@/cases/products/components/product-detail";
import { useProduct } from "@/cases/products/hooks/use-product";

import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { useParams } from "react-router-dom";

export function ProductDetailPage() {
    const { id } = useParams<{id: string}>();
    const {data: product, isLoading} = useProduct(id!);

   
    if (!product) return null; 

  return (
    <div className="p-4">
        <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                {}
                <BreadcrumbLink href={`/?categoryId=${product?.category.id}`}>
                {product?.category.name}
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>
                        {product?.name}
                </BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>

        <div className="py-8">
            {isLoading ? (
                <h1>Carregando</h1>
            ) : (
                <ProductDetail product={product!} />
            )}
            
        </div>

    </div>
  );
}