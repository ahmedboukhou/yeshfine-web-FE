import { useQuery } from '@tanstack/react-query';
import type {
	AppointmentSlotResponse,
	DoctorReviewsResponse,
	LabDetailResponse,
	LabsResponse,
	PayloadPaginationType,
} from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';

export function useGetLabsQuery({ page, limit }: PayloadPaginationType) {
	return useQuery({
		queryKey: ['get-labs', page],
		queryFn: (): Promise<LabsResponse> => apiClient.get(`patients/labs`, { page, limit }),
	});
}

export function useGetLabDetailQuery({ id }: { id?: string }) {
	return useQuery({
		queryKey: ['get-lab-detail', id],
		queryFn: (): Promise<LabDetailResponse> => apiClient.get(`patients/labs/${id}`),
	});
}

export function useGetLabReviewsQuery({
	id,
	limit,
	page,
}: { id?: string } & PayloadPaginationType) {
	return useQuery({
		queryKey: ['get-lab-reviews', id, page],
		queryFn: (): Promise<DoctorReviewsResponse> =>
			apiClient.get(`patients/labs/${id}/reviews`, { page, limit }),
	});
}

export function useGetLabAppointmentSlotQuery({
	id,
	appointment_date,
}: {
	id?: string;
	appointment_date?: string;
}) {
	return useQuery({
		queryKey: ['get-appointment-slots', id, appointment_date],
		queryFn: (): Promise<AppointmentSlotResponse> =>
			apiClient.get(`patients/lab-available-slots`, { lab_id: id, appointment_date }),
	});
}
