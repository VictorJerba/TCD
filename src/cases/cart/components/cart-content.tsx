import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "../hooks/use-cart";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { MapPin, Trash2, Loader2 } from "lucide-react";
import { QuantityInput } from "@/components/ui/quantity-imput";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useNavigate } from "react-router-dom";
import type { CustomerDTO } from "@/cases/customers/dtos/customer.dto";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import type { OrderDTO, OrderItemDTO } from "@/cases/order/dtos/order.dto";
import { useCreateOrder } from "@/cases/order/hooks/use-order";

export function CartContent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { cart, removeProductCart, clearCart } = useCart();
  const createOrder = useCreateOrder();

  const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL;

  
  const totalCartValue = cart.items.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity);
  }, 0);
  

  function handleCreateOrder() {
    if (!user) {
      navigate('/signin?redirect=/cart');
      return;
    } 
    
    
    const customer: CustomerDTO = {
        id: user.id,
        name: user.name,
        email: user.email 
    };

    
    const orderItems: OrderItemDTO[] = cart.items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        value: item.product.price,
        total: item.quantity * item.product.price, 
        status: "NEW",
        createdAt: new Date()
    }));

  
    const order: OrderDTO = {
        customer: customer,
        status: 'NEW',
        total: totalCartValue,
        items: orderItems,
        createdAt: new Date()
    }

    // Chamar a API
    createOrder.mutate(order, {
        onSuccess: () => {
            clearCart(); 
            navigate('/orders'); 
        },
        onError: (error) => {
            console.error("Erro ao criar pedido:", error);
            alert("Erro ao finalizar compra. Tente novamente.");
        }
    });
  }

  return (
    <IntlProvider locale="pt-BR">
      <div className="flex gap-4 flex-col lg:flex-row"> {/* Responsivo */}
        
        {/* LISTA DE PRODUTOS */}
        <Card className="w-full mt-8 flex-1">
          <CardContent>
            <ItemGroup className="gap-4">
              {cart.items.map((item, index) => (
                <Item key={index} variant="muted" role="listitem" asChild>
                  <div>
                    <ItemMedia variant="image">
                      {item.product.photos?.length > 0 && (
                        <img
                          src={`${bucketBaseURL}${item.product.photos[0].path}`}
                          className="w-12 h-12 object-cover rounded-md" // Aumentei um pouco a foto
                        />
                      )}
                    </ItemMedia>

                    <ItemContent>
                      <ItemTitle className="line-clamp-1 text-base">
                        {item.product.name}
                      </ItemTitle>
                      <ItemDescription>
                        {item.product.brand?.name}
                      </ItemDescription>
                    </ItemContent>

                    <ItemContent className="flex-none text-right">
                      <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
                        <QuantityInput initialQuantity={item.quantity} />

                        <div className="flex flex-col min-w-[100px]">
                          <p className="font-semibold flex justify-end gap-1.5">
                            <FormattedNumber
                              value={(item.product.price * item.quantity) * 0.9}
                              style="currency"
                              currency="BRL"
                            />
                            <span className="text-xs font-normal text-gray-500 self-center">Pix</span>
                          </p>

                          <p className="font-light text-sm text-gray-500 flex justify-end gap-1.5">
                            <FormattedNumber
                              value={item.product.price * item.quantity}
                              style="currency"
                              currency="BRL"
                            />
                          </p>
                        </div>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeProductCart(item.product.id!)}
                            >
                              <Trash2 className="text-red-600 h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remover produto</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </ItemContent>
                  </div>
                </Item>
              ))}
            </ItemGroup>
          </CardContent>
        </Card>

        {/* RESUMO DO PEDIDO (LATERAL) */}
        <div className="flex flex-col w-full lg:w-[350px] mt-8 gap-4 h-fit">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Frete para CEP</CardTitle>
            </CardHeader>
            <CardContent>
              <InputGroup>
                <InputGroupInput placeholder="CEP" />
                <InputGroupAddon>
                  <MapPin className="text-green-600 h-4 w-4" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-mr-1 hover:bg-transparent hover:text-green-700"
                  >
                    Calcular
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total do Pedido:</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal:</span>
                  <FormattedNumber value={totalCartValue} style="currency" currency="BRL" />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                  <span>Frete:</span>
                  <span>Grátis</span>
              </div>
              <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-lg">Total:</span>
                    <div className="text-right">
                        <p className="font-bold text-xl text-green-600">
                            <FormattedNumber value={totalCartValue * 0.9} style="currency" currency="BRL" />
                        </p>
                        <p className="text-xs text-gray-500">
                            ou <FormattedNumber value={totalCartValue} style="currency" currency="BRL" /> no cartão
                        </p>
                    </div>
                  </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 text-lg" 
                onClick={handleCreateOrder}
                disabled={createOrder.isPending}
              >
                {createOrder.isPending ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processando...
                    </>
                ) : (
                    "Finalizar Compra"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </IntlProvider>
  );
}