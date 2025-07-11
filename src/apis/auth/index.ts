import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type {
	ForgotPasswordInput,
	LoginInput,
	OTPInput,
	ResetPasswordInput,
	SignupInput,
} from '../../interfaces/formInputTypes';
import type {
	CommonApiResponse,
	ForgotPasswordResponse,
	LoginResponse,
	VerifyOtpResponse,
} from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';

export function useLoginMutation() {
	return useMutation<LoginResponse, CommonApiResponse, LoginInput>({
		mutationFn: (values) => apiClient.post(`auth/login`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}
export function useSignupMutation() {
	return useMutation<LoginResponse, CommonApiResponse, Omit<SignupInput, 'confirm_password'> & {
  language: string;
}>({
		mutationFn: (values) => apiClient.post(`auth/signup`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}

export function useVerifyOTPMutation() {
	return useMutation<VerifyOtpResponse, CommonApiResponse, OTPInput>({
		mutationFn: (values) => apiClient.post(`auth/verify-otp`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}
export function useResendOTPQuery({ phone }: { phone: string }) {
	return useQuery({
		queryKey: ['resend-otp', phone],
		queryFn: () => apiClient.get(`auth/resend-otp`, { phone }),
		enabled: false,
	});
}

export function useForgotPasswordMutation() {
	return useMutation<ForgotPasswordResponse, CommonApiResponse, ForgotPasswordInput>({
		mutationFn: (values) => apiClient.post(`auth/forgot-password`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}

export function useResetPasswordMutation() {
	return useMutation<ForgotPasswordResponse, CommonApiResponse, ResetPasswordInput>({
		mutationFn: (values) => apiClient.post(`auth/reset-password`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}

export function useChangeLanguageMutation() {
	return useMutation<CommonApiResponse, CommonApiResponse, { language: string }>({
		mutationFn: (values) => apiClient.post(`users/set-user-language`, values),
	});
}
