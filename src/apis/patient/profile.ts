import { useMutation } from '@tanstack/react-query';
import type { CommonApiResponse } from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';
import { toast } from 'react-toastify';
import type { CurrentUserType } from '../../interfaces';

export function usePatientUpdateProfileMutation() {
	return useMutation<CommonApiResponse & { data: CurrentUserType }, CommonApiResponse, FormData>({
		mutationFn: (values) => apiClient.put(`patients/update-profile`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}
export type PatientUpdateAddressInput = {
	address?: string;
	city: string;
	state: string;
	country: string;
	zipCode?: string;
	latitude?: number; // Note: as string, although elsewhere it's number
	longitude?: number; // same here
};
