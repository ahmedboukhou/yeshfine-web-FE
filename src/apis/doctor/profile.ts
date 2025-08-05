import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/api";
import type { DoctorDetailResponse } from "../../interfaces/responseTypes";

export function useGetDoctorProfileQuery() {
	return useQuery({
		queryKey: ['get-doctor-profile'],
		queryFn: (): Promise<DoctorDetailResponse> => apiClient.get(`doctors/profile`),
	});
}