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
export type PatientUpdateAddressInput = {
	address: string;
	city: string;
	state: string;
	country: string;
	zipCode?: string;
	latitude: string; // Note: as string, although elsewhere it's number
	longitude: string; // same here
};
export function usePatientUpdateAddressMutation() {
	return useMutation<CommonApiResponse, CommonApiResponse, PatientUpdateAddressInput>({
		mutationFn: (values) => apiClient.put(`patients/update-address`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}
