import * as yup from 'yup';

// * Regex
export const nameRegex = /^[\p{L} ]+$/u;
export const numberRegex = /^[0-9]+$/;

// * Common Validations

const requiredString = (
	fieldName: string,
	options?: {
		min?: number;
		minMessage?: string;
		maxMessage?: string;
		max?: number;
		regex?: RegExp;
		regexMessage?: string;
	}
) => {
	let schema = yup.string().required(`${fieldName} is required`);

	if (options?.regex) {
		schema = schema.matches(
			options.regex,
			options.regexMessage || `${fieldName} format is invalid`
		);
	}
	if (options?.min) {
		schema = schema.min(
			options.min,
			options.minMessage || `${fieldName} must be at least ${options.min} characters`
		);
	}

	if (options?.max) {
		schema = schema.max(
			options.max,
			options.maxMessage || `${fieldName} must be at most ${options.max} characters`
		);
	}

	return schema;
};

const phoneValidation = requiredString('Phone number', {
	min: 10,
	max: 16,
	regex: numberRegex,
	regexMessage: 'Phone number must contain only digits',
});

// * Schemas

export const loginSchema = yup.object({
	phone: phoneValidation,
	password: requiredString('Password', {
		regex: numberRegex,
		regexMessage: 'Phone number must contain only digits',
	}),
});

export const forgotPasswordSchema = yup.object({
	phone: phoneValidation,
});

export const signupSchema = yup.object({
	phone: phoneValidation,
	password: requiredString('Password', {
		regex: numberRegex,
		min: 6,
		max: 8,
		regexMessage: 'Password must contain 6-8 numeric characters',
	}),
	confirm_password: yup
		.string()
		.required('Confirm password is required')
		.oneOf([yup.ref('password')], 'Passwords must match'),
		
	dob: requiredString('Date of Birth'),
	name: requiredString('Name', {
		min: 2,
		max: 50,
		regex: nameRegex,
		regexMessage: 'Name should only contain alphabets',
	}),
});
