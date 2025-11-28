import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from 'react-intl';
import { useEffect, useState } from "react";
import { WishlistButton } from "@/components/ui/wishlist-button";
import { Link } from "react-router-dom"; 

type ProductCardProps = {
  product: ProductDTO;
};

export function ProductCard({ product }: ProductCardProps) {

  const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL
  const [imagePath, setImagePath] = useState('')

  useEffect(() => {
    if (product.photos && product.photos.length > 0) {
      const fullURL = bucketBaseURL + product.photos[0].path;
      setImagePath(fullURL)
    }
  }, [product])

  return (
    <Card className="w-3xs flex justify-center group relative overflow-hidden transition-all hover:shadow-lg">
      
      {}
      <div className="absolute top-2 right-2 z-20">
          <WishlistButton product={product} className="bg-white/80 backdrop-blur-sm shadow-sm" />
      </div>

      {}
      <Link to={`/product/${product.id}`} className="w-full cursor-pointer">
        
        <CardHeader className="py-0 h-[210px] flex items-center justify-center relative bg-zinc-50"> 
            <img className="object-cover max-h-full transition-transform duration-300 group-hover:scale-105" src={imagePath} alt={product.name} />
        </CardHeader>

        <CardContent className="pt-4">
            <h4 className="font-semibold text-lg line-clamp-2 min-h-[3.5rem] mb-2 group-hover:text-primary transition-colors">
                {product.name}
            </h4>
            
            <div className="w-full flex flex-col gap-1">
                <p className="text-sm text-gray-500 line-through">
                    <IntlProvider locale="pt-BR">
                        <FormattedNumber value={product.price * 1.15} style="currency" currency="BRL" />
                    </IntlProvider>
                </p>
                
                <p className="text-xs text-gray-600">
                    <IntlProvider locale="pt-BR">
                        <FormattedNumber value={product.price } style="currency" currency="BRL" /> em 10x de{" "}
                        <strong className="text-black">
                            <FormattedNumber value={product.price / 10} style="currency" currency="BRL" /> 
                        </strong>
                    </IntlProvider>
                </p>

                <p className="text-green-600 font-bold text-lg mt-1">
                    <span className="text-xs font-normal text-gray-500 mr-1">ou</span>
                    <IntlProvider locale="pt-BR">
                        <FormattedNumber value={product.price } style="currency" currency="BRL" />
                    </IntlProvider>
                    <span className="text-xs font-normal ml-1 block text-green-600">
                        10% de desconto no PIX
                    </span>
                </p>
            </div>
        </CardContent>
      </Link>
    </Card>
  );
}