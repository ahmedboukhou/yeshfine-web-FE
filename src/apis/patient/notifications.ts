import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { NotificationType } from '../../interfaces';
import type {
	CommonApiResponse,
	PayloadPaginationType,
	ResponsePagination,
} from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';

type PatientNotificationsResponse = {
	data: { notifications: NotificationType[]; meta: ResponsePagination };
};
export function useGetPatientNotificationsQuery({
	limit,
	page,
	unread_only = false,
}: PayloadPaginationType & { unread_only?: boolean }) {
	return useQuery({
		queryKey: ['get-lab-detail', page],
		queryFn: (): Promise<PatientNotificationsResponse> =>
			apiClient.get(`notifications`, { page, limit, ...(unread_only && { unread_only }) }),
	});
}

export function useMarkAsReadNotificationMutation() {
	return useMutation<CommonApiResponse, CommonApiResponse, { id?: string }>({
		mutationFn: (values) => apiClient.patch(`notifications/${values.id}/read`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}

export function useMarkAllAsReadNotificationMutation() {
	return useMutation<CommonApiResponse, CommonApiResponse>({
		mutationFn: () => apiClient.patch(`notifications/read-all`),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
		onSuccess: ({ message }) => toast.success(message || 'All notifications marked as read'),
	});
}
