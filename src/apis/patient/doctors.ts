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
	specialization?: number[];
	hospital?: 'near me' | 'city';
	location?: string;
	search?: string;
};

export function useGetDoctorsQuery({
	limit,
	page,
	hospital,
	location,
	specialization,
	search,
}: GetDoctorsQueryParams) {
	return useQuery({
		queryKey: ['get-doctors'],
		queryFn: (): Promise<DoctorsResponse> =>
			apiClient.get(`patients/doctors-list`, {
				page,
				limit,
				...(search && { search }),
				...(!!specialization?.length && { specialization }),
				...(hospital && { specialization }),
				...(location && { location }),
			}),
	});
}

export function useGetDoctorSpecialtiesQuery() {
	const { specialties } = useDoctorSpecialtiesStore((state) => state);
	return useQuery({
		queryKey: ['get-specialties'],
		queryFn: (): Promise<DoctorSpecialtiesResponse> => apiClient.get(`doctors/doctor-categories`),
		enabled: !specialties?.length,
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
