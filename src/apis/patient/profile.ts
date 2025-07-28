import { useMutation } from '@tanstack/react-query';
import type { CommonApiResponse } from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';
import { toast } from 'react-toastify';

export function usePatientUpdateProfileMutation() {
	return useMutation<CommonApiResponse, CommonApiResponse, FormData>({
		mutationFn: (values) => apiClient.put(`patients/update-profile`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}
