import dayjs from 'dayjs';
import type { TFunction } from 'i18next';
import * as yup from 'yup';

// * Regex
export const nameRegex = /^[\p{L} ]+$/u;
export const numberRegex = /^[0-9]+$/;

// * Common Validations

const requiredString = (
	t: TFunction,
	fieldName: string,
	ns: string,
	options?: {
		isRequired?: boolean;
		min?: number;
		minMessage?: string;
		maxMessage?: string;
		max?: number;
		regex?: RegExp;
		regexMessage?: string;
	}
) => {
	let schema = yup
		.string()
		.required(t('requiredField', { field: t(fieldName, { ns }), ns: 'validations' }));

	if (options?.regex) {
		schema = schema.matches(
			options.regex,
			options.regexMessage ||
				t('invalidFieldFormat', {
					field: t(fieldName, { ns }),
					ns: 'validations',
				})
		);
	}

	if (options?.min) {
		schema = schema.min(
			options.min,
			options.minMessage ||
				t('minLengthField', {
					field: t(fieldName, { ns }),
					min: options.min,
					ns: 'validations',
				})
		);
	}

	if (options?.max) {
		schema = schema.max(
			options.max,
			options.maxMessage ||
				t('maxLengthField', {
					field: t(fieldName, { ns }),
					max: options.max,
					ns: 'validations',
				})
		);
	}

	return schema;
};

const phoneValidation = (t: TFunction) =>
	requiredString(t, 'phone', 'common', {
		min: 4,
	});

const dobValidation = (t: TFunction) =>
	yup
		.string()
		.required(t('requiredField', { field: t('dob', { ns: 'auth' }), ns: 'validations' }))
		.test('is-valid-date', t('invalidDateFormat', { ns: 'validations' }), (value) =>
			value ? dayjs(value, 'YYYY-MM-DD', true).isValid() : false
		)
		.test('not-in-future', t('invalidDOB', { ns: 'validations' }), (value) =>
			value ? dayjs(value).isBefore(dayjs(), 'day') || dayjs(value).isSame(dayjs(), 'day') : false
		);

const passwordValidation = (t: TFunction) =>
	requiredString(t, 'password', 'auth', {
		regex: numberRegex,
		min: 6,
		max: 8,
		regexMessage: t('numericPasswordOnly', { ns: 'validations' }),
		minMessage: t('numericPasswordLength', { ns: 'validations' }),
		maxMessage: t('numericPasswordLength', { ns: 'validations' }),
	});

// * Schemas

export const loginSchema = (t: TFunction) =>
	yup.object({
		phone: phoneValidation(t),
		password: passwordValidation(t),
	});

export const forgotPasswordSchema = (t: TFunction) =>
	yup.object({
		phone: phoneValidation(t),
	});

export const signupSchema = (t: TFunction) =>
	yup.object({
		phone: phoneValidation(t),
		password: passwordValidation(t),
		confirm_password: yup
			.string()
			.required(
				t('requiredField', { field: t('confirmPassword', { ns: 'auth' }), ns: 'validations' })
			)
			.oneOf([yup.ref('password')], t('passwordsMustMatch', { ns: 'validations' })),

		dob: yup
			.string()
			.required(t('requiredField', { field: t('dob', { ns: 'auth' }), ns: 'validations' }))
			.test('is-valid-date', t('invalidDateFormat', { ns: 'validations' }), (value) =>
				value ? dayjs(value, 'YYYY-MM-DD', true).isValid() : false
			)
			.test('not-in-future', t('invalidDOB', { ns: 'validations' }), (value) =>
				value ? dayjs(value).isBefore(dayjs(), 'day') || dayjs(value).isSame(dayjs(), 'day') : false
			),

		gender: requiredString(t, 'gender', 'common'),
		name: requiredString(t, 'name', 'common', {
			min: 2,
			max: 50,
			regex: nameRegex,
			regexMessage: t('alphabetOnlyName', { ns: 'validations' }),
		}),
	});

export const patientProfileSchema = (t: TFunction) =>
	yup.object({
		gender: requiredString(t, 'gender', 'common'),
		name: requiredString(t, 'name', 'common', {
			min: 2,
			max: 50,
			regex: nameRegex,
			regexMessage: t('alphabetOnlyName', { ns: 'validations' }),
		}),

		dob: dobValidation(t),
	});

export const resetPasswordSchema = (t: TFunction) =>
	yup.object({
		newPassword: passwordValidation(t),
		currentPassword: requiredString(t, 'currentPassword', 'common'),
	});
