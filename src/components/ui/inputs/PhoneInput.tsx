import React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneNumberInputProps {
	id?: string;
	label?: string;
	value: string;
	onChange: (value: string) => void;
	register: UseFormRegisterReturn;
	error?: FieldError;
	required?: boolean;
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
	id = 'phone',
	label,
	value,
	onChange,
	register,
	error,
	required = false,
}) => {
	return (
		<div>
			{label && (
				<label htmlFor={id} className="input-label">
					{label} {required && <span className="text-red-600">*</span>}
				</label>
			)}
			<PhoneInput
				country="us"
				value={value}
				{...register}
				onChange={(phone) => onChange(phone.startsWith('+') ? phone : `+${phone}`)}
				buttonClass={`${error ? '!border-red-600' : ''} !py-1 !rounded-l-lg`}
				inputClass={`!py-5 !w-full !input-box-shadow !input !rounded-lg ${
					error
						? '!border-red-600 focus:ring-red-600 focus:ring-1'
						: 'focus:ring-primary focus:ring-2'
				}`}
			/>
			{error && <span className="text-red-600 text-sm mt-1">{error.message}</span>}
		</div>
	);
};
