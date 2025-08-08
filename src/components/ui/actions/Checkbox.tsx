import type { FC } from 'react';

type CheckboxProps = {
	id: number | string;
	isChecked: boolean;
	name: string;
	handleCheckbox: (id: number | string) => void;
};
export const Checkbox: FC<CheckboxProps> = ({ id, isChecked, name, handleCheckbox }) => {
	return (
		<div className="flex items-center cursor-pointer">
			<input
				type="checkbox"
				className="primary-checkbox"
				id={`spec-${id}`}
				checked={isChecked}
				onChange={() => handleCheckbox(id)}
			/>
			<label
				htmlFor={`spec-${id}`}
				className={`ms-3 cursor-pointer capitalize ${
					isChecked ? 'text-primary font-semibold' : 'text-typography-600'
				}`}
			>
				{name}
			</label>
		</div>
	);
};
