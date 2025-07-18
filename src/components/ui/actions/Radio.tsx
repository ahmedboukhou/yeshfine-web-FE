import type { FC } from 'react';

type RadioProps = {
	value: string | number;
	label: string;
	checked: boolean;
	onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Radio: FC<RadioProps> = ({ value, checked, onChange, label }) => {
	return (
		<div className="flex items-center " key={value}>
			<input
				type="radio"
				id={`appointment-type-${value}`}
				name="appointment-type"
				value={value}
				checked={checked}
				onChange={(e) => onChange(e)}
				className="shrink-0 mt-0.5 border-gray-200 rounded-full 
				cursor-pointer text-primary focus:ring-0 checked:border-primary 
				disabled:opacity-50 disabled:pointer-events-none"
			/>
			<label
				htmlFor={`appointment-type-${value}`}
				className={`${
					checked ? 'text-primary font-semibold' : 'text-gray-600'
				} ms-2 cursor-pointer`}
			>
				{label}
			</label>
		</div>
	);
};
