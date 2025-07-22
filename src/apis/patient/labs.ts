import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { LabFilterType } from '../../interfaces';
import type {
	CommonApiResponse,
	DoctorReviewsResponse,
	LabDetailResponse,
	LabsResponse,
	LabTestsResponse,
	PayloadPaginationType,
} from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';
import { useLabTestsStore } from '../../store/labTests';

type GetLabsQueryParams = PayloadPaginationType &
	Omit<LabFilterType, 'labTestList'> & {
		search: string;
		labTestList?: number[];
	};

export function useGetLabsQuery({
	page,
	limit,
	showOpen,
	labTestList,
	location,
	resultTime,
	search,
}: GetLabsQueryParams) {
	return useQuery({
		queryKey: ['get-labs'],
		queryFn: (): Promise<LabsResponse> =>
			apiClient.get(`patients/labs`, {
				page,
				limit,
				only_show_open: showOpen,
				...(labTestList?.length && { test: labTestList }),
				...(location && { location }),
				...(resultTime && { result_time: resultTime }),
				...(search && { search }),
			}),
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

export function useGetLabTestsQuery() {
	const { labTestsData } = useLabTestsStore((state) => state);
	return useQuery({
		queryKey: ['get-lab-tests'],
		queryFn: (): Promise<LabTestsResponse> => apiClient.get(`labs/lab-tests`),
		enabled: !labTestsData?.length,
	});
}

export function useLabBookAppointmentMutation() {
	return useMutation<CommonApiResponse, CommonApiResponse, FormData>({
		mutationFn: (formData) => apiClient.post(`patients/book-lab-appointment`, formData),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}
