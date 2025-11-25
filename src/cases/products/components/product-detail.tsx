import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { FormattedNumber } from "react-intl";
import IntlProvider from "react-intl/src/components/provider";

type ProductDetailProps = {
  product: ProductDTO;
};

export function ProductDetail({ product }: ProductDetailProps) {
  const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL;
  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);

  const photos = product.photos || [];
  const mainPhoto = photos[selectedPhoto];
  const mainImagePhoto = mainPhoto
    ? `${bucketBaseURL}${mainPhoto.path}`
    : `https://placehold.co/300x300?text=Sem+Imagem&font-roboto`;

    function handleAddProductCart() {

    }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex mt-8 gap-16">
        <div className="min-w-md">
          <div className="w-full max-w-md h-[400px] flex items-center justify-center rouded shadow overflow-hidden">
            <img
              src={mainImagePhoto}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {photos.length > 1 && (
          <ul className="mt-4 max-w-md w-full overflow-x-auto flex gap-2 pb-2">
            {photos.map((photo, index) => (
              <li key={photo.id}>
                <Button
                  onClick={() => setSelectedPhoto(index)}
                  variant="ghost"
                  className={cn(
                    "w-20 h-20 rounded overflow-hidden border hover:border-green-600 hover:cursor-pointer",
                    index === selectedPhoto
                      ? "border-green-600"
                      : "border-gray-300"
                  )}
                >
                  <img
                    src={`${bucketBaseURL}${photo.path}`}
                    className={cn("w-full h-full rounded object-contain")}
                  />
                </Button>
              </li>
            ))}
          </ul>
        )}
        </div>

        <div className="w-fit">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <div>
                <span className="p-1 rounded-sm text-sm text-white bg-green-600">
                    {product.brand?.name}
                </span>
            </div>
            <p className="mt-4">
                {product.description}
            </p>
            <div className="flex flex-col  mt-4 gap-2">
            <p className="text-gray-700 line-through mb-1">
                <IntlProvider locale="pt-BR">
                    <FormattedNumber value={product.price * 1.15} 
                    style="currency" currency="BRL" />
                    </IntlProvider>
            </p>
            <p className="font-semibold text-green-600">
                <span className="bg-green-100 rounded p-2">
                {`${Math.floor((1 - (product.price * 0.9) / (product.price * 1.15)) * 100)} % OFF no PIX`}
                </span>
            </p>
             <p className="text-leg">
                            <span className="text-3xl font-semibold mr-2">
                            <IntlProvider locale="pt-BR">
                                <FormattedNumber value={product.price } 
                                style="currency" currency="BRL" />
                            </IntlProvider>
                            </span>
                            no PIX
                        </p>
                        <p className="font-light mb-4">
                            <IntlProvider locale="pt-BR">
                                               ou  <FormattedNumber value={product.price } 
                                                style="currency" currency="BRL" /> em 10x de
                                                <FormattedNumber value={product.price / 10} 
                                                style="currency" currency="BRL" /> sem juros
                                            </IntlProvider>
                        </p>
            </div>
            <div className="flex mt-8"> 
                <Button
                className="bg-green-600 hover:bg-green-700 text-white w-full"
                size="lg"
                onClick={handleAddProductCart}>
                    <ShoppingCart />
                    Adicionar ao Carrinho
                </Button>
                 </div>
        </div>
      </div>
    </div>
  );
}
