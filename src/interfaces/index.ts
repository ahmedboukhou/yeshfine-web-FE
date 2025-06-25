import type { Role } from './enums';

export type CurrentUserType = {
	name: string;
	phone: string;
	role: string;
	dob: string;
};


// Input types
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
