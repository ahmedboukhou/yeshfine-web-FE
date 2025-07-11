import { useQuery } from '@tanstack/react-query';
import type { AppointmentTypeEnum } from '../../interfaces/enums';
import type {
	AppointmentSlotResponse,
	AppointmentsResponse,
	PayloadPaginationType,
} from '../../interfaces/responseTypes';
import { apiClient } from '../../lib/api';

type GetAppointmentsQueryParams = PayloadPaginationType & {
	type: AppointmentTypeEnum;
};

export function useGetAppointmentsQuery({ page, limit, type }: GetAppointmentsQueryParams) {
	return useQuery({
		queryKey: ['get-appointments'],
		queryFn: (): Promise<AppointmentsResponse> =>
			apiClient.get(`patients/appointments`, { page, limit, type }),
	});
}

export function useGetAppointmentSlotQuery({
	doctor_id,
	appointment_date,
}: {
	doctor_id?: string;
	appointment_date?: string;
}) {
	return useQuery({
		queryKey: ['get-appointment-slots', doctor_id, appointment_date],
		queryFn: (): Promise<AppointmentSlotResponse> =>
			apiClient.get(`patients/doctor-available-slots`, { doctor_id, appointment_date }),
	});
}
