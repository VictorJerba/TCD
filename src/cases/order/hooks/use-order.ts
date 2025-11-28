import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "../services/order.service";
import type { OrderDTO } from "../dtos/order.dto";


export function useOrders() {
    return useQuery<OrderDTO[]>({
        queryKey: ['orders'],
        queryFn: OrderService.list
    });
}


export function useOrder(id: string) {
    return useQuery<OrderDTO>({
        queryKey: ['order', id],
        queryFn: () => OrderService.getById(id),
        enabled: !!id,
    });
}

export function useCreateOrder(){
    const queryClient = useQueryClient();

    return useMutation<OrderDTO, Error, Omit<OrderDTO, 'id'>>({
        mutationFn: (order: Omit<OrderDTO, 'id'>) => OrderService.create(order),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']});
        }, 
    });
}