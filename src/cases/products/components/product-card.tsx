import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from 'react-intl';
import { useEffect, useState } from "react";
type ProductCardProps = {
  product: ProductDTO;
};

export function ProductCard({ 
    product 
}: ProductCardProps) {

  const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL
  const [imagePath, setImagePath] = useState('')

  useEffect(() => {
    if ( product.photos &&product.photos.length > 0) {
      const fullURL = bucketBaseURL + product.photos[0].path;
      setImagePath(fullURL)
    }
  }, [product])

  return (
    <Card className="w-3xs flex justify-center">
      <CardHeader className="py-0 h-[210px] flex items-center justify-center"> 
        <img className="cover" src={imagePath} />
      </CardHeader>

      <CardContent>
        <h4>{product.name}</h4>
        <div className="w-full flex flex-col">
            <p>
                <IntlProvider locale="pt-BR">
                    <FormattedNumber value={product.price * 1.15} 
                    style="currency" currency="BRL" />
                </IntlProvider>
            </p>
             <p>
                
                <IntlProvider locale="pt-BR">
                    <FormattedNumber value={product.price } 
                    style="currency" currency="BRL" /> em 10x de
                    <FormattedNumber value={product.price / 10} 
                    style="currency" currency="BRL" /> 
                </IntlProvider>
            
            </p>
             <p>
                ou
                <IntlProvider locale="pt-BR">
                    <FormattedNumber value={product.price } 
                    style="currency" currency="BRL" />
                </IntlProvider>
                no PIX
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
