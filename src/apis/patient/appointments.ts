import { useQuery } from '@tanstack/react-query';
import type { AppointmentTypeEnum } from '../../interfaces/enums';
import type { AppointmentsResponse, PayloadPaginationType } from '../../interfaces/responseTypes';
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
