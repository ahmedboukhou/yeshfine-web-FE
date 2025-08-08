import { useMutation } from "@tanstack/react-query";
import type { CommonApiResponse } from "../../interfaces/responseTypes";
import type { PatientUpdateAddressInput } from "../patient/profile";
import { apiClient } from "../../lib/api";
import { toast } from "react-toastify";

export function useUpdateAddressMutation() {
	return useMutation<CommonApiResponse, CommonApiResponse, PatientUpdateAddressInput>({
		mutationFn: (values) => apiClient.put(`users/update-address`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}