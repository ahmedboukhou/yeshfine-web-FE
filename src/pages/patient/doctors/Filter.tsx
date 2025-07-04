import { useTranslation } from 'react-i18next';
import { FilterIcon } from '../../../assets/icons';

export const SearchDoctorFilter = () => {
	const { t } = useTranslation(['common']);
	return (
		<div>
			<button className="primary-btn flex-items-center gap-2.5 !font-medium !px-2.5">
				<FilterIcon />
				{t('filters')}
			</button>
		</div>
	);
};
