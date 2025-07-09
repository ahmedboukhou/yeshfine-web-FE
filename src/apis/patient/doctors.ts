import { useQuery } from '@tanstack/react-query';
import type {
	DoctorDetailResponse,
	DoctorReviewsResponse,
	DoctorSpecialtiesResponse,
	DoctorsResponse,
	PayloadPaginationType,
} from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';
import { useDoctorSpecialtiesStore } from '../../store/doctorSpecialties';

type GetDoctorsQueryParams = PayloadPaginationType & {
	specialization_filter?: number[];
	hospital_filter?: 'near me' | 'city';
	location_filter?: string;
	search?: string;
};

export function useGetDoctorsQuery({
	limit,
	page,
	hospital_filter,
	location_filter,
	specialization_filter,
	search,
}: GetDoctorsQueryParams) {
	return useQuery({
		queryKey: ['get-doctors', page],
		queryFn: (): Promise<DoctorsResponse> =>
			apiClient.get(`patients/doctors-list`, {
				page,
				limit,
				...(search && { search }),
				...(!!specialization_filter?.length && { specialization_filter }),
				...(hospital_filter && { specialization_filter }),
				...(location_filter && { location_filter }),
			}),
	});
}

export function useGetDoctorSpecialtiesQuery() {
	const { specialties } = useDoctorSpecialtiesStore((state) => state);
	return useQuery({
		queryKey: ['get-specialties'],
		queryFn: (): Promise<DoctorSpecialtiesResponse> => apiClient.get(`doctors/doctor-categories`),
		enabled: !!!specialties?.length,
	});
}

export function useGetDoctorDetailQuery({ id }: { id?: string }) {
	return useQuery({
		queryKey: ['get-doctor-detail', id],
		queryFn: (): Promise<DoctorDetailResponse> => apiClient.get(`patients/doctors/${id}`),
	});
}

export function useGetDoctorReviewsQuery({
	id,
	limit,
	page,
}: { id?: string } & PayloadPaginationType) {
	return useQuery({
		queryKey: ['get-doctor-reviews', id, page],
		queryFn: (): Promise<DoctorReviewsResponse> =>
			apiClient.get(`patients/doctors/${id}/reviews`, { page, limit }),
	});
}
