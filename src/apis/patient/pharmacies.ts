import { useQuery } from '@tanstack/react-query';
import type {
	DoctorSpecialtiesType,
	MedicineDetail,
	MedicineFullDetail,
	Pharmacy,
	PharmacyFilterType,
	PharmacyInfo,
	PopularProduct,
} from '../../interfaces';
import type {
	CommonApiResponse,
	PayloadPaginationType,
	ResponsePagination,
} from '../../interfaces/responseTypes';

import type { MedicinesByCategory } from '../../interfaces';
import { apiClient } from '../../lib/api';
import { useMedicineCategoriesStore } from '../../store/medicineCategories';

type GetPharmaciesQueryParams = PayloadPaginationType &
	PharmacyFilterType & {
		search: string;
		category: string;
	};
type PharmaciesResponse = CommonApiResponse & {
	data: { items: Pharmacy[]; meta: ResponsePagination };
};

export function useGetPharmaciesQuery({
	page,
	limit,
	showOpen,
	location,
	search,
	category,
}: GetPharmaciesQueryParams) {
	return useQuery({
		queryKey: ['get-pharmacies'],
		queryFn: (): Promise<PharmaciesResponse> =>
			apiClient.get(`patients/pharmacies`, {
				page,
				limit,
				only_show_open: showOpen,
				...(location && { location }),
				...(category && { category }),
				...(search && { search }),
			}),
	});
}

export function useGetMedicinesCategoriesQuery() {
	const { medicineCategories } = useMedicineCategoriesStore((state) => state);

	return useQuery({
		queryKey: ['get-medicine-categories'],
		queryFn: (): Promise<{
			data: { medicineCategories: DoctorSpecialtiesType[] };
		}> => apiClient.get(`pharmacy/medicine/categories`),
		enabled: !medicineCategories.length,
	});
}

type PharmacyDetailsResponse = {
	data: { pharmacy: PharmacyInfo; medicinesByCategory: MedicinesByCategory };
};
export function useGetPharmacyDetailQuery({ id }: { id?: string }) {
	return useQuery({
		queryKey: ['get-pharmacy-detail', id],
		queryFn: (): Promise<PharmacyDetailsResponse> => apiClient.get(`patients/pharmacy/${id}`),
	});
}

type PharmacyMedicinesDetailResponse = {
	data: { medicines: MedicineDetail[]; meta: ResponsePagination };
};
export function useGetPharmacyMedicinesQuery({
	id,
	search,
	category,
	page,
	limit,
}: {
	id?: string;
	search: string;
	category: string;
	page: number;
	limit: number;
}) {
	return useQuery({
		queryKey: ['get-medicines-detail', id, search, page],
		queryFn: (): Promise<PharmacyMedicinesDetailResponse> =>
			apiClient.get(`patients/pharmacy/${id}/medicines`, {
				...(search && { search }),
				...(category && { category }),
				page,
				limit,
			}),
	});
}

type MedicineDetailResponse = {
	data: {
		medicine: MedicineFullDetail;
		popularProducts: PopularProduct[];
	};
};
export function useGetPharmacyMedicineDetailQuery({ id }: { id: string }) {
	return useQuery({
		queryKey: ['get-pharmacy-medicine-detail', id],
		queryFn: (): Promise<MedicineDetailResponse> => apiClient.get(`patients/medicine/${id}`),
		enabled: !!id,
	});
}
