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
	gender: string;
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
export type BookAppointmentInput = {
	doctor_id: string;
	appointment_date: string;
	start_time: string;
	end_time: string;
	appointment_type: string;
	reason: string;
	notes: string;
	doctor_detail_id: string;
};
