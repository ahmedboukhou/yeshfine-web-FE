import { useQuery } from '@tanstack/react-query';
import type { CommonApiResponse } from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';

type DoctorSummaryResponseType = {
	summary: {
		Sun: number;
		Mon: number;
		Tue: number;
		Wed: number;
		Thu: number;
		Fri: number;
		Sat: number;
	};
	weekOverWeekChange: string;
	appointmentsThisWeek: number;
	totalRevenue: number;
};
export function useGetDoctorSummaryQuery() {
	return useQuery({
		queryKey: ['get-doctor-summary'],
		queryFn: (): Promise<{ data: DoctorSummaryResponseType }> =>
			apiClient.get(`dashboard/doctor/patients-summary`),
	});
}

type DoctorUpcomingAppointmentsResponse = CommonApiResponse & {
	appointments: {
		appointment_id: number;
		patient_id: number;
		patient_name: string;
		patient_image: string | null;
		appointment_date: string; // e.g. "20 Aug"
		ticket_number: number;
		start_time: string; // e.g. "09:00 AM"
		end_time: string; // e.g. "04:00 PM"
		type: string; // e.g. "In Person"
		meeting_link: string | null;
	}[];
};
export function useGetDoctorUpcomingAppointmentsQuery() {
	return useQuery({
		queryKey: ['get-doctor-upcoming-appointments'],
		queryFn: (): Promise<DoctorUpcomingAppointmentsResponse> =>
			apiClient.get(`dashboard/doctor/upcoming-appointments`),
	});
}
