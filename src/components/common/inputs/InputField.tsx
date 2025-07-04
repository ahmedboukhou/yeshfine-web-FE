import { useTranslation } from 'react-i18next';

export const InputField = ({
	label,
	id,
	type,
	error,
	register,
}: {
	label: string;
	id: string;
	type: string;
	error: any;
	register: any;
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
				className={`input input-box-shadow ${error ? '!outline-red-600' : ''}`}
				placeholder={t('enter')}
			/>
			{error && <span className="text-red-600 text-sm mt-1">{error.message}</span>}
		</div>
	);
};
