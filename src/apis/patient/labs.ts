import { useQuery } from '@tanstack/react-query';
import type {
	AppointmentSlotResponse,
	DoctorReviewsResponse,
	LabDetailResponse,
	LabsResponse,
	LabTestsResponse,
	PayloadPaginationType,
} from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';
import { useLabTestsStore } from '../../store/labTests';
import type { LabFilterType } from '../../interfaces';

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

export function useGetLabTestsQuery() {
	const { labTestsData } = useLabTestsStore((state) => state);
	return useQuery({
		queryKey: ['get-lab-tests'],
		queryFn: (): Promise<LabTestsResponse> => apiClient.get(`labs/lab-tests`),
		enabled: !labTestsData?.length,
	});
}
