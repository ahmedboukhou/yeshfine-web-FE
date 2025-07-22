import type { ChangeEventHandler, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchIcon } from '../../../assets/icons';

export const SearchInput: FC<{
	onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ onChange }) => {
	const { t } = useTranslation();
	return (
		<div className="relative xs:w-40 sm:w-xs">
			<input
				type="text"
				className="py-3 px-4 ps-11 block w-full border-gray-200 rounded-xl text-sm focus:z-10 focus:border-primary focus:ring-primary"
				placeholder={`${t('search')}...`}
				onChange={onChange}
			/>
			<div className="absolute inset-y-0 start-0 flex-items-center pointer-events-none z-20 ps-4 mt-1">
				<SearchIcon />
			</div>
		</div>
	);
};
