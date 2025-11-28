import { Card, CardContent } from "@/components/ui/card"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"
import { FormattedNumber, IntlProvider } from "react-intl"
import { OrderStatusBadge } from "./data-table-badge";
import type { OrderDTO } from "../dtos/order.dto";
import { Link } from "react-router-dom"; 

type OrderContentProps = {
  orders: OrderDTO[];
}

export function OrderContent({ orders }: OrderContentProps) {
  
  if (!orders || orders.length === 0) {
     return <div className="p-8 text-center text-gray-500">Você ainda não tem pedidos.</div>
  }

  return (
    <IntlProvider locale="pt-BR">
      <div className="flex gap-4">
        <Card className="w-full mt-8">
          <CardContent>
            <ItemGroup className="gap-4">
              {orders.map((item, index) => (
                // MUDANÇA AQUI: Adicionamos o Link em volta do Item
                <Link key={item.id || index} to={`/orders/${item.id}`} className="block hover:bg-slate-50 transition-colors rounded-lg">
                    
                    <Item variant="muted" role="listitem" asChild>
                    <div>
                        <ItemContent>
                        <ItemTitle className="line-clamp-1">
                            {`${new Date(item.createdAt || Date.now()).toLocaleDateString("pt-BR")} - ${item.customer?.name || 'Cliente'}`}
                        </ItemTitle>

                        <ItemDescription>
                            Pedido #{item.id?.slice(0, 8)}... • {item.items?.length || 0} item(s)
                            <span className="ml-2 text-blue-600 text-xs font-semibold underline">Ver detalhes</span>
                        </ItemDescription>
                        </ItemContent>

                        <ItemContent className="flex-none text-right">
                        <div className="flex flex-row gap-4 items-center">
                            <div>
                            <OrderStatusBadge status={item.status} />
                            </div>

                            <div className="flex flex-col">
                            <p className="font-semibold flex justify-end gap-1.5">
                                <FormattedNumber
                                value={item.total || 0}
                                style="currency"
                                currency="BRL"
                                />
                            </p>
                            </div>

                        </div>
                        </ItemContent>
                    </div>
                    </Item>

                </Link>
              ))}
            </ItemGroup>
          </CardContent>
        </Card>
      </div>
    </IntlProvider>
  )
}