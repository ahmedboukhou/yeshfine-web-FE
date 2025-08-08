import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api';
import type { PayloadPaginationType, ResponsePagination } from '../../interfaces/responseTypes';
import type { OrderStatusEnum, PaymentStatusEnum } from '../../interfaces/enums';

type OrdersQueryParams = PayloadPaginationType & {
	search?: string;
	order_status: string;
	payment_status: 'paid' | 'not_paid' | '';
};
type OrdersResponse = {
	data: {
		orders: {
			order_id: number;
			distance: number | null;
			is_open: boolean;
			time_range: string;
			pharmacy_image: string;
			pharmacy_name: string;
			pharmacy_address: string;
			order_date: string;
			total_amount: number;
			payment_status: PaymentStatusEnum;
			order_status: OrderStatusEnum;
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
