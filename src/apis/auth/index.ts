import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../lib/api';
import type { LoginInput, SignupInput } from '../../interfaces';
import { toast } from 'react-toastify';

export function useLoginMutation() {
	return useMutation({
		mutationFn: (values: LoginInput) => apiClient.post(`auth/login`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}
export function useSignupMutation() {
	return useMutation({
		mutationFn: (values: SignupInput) => apiClient.post(`auth/signup`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}
