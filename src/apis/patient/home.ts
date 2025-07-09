import { useQuery } from '@tanstack/react-query';
import type { PatientHomeTopEntitiesResponse } from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';

export function useGetTopRatedStatsQuery() {
	return useQuery({
		queryKey: ['get-patient-top-rated-stats'],
		queryFn: (): Promise<PatientHomeTopEntitiesResponse> =>
			apiClient.get(`dashboard/patient/top-rated-stats`),
	});
}