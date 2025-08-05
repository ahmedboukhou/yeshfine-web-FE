import { useTranslation } from 'react-i18next';

interface SelectProps<T extends string> {
	id: string;
	name: string;
	disabled?: boolean;
	value: T | '';
	options: T[];
	enumMap: Record<T, string>; // Used for mapping enum values to translation keys
	onChange: (value: T | '') => void;
}

export const Select = <T extends string>({
	id,
	name,
	value,
	options,
	enumMap,
	onChange,
	disabled,
}: SelectProps<T>) => {
	const { t } = useTranslation();

	return (
		<select
			id={id}
			name={name}
			value={value}
			disabled={disabled}
			onChange={(e) => onChange(e.target.value as T | '')}
			className="cursor-pointer text-typography-700 focus:ring-0 hover:border-primary focus:border-primary-active rounded-xl border-none disabled:pointer-events-none disabled:text-typography-400"
		>
			<option className="option" value="">
				{t('all')}
			</option>
			{options.map((status) => (
				<option className="option" key={status} value={status}>
					{t(enumMap[status])}
				</option>
			))}
		</select>
	);
};
