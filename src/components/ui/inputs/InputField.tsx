import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

type InputFieldProps = {
	label: string;
	id: string;
	type?: string;
	placeholder?: string;
	error: any;
	register: any;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};
export const InputField: FC<InputFieldProps> = ({
	label,
	id,
	type = 'text',
	error,
	register,
	inputProps,
	placeholder,
}) => {
	const { t } = useTranslation();

	return (
		<div>
			<label htmlFor={id} className="input-label">
				{label}
			</label>
			<input
				id={id}
				type={type}
				{...register}
				{...inputProps}
				className={`input input-box-shadow ${error ? '!outline-red-600' : ''}`}
				placeholder={placeholder || t('enter')}
			/>
			<div className="mt-0.5">
				{error && <span className="text-red-600 text-sm">{error.message}</span>}
			</div>
		</div>
	);
};
