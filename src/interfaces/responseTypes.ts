import type { CurrentUserType } from '.';
import type { responseStatus } from './enums';

// Common API Response
export type CommonApiResponse = {
	message: string;
	status: responseStatus;
};

//common interfaces

export type ForgotPasswordResponse =CommonApiResponse & {
	status: string;
	message: string;
	otp: string;
};

export type LoginResponse = CommonApiResponse & {
	user: CurrentUserType;
	token: string;
	isOtpVerified?: boolean;
};
