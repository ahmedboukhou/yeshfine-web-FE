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

export type UpdatePasswordInput = {
	currentPassword: string;
	newPassword: string;
};

export type BookAppointmentInput = {
	doctor_id: number;
	appointment_date: string;
	start_time: string;
	end_time: string;
	ticket_number?: number;
	appointment_type: string;
	reason: string;
	doctor_detail_id?: number;
};

export type PatientProfileInput = {
	name:string
	address?:string
	dob:string
	gender:string
}
