import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api';
import type { CommonApiResponse } from '../../interfaces/responseTypes';

type LabSummaryResponseType = {
	summary: {
		Sun: number;
		Mon: number;
		Tue: number;
		Wed: number;
		Thu: number;
		Fri: number;
		Sat: number;
	};
	percent_change: number;
	reports_uploaded: number;
	total_appointments: number;
	upcoming_today: number;
};
export function useGetLabSummaryQuery() {
	return useQuery({
		queryKey: ['get-lab-summary'],
		queryFn: (): Promise<{ data: LabSummaryResponseType }> =>
			apiClient.get(`dashboard/lab/summary`),
	});
}



type LabUpcomingAppointmentsResponse = CommonApiResponse & {
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
export function useGetLabUpcomingAppointmentsQuery() {
  return useQuery({
    queryKey: ['get-lab-upcoming-appointments'],
    queryFn: (): Promise<LabUpcomingAppointmentsResponse> =>
      apiClient.get(`dashboard/lab/appointments`),
  });
}
