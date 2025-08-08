import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { CurrentUserType } from '../../interfaces';
import type { CommonApiResponse } from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';

export function useGetDoctorProfileQuery() {
	return useQuery({
		queryKey: ['get-doctor-profile'],
		queryFn: (): Promise<{
			data: { doctor: CurrentUserType & { is_profile_complete: boolean } };
		}> => apiClient.get(`doctors/profile`),
	});
}
export function useDoctorUpdateProfileMutation() {
	return useMutation<CommonApiResponse & { data: CurrentUserType }, CommonApiResponse, FormData>({
		mutationFn: (values) => apiClient.put(`doctors/edit-profile`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}
