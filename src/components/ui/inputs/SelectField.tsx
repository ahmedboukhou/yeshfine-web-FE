import { HSStaticMethods } from 'preline/dist';
import { useEffect, type FC } from 'react';
import { DownArrowIcon } from '../../../assets/icons';
import type { SelectType } from '../../../interfaces';

type InputFieldProps = {
	label: string;
	id: string;
	error: any;
	register: any;
	options: SelectType[];
};
export const SelectField: FC<InputFieldProps> = ({ label, id, error, register, options }) => {
	useEffect(() => {
		HSStaticMethods.autoInit(); // Initializes all Preline components
	}, []);
	return (
		<div>
			<label htmlFor={id} className="input-label">
				{label}
			</label>
			<div className="relative">
				<select
					id={id}
					{...register}
					data-hs-select='{
  "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2.5 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-border-1 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-primary",
  "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
  "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50"
}'
					className="hidden"
				>
					<option value="">Choose</option>
					{options.map(({ label, value }, index) => (
						<option value={value} key={index}>
							{label}
						</option>
					))}
				</select>
				<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
					<DownArrowIcon />
				</div>
			</div>
			{error && <span className="text-red-600 text-sm mt-1">{error.message}</span>}
		</div>
	);
};
