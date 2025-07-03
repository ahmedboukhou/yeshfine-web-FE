import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/api";

export function useGetDoctorsQuery() {
	return useQuery({
		queryKey: ['get-doctors'],
		queryFn: () => apiClient.get(`patients/getDoctorsList`),
	});
}