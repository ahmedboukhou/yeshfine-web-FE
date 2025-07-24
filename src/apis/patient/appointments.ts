import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { AppointmentType, UpcomingAppointmentType } from '../../interfaces';
import type { AppointmentFilterTypeEnum } from '../../interfaces/enums';
import type { BookAppointmentInput } from '../../interfaces/formInputTypes';
import type {
	AppointmentSlotResponse,
	CommonApiResponse,
	PayloadPaginationType,
	ResponsePagination,
} from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';

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

export function useMarkAsCompleteAppointmentMutation() {
	return useMutation<CommonApiResponse, CommonApiResponse, { id?: string }>({
		mutationFn: (values) =>
			apiClient.put(`patients/doctor/mark/appointment/${values?.id}`, values),
		onError: ({ message }) => toast.error(message || 'Something went wrong'),
	});
}

type PatientAppointmentDetailResponseType = CommonApiResponse & {
	data: Omit<AppointmentType, 'doctor' | 'appointment_id' | 'distance'> & {
		id: number; // replaces appointment_id
		reason: string;
		show_mark_complete: boolean;
	};
};
export function useGetPatientAppointmentDetailQuery({ id }: { id?: string }) {
	return useQuery({
		queryKey: ['get-patient-appointment-detail', id],
		queryFn: (): Promise<PatientAppointmentDetailResponseType> =>
			apiClient.get(`patients/appointments/${id}`),
	});
}
