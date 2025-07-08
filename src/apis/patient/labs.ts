import { useQuery } from '@tanstack/react-query';
import type { LabsResponse, PayloadPaginationType } from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';

export function useGetLabsQuery({ page, limit }: PayloadPaginationType) {
	return useQuery({
		queryKey: ['get-labs'],
		queryFn: (): Promise<LabsResponse> => apiClient.get(`patients/labs`, { page, limit }),
	});
}
