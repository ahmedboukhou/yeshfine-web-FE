import type {
	CurrentUserType,
	Doctor,
	DoctorDetail,
	DoctorReviewType,
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
	limit: number;
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
	refreshToken: string;
	isOtpVerified?: boolean;
};

export type VerifyOtpResponse = CommonApiResponse & {
	data: { user: CurrentUserType; token: string; refreshToken: string };
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

export type DoctorReviewsResponse = CommonApiResponse & {
	data: {
		items: {
			doctor: {
				id: number;
				name: string;
				image: string;
				average_rating: string;
				total_reviews: number;
			};
			reviews: DoctorReviewType[];
		};
		meta: ResponsePagination;
	};
};

export type DoctorDetailResponse = {
	data: {
		id: number;
		name: string;
		image: string;
		address: string;
		latitude: number;
		longitude: number;
		treated_patients: string;
		doctorDetail: DoctorDetail;
	};
};
