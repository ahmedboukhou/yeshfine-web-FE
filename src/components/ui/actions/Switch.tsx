import type { FC } from 'react';

type SwitchProps = {
	onChange: (checked: boolean) => void;
	checked: boolean;
};
export const Switch: FC<SwitchProps> = ({ checked, onChange }) => {
	return (
		<div className="flex items-center gap-x-3">
			<label
				htmlFor="hs-basic-with-description-checked"
				className="relative inline-block w-11 h-6 cursor-pointer"
			>
				<input
					type="checkbox"
					id="hs-basic-with-description-checked"
					className="peer sr-only"
					checked={checked}
					onChange={(e) => onChange(e.target.checked)}
				/>
				<span className="absolute inset-0 bg-typography-400 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
				<span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-primary-light dark:peer-checked:bg-white"></span>
			</label>
			{/* <label
				htmlFor="hs-basic-with-description-checked"
				className="text-sm text-gray-500 dark:text-neutral-400"
			>
				Checked
			</label> */}
		</div>
	);
};
