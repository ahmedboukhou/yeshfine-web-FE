import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

type InputFieldProps = {
	label: string;
	id: string;
	type: string;
	error: any;
	register: any;
	restrictFutureDate?: boolean;
};
export const InputField: FC<InputFieldProps> = ({
	label,
	id,
	type,
	error,
	register,
	restrictFutureDate,
}) => {
	const { t } = useTranslation();
	const today = new Date().toISOString().split('T')[0];

	return (
		<div>
			<label htmlFor={id} className="input-label">
				{label}
			</label>
			<input
				id={id}
				{...(restrictFutureDate && type === 'date' ? { max: today } : {})}
				type={type}
				{...register}
				className={`input input-box-shadow ${error ? '!outline-red-600' : ''}`}
				placeholder={t('enter')}
			/>
			{error && <span className="text-red-600 text-sm mt-1">{error.message}</span>}
		</div>
	);
};
