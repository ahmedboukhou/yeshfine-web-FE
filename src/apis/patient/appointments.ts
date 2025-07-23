import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { BookAppointmentInput } from '../../interfaces/formInputTypes';
import type {
	AppointmentSlotResponse,
	CommonApiResponse,
	PayloadPaginationType,
	ResponsePagination,
} from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';
import type { AppointmentFilterTypeEnum } from '../../interfaces/enums';
import type { AppointmentType, UpcomingAppointmentType } from '../../interfaces';

type PatientUpcomingAppointmentsResponse = CommonApiResponse & {
	data: UpcomingAppointmentType[];
};
export function useGetPatientUpcomingAppointmentsQuery() {
	return useQuery({
		queryKey: ['get-patient-upcoming-appointments'],
		queryFn: (): Promise<PatientUpcomingAppointmentsResponse> =>
			apiClient.get(`dashboard/patient/upcoming-appointments`),
	});
}

type GetAppointmentsQueryParams = PayloadPaginationType & {
	type: AppointmentFilterTypeEnum;
	search: string;
};
type AppointmentsResponse = CommonApiResponse & {
	data: { items: AppointmentType[]; meta: ResponsePagination };
};
export function useGetAppointmentsQuery({ page, limit, type, search }: GetAppointmentsQueryParams) {
	return useQuery({
		queryKey: ['get-patient-appointments', type],
		queryFn: (): Promise<AppointmentsResponse> =>
			apiClient.get(`patients/appointments`, { page, limit, type, ...(search && { search }) }),
	});
}

export function useGetDoctorAppointmentSlotQuery({
	id,
	appointment_date,
}: {
	id?: string;
	appointment_date?: string;
}) {
	return useQuery({
		queryKey: ['get-appointment-slots', id, appointment_date],
		queryFn: (): Promise<AppointmentSlotResponse> =>
			apiClient.get(`patients/doctor-available-slots`, { doctor_id: id, appointment_date }),
	});
}

export function useBookAppointmentMutation() {
	return useMutation<CommonApiResponse, CommonApiResponse, BookAppointmentInput>({
		mutationFn: (values) => apiClient.post(`patients/appointments`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}
