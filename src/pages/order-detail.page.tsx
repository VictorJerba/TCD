import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useOrder } from "@/cases/order/hooks/use-order";
import { OrderStepper } from "@/cases/order/components/order-stepper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Star } from "lucide-react";

// Imports Novos
import { ReviewDialog } from "@/cases/products/components/review-dialog";
// Se você não tiver o componente Dialog instalado, vai dar erro. 
// Se der erro, me avise que trocamos por um modal simples.

export function OrderDetailPage() {
  const { id } = useParams(); 
  const { data: order, isLoading } = useOrder(id!);
  
  // Estado para controlar qual produto está sendo avaliado
  const [reviewProduct, setReviewProduct] = useState<{name: string, id: string} | null>(null);

  // Função Simula Envio (Mock)
  async function handleSubmitReview(rating: number, comment: string) {
    // AQUI ENTRARIA A CHAMADA PARA O BACKEND:
    // await api.post(`/products/${reviewProduct?.id}/reviews`, { rating, comment });
    
    // Como não temos backend, vamos simular:
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            console.log(`⭐ Avaliação Enviada! Produto: ${reviewProduct?.name}, Nota: ${rating}, Texto: ${comment}`);
            alert("Obrigado! Sua avaliação foi enviada com sucesso.");
            resolve();
        }, 1000);
    });
  }

  if (isLoading) return <div className="p-8 text-center animate-pulse">Carregando detalhes...</div>;
  if (!order) return <div className="p-8 text-center text-red-500">Pedido não encontrado.</div>;

  return (
    <IntlProvider locale="pt-BR">
      <div className="container mx-auto p-4 max-w-4xl">
        
        {/* MODAL DE AVALIAÇÃO */}
        <ReviewDialog 
            isOpen={!!reviewProduct} 
            onClose={() => setReviewProduct(null)}
            productName={reviewProduct?.name || ''}
            onSubmit={handleSubmitReview}
        />

        <Link to="/orders">
            <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
                <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Meus Pedidos
            </Button>
        </Link>

        <div className="flex justify-between items-end mb-6">
            <div>
                <h1 className="text-2xl font-bold">Pedido #{order.id?.slice(0, 8)}</h1>
                <p className="text-gray-500">
                    Realizado em {new Date(order.createdAt!).toLocaleDateString('pt-BR')}
                </p>
            </div>
        </div>

        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-lg">Status do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
                <OrderStepper currentStatus={order.status} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Produtos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {order.items?.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4 last:border-0 last:pb-0 gap-4">
                            
                            <div className="flex-1">
                                <p className="font-medium text-lg">{item.product?.title}</p>
                                <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                            </div>

                            <div className="flex items-center gap-4 justify-between sm:justify-end w-full sm:w-auto">
                                {/* Preço */}
                                <p className="font-semibold text-lg">
                                    <FormattedNumber value={item.total} style="currency" currency="BRL" />
                                </p>

                                {/* BOTÃO AVALIAR */}
                                {/* Só mostramos se o pedido já foi entregue (Opcional, removi a checagem pra você testar agora) */}
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="gap-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 border-yellow-200"
                                    onClick={() => setReviewProduct({ name: item.product.title, id: item.id! })}
                                >
                                    <Star className="w-4 h-4" /> Avaliar
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-6 pt-6 border-t flex justify-between items-center">
                    <span className="font-bold text-lg">Total do Pedido</span>
                    <span className="font-bold text-xl text-green-600">
                        <FormattedNumber value={order.total} style="currency" currency="BRL" />
                    </span>
                </div>
            </CardContent>
        </Card>

      </div>
    </IntlProvider>
  );
}