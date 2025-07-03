import { useTranslation } from 'react-i18next';
import { SearchInput } from '../../../components/common/actions/SearchInput';
import { DoctorCard } from '../../../components/common/cards/DoctorCard';
import { SearchDoctorFilter } from './Filter';

export const PatientDoctors = () => {
	const { t } = useTranslation(['common']);
	return (
		<section>
			<div className="mb-6 flex-between flex-wrap gap-3">
				<h3>{t('doctors')}</h3>

				<div className="flex-items-center gap-2">
					<SearchInput />
					<SearchDoctorFilter />
				</div>
			</div>
			<div className="grid grid-cols-12 gap-5">
				{[1, 2, 3, 3, 4].map(() => (
					<div className=" col-span-12 sm:col-span-6  lg:col-span-4 2xl:col-span-3">
						<DoctorCard />
					</div>
				))}
			</div>
		</section>
	);
};
