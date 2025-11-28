import { useParams, Link } from "react-router-dom";
import { useOrder } from "@/cases/order/hooks/use-order";
import { OrderStepper } from "@/cases/order/components/order-stepper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export function OrderDetailPage() {
  const { id } = useParams(); 
  const { data: order, isLoading } = useOrder(id!);

  if (isLoading) return <div className="p-8 text-center animate-pulse">Carregando detalhes...</div>;
  if (!order) return <div className="p-8 text-center text-red-500">Pedido não encontrado.</div>;

  return (
    <IntlProvider locale="pt-BR">
      <div className="container mx-auto p-4 max-w-4xl">
        
        {}
        <Link to="/orders">
            <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
                <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Meus Pedidos
            </Button>
        </Link>

        {/* Cabeçalho */}
        <div className="flex justify-between items-end mb-6">
            <div>
                <h1 className="text-2xl font-bold">Pedido #{order.id?.slice(0, 8)}</h1>
                <p className="text-gray-500">
                    Realizado em {new Date(order.createdAt!).toLocaleDateString('pt-BR')} às {new Date(order.createdAt!).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                </p>
            </div>
        </div>

        {/* BARRA DE STATUS */}
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-lg">Status do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
                <OrderStepper currentStatus={order.status} />
            </CardContent>
        </Card>

        {/* Lista de Itens */}
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Produtos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {order.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                            <div>
                                {}
                                <p className="font-medium">{item.product?.title || `Produto ID ${item.id}`}</p>
                                <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">
                                <FormattedNumber value={item.total} style="currency" currency="BRL" />
                            </p>
                        </div>
                    ))}
                </div>
                
                {/* Resumo Financeiro */}
                <div className="mt-6 pt-6 border-t flex justify-between items-center">
                    <span className="font-bold text-lg">Total do Pedido</span>
                    <span className="font-bold text-xl text-primary">
                        <FormattedNumber value={order.total} style="currency" currency="BRL" />
                    </span>
                </div>
            </CardContent>
        </Card>

      </div>
    </IntlProvider>
  );
}