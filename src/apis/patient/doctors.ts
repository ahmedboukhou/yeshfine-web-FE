import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api';
import type { DoctorsResponse } from '../../interfaces/responseTypes';

export function useGetDoctorsQuery() {
	return useQuery({
		queryKey: ['get-doctors'],
		queryFn: (): Promise<DoctorsResponse> => apiClient.get(`patients/doctors-list`),
	});
}
