import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api';
import type { PayloadPaginationType, ResponsePagination } from '../../interfaces/responseTypes';

type OrdersQueryParams = PayloadPaginationType & {
	search?: string;
	order_status: string;
	payment_status: 'paid' | 'not_paid' | '';
};
type OrdersResponse = {
	data: {
		orders: {
			order_id: number;
			distance: number;
			is_open: boolean;
			time_range: string; // e.g. "08:00 - 20:00"
			pharmacy_image: string;
			pharmacy_name: string;
			pharmacy_address: string;
			order_date: string; // e.g. "1 Aug"
			total_amount: number;
			payment_status: 'paid' | 'not_paid';
			order_status: 'pending' | 'completed';
		}[];
		meta: ResponsePagination;
	};
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
