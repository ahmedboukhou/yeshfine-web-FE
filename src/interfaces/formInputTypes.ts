import type { Role } from './enums';

export type LoginInput = {
	phone: string;
	password: string;
};

export type SignupInput = {
	name: string;
	phone: string;
	password: string;
	dob: string;
	confirm_password: string;
	role?: Role;
};

export type OTPInput = {
	phone: string;
	otp: string;
};

export type ForgotPasswordInput = {
	phone: string;
};

export type ResetPasswordInput = {
	phone?: string;
	newPassword: string;
	confirm_password: string;
};
