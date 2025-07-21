import { useQuery } from '@tanstack/react-query';
import type { DoctorSpecialtiesType, Pharmacy, PharmacyFilterType } from '../../interfaces';
import type {
	CommonApiResponse,
	PayloadPaginationType,
	ResponsePagination,
} from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';
import { useMedicineCategoriesStore } from '../../store/pharmacies';

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
		enabled: !!!medicineCategories.length,
	});
}
