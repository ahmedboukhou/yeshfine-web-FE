import { useQuery } from '@tanstack/react-query';
import type { AppointmentFilterTypeEnum } from '../../interfaces/enums';
import type {
	CommonApiResponse,
	PayloadPaginationType,
	ResponsePagination,
} from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';

type GetAppointmentsQueryParams = PayloadPaginationType & {
	type: AppointmentFilterTypeEnum;
	search: string;
};

type AppointmentsResponse = CommonApiResponse & {
	data: {
		items: {
			appointment_id: number;
			appointment_date: string; // e.g. "20 Aug"
			ticket_number: number;
			start_time: string; // e.g. "09:00 AM"
			end_time: string; // e.g. "04:00 PM"
			appointment_type: string; // e.g. "In Person"
			patient_name: string;
			meeting_link: string | null;
			patient_image: string | null;
			patient_address: string;
		}[];
		meta: ResponsePagination;
	};
};
export function useGetDoctorAppointmentsQuery({
	page,
	limit,
	type,
	search,
}: GetAppointmentsQueryParams) {
	return useQuery({
		queryKey: ['get-doctors-appointments'],
		queryFn: (): Promise<AppointmentsResponse> =>
			apiClient.get(`doctors/getAppointments`, { page, limit, type, ...(search && { search }) }),
	});
}

type PatientAppointmentDetailResponseType = {
	data: {
		appointment: {
			appointment_id: number;
			appointment_date: string; // e.g. "20 Aug"
			ticket_number: number;
			start_time: string; // e.g. "09:00 AM"
			end_time: string; // e.g. "04:00 PM"
			appointment_type: string; // e.g. "In Person"
			meeting_link: string | null;
			reason: string;

			patient: {
				id: number;
				name: string;
				image: string | null;
				address: string;
				dob: string; // e.g. "9 June, 2025"
				gender: 'male' | 'female' | string; // you can restrict values if needed
			};

			doctor: {
				id: number;
				name: string;
				image: string;
				address: string;
			};
		};
	};
};
export function useGetDoctorAppointmentDetailQuery({ id }: { id?: string }) {
	return useQuery({
		queryKey: ['get-doctor-appointment-detail', id],
		queryFn: (): Promise<PatientAppointmentDetailResponseType> =>
			apiClient.get(`doctors/appointments/${id}`),
	});
}
