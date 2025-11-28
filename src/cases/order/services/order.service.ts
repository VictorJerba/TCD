import { api } from "../../../lib/axios";
import type { OrderDTO } from "../dtos/order.dto";

const _ENDPOINT = '/orders';

export const OrderService = {

    async list(): Promise<OrderDTO[]> {
        try {
            const result = await api.get(_ENDPOINT);
            
            let dadosParaMapear: any[] = [];
            
            if (Array.isArray(result.data)) {
                dadosParaMapear = result.data;
            } else if (result.data && Array.isArray(result.data.items)) {
                dadosParaMapear = result.data.items;
            } else if (result.data && Array.isArray(result.data.data)) {
                dadosParaMapear = result.data.data;
            } else {
                return []; 
            }

            return dadosParaMapear.map((item: any) => ({
                id: item.id || item._id,
                createdAt: item.createdAt || item.created_at || item.data_pedido || new Date(),
                total: Number(item.total || item.total_amount || item.amount || item.valor || 0),
                status: item.status || 'PENDING',
                customer: typeof item.customer === 'object' ? item.customer : { 
                    name: item.customer_name || 'Cliente' 
                },
                items: item.items || []
            })) as OrderDTO[];

        } catch (error) {
            console.error(error);
            return [];
        }
    },

    async getById(id: string): Promise<OrderDTO> {
        try {
            const result = await api.get(`${_ENDPOINT}/${id}`);
            const item = result.data;

            return {
                id: item.id || item._id,
                createdAt: item.createdAt || item.created_at || item.data_pedido || new Date(),
                total: Number(item.total || item.total_amount || item.amount || item.valor || 0),
                status: item.status || 'PENDING',
                customer: typeof item.customer === 'object' ? item.customer : { 
                    name: item.customer_name || item.client_name || 'Cliente' 
                },
                items: (item.items || []).map((prod: any) => {
                    const rawProduct = prod.product || {}; 
                    const nomeDoProduto = rawProduct.name || rawProduct.title || rawProduct.nome || prod.product_name || prod.name || 'Produto sem Nome';
                    
                    const precoUnitario = Number(prod.price || prod.value || prod.unit_price || prod.valor || 0);
                    const quantidade = Number(prod.quantity || prod.qtd || 1);
                    const totalCalculado = (prod.total && Number(prod.total) > 0) ? Number(prod.total) : (precoUnitario * quantidade);

                    return {
                        id: prod.id,
                        product: { 
                            title: nomeDoProduto 
                        },
                        quantity: quantidade,
                        value: precoUnitario,
                        total: totalCalculado
                    };
                })
            } as OrderDTO;

        } catch (error) {
            throw error;
        }
    },

    async create (order: OrderDTO): Promise<OrderDTO> {
        const result = await api.post(_ENDPOINT, order);
        return result.data;
    }
};