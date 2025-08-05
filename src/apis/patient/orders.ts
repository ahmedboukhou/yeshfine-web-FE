import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api';
import type { PayloadPaginationType, ResponsePagination } from '../../interfaces/responseTypes';

type OrdersQueryParams = PayloadPaginationType & {
	search?: string;
	order_status: 'pending' | 'completed';
	payment_status: 'paid' | 'not_paid' | '';
};
type OrdersResponse = {
	data: { orders: any; meta: ResponsePagination };
};
export function useGetOrdersQuery({
	page,
	limit,
	order_status,
	payment_status,
	search,
}: OrdersQueryParams) {
	return useQuery({
		queryKey: ['get-orders'],
		queryFn: (): Promise<OrdersResponse> =>
			apiClient.get(`patients/my-orders`, {
				limit,
				order_status,
				page,
				...(search && { search }),
				...(payment_status && { payment_status }),
			}),
	});
}
