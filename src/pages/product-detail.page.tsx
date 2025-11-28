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
    

    const {data: productRaw, isLoading} = useProduct(id!);

    
    const product = productRaw ? {
        ...productRaw,
        brand: {
            ...productRaw.brand, 
            // LÓGICA: Se tiver "pao" no nome, é Padaria. Se não, é Oasis.
            name: (productRaw.name.toLowerCase().includes('pao') || productRaw.name.toLowerCase().includes('pão'))
                ? "Padaria Wonderwall"
                : "Oasis"
        }
    } : null;
    // ---------------------------

    if (isLoading) {
        return <div className="p-8 text-center animate-pulse">Carregando produto...</div>;
    }

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
                <BreadcrumbLink href={`/?q=${product?.category?.name || ''}`}>
                {product?.category?.name || 'Produto'}
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
            {}
            <ProductDetail product={product} />
        </div>

    </div>
  );
}