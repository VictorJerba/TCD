import { CategoryMenu } from "@/cases/categories/components/category-menu";
import { ProductCard } from "@/cases/products/components/product-card";
import { useProducts } from "@/cases/products/hooks/use-product";
import { Link, useSearchParams } from "react-router-dom";

export function ProductListPage() {

  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get('categoryId') || undefined;

  const { data: products, isLoading } = useProducts();

  return (
    <>
      <CategoryMenu />
      <section className="flex flex-col">
        <div className="flex mt-8 gap-8">
          {products && products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
              >
                <ProductCard product={product} />
              </Link>
            ))}
        </div>
        
      </section>
    </>
  );
}
