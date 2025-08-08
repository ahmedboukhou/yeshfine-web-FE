import { useMutation, useQuery } from '@tanstack/react-query';
import type { CurrentUserType } from '../../interfaces';
import { apiClient } from '../../lib/api';
import type { CommonApiResponse } from '../../interfaces/responseTypes';
import { toast } from 'react-toastify';

export function useGetLabProfileQuery() {
	return useQuery({
		queryKey: ['get-doctor-profile'],
		queryFn: (): Promise<{
			data: { lab: CurrentUserType & { is_profile_complete: boolean } };
		}> => apiClient.get(`labs/profile`),
	});
}

export function useLabUpdateProfileMutation() {
	return useMutation<CommonApiResponse & { data: CurrentUserType }, CommonApiResponse, FormData>({
		mutationFn: (values) => apiClient.put(`labs/edit-profile`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}