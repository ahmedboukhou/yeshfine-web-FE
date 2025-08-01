import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { LabAppointmentReport, LabFilterType } from '../../interfaces';
import type {
	CommonApiResponse,
	DoctorReviewsResponse,
	LabDetailResponse,
	LabServiceType,
	LabsResponse,
	LabTestsResponse,
	PayloadPaginationType,
	ResponsePagination,
} from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';
import { useLabTestsStore } from '../../store/labTests';
import type { LabStatusEnum } from '../../interfaces/enums';

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
				...(showOpen && { only_show_open: showOpen }),
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
type LabAppointmentDetailResponse = {
	data: {
		appointment_id: number;
		appointment_date: string; // e.g., "30 Jul"
		report: string | null;
		prescription: string | null;
		services: LabServiceType;
		total_amount: string; // e.g., "500.00"
		is_paid: boolean;
	};
};

export function useGetLabReportDetailQuery({ id }: { id?: string }) {
	return useQuery({
		queryKey: ['get-lab-report-detail', id],
		queryFn: (): Promise<LabAppointmentDetailResponse> =>
			apiClient.get(`patients/labs/appointment/${id}`),
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

type LabAppointmentReportResponse = {
	data: { items: LabAppointmentReport[]; meta: ResponsePagination };
};
export function useGetLabReportsQuery({
	page,
	filter,
	limit,
}: PayloadPaginationType & { filter?: LabStatusEnum | '' }) {
	return useQuery({
		queryKey: ['get-lab-reports', page, filter],
		queryFn: (): Promise<LabAppointmentReportResponse> =>
			apiClient.get(`patients/labs/reports`, { page, limit, ...(filter && { filter }) }),
	});
}

export function useLabBookAppointmentMutation() {
	return useMutation<CommonApiResponse, CommonApiResponse, FormData>({
		mutationFn: (formData) => apiClient.post(`patients/book-lab-appointment`, formData),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}
