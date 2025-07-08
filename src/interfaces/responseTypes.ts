import type {
	CurrentUserType,
	Doctor,
	DoctorSpecialtiesType,
	Lab,
	TopDoctor,
	TopLab,
	TopPharmacy,
} from '.';
import type { responseStatus } from './enums';

// Common API Response
export type CommonApiResponse = {
	message: string;
	status: responseStatus;
};

// common pagination
export type PayloadPaginationType = {
	page: number;
	limit: number;
};

export type ResponsePagination = {
	total: number;
	page: number;
	totalPages: number;
};

//common interfaces

export type ForgotPasswordResponse = CommonApiResponse & {
	status: string;
	message: string;
	otp: string;
};

export type LoginResponse = CommonApiResponse & {
	user: CurrentUserType;
	token: string;
	isOtpVerified?: boolean;
};

export type VerifyOtpResponse = CommonApiResponse & {
	data: { user: CurrentUserType; token: string };
	isOtpVerified?: boolean;
};

export type DoctorsResponse = CommonApiResponse & {
	data: { items: Doctor[]; meta: ResponsePagination };
};

export type LabsResponse = CommonApiResponse & {
	data: { items: Lab[]; meta: ResponsePagination };
};

export type AppointmentsResponse = CommonApiResponse & {
	data: { labs: Lab[]; meta: ResponsePagination };
};

export type PatientHomeTopEntitiesResponse = CommonApiResponse & {
	data: { topDoctors: TopDoctor[]; topPharmacies: TopPharmacy[]; topLabs: TopLab[] };
};

export type DoctorSpecialtiesResponse = CommonApiResponse & {
	data: { doctorCategories: DoctorSpecialtiesType[] };
};
