import { useTranslation } from 'react-i18next';
import { useGetDoctorsQuery } from '../../../apis/patient/doctors';
import { PaginationBackIcon, PaginationNextIcon } from '../../../assets/icons';
import { SearchInput } from '../../../components/common/actions/SearchInput';
import { DoctorCard } from '../../../components/common/cards/DoctorCard';
import { DoctorCardSkeleton } from '../../../components/common/skeletons/DoctorCardSkeleton';
import { SearchDoctorFilter } from './Filter';

export const PatientDoctors = () => {
	const { t } = useTranslation(['common']);
	const { data, isLoading: loadingDoctors } = useGetDoctorsQuery();
	console.log(data?.data?.doctorsList);
	const doctorsData = data?.data?.doctorsList || [];

	return (
		<section>
			<div className="mb-6 flex-between-center flex-wrap gap-3">
				<h3>{t('doctors')}</h3>

				<div className="flex-items-center gap-2">
					<SearchInput />
					<SearchDoctorFilter />
				</div>
			</div>
			<div className="grid grid-cols-12 gap-5 mb-10">
				{loadingDoctors ? (
					<DoctorCardSkeleton count={6} />
				) : (
					doctorsData.map(
						({ image, name, id, doctorDetail: { experience, clinicName, average_rating } }) => (
							<DoctorCard
								key={id}
								image={image}
								name={name}
								id={id}
								experience={experience}
								clinicName={clinicName}
								averageRating={average_rating}
							/>
						)
					)
				)}
			</div>

			{/* Pagination */}
			<nav
				className="flex justify-between items-center gap-x-1 pt-5 border-t border-t-border-1"
				aria-label="Pagination"
			>
				<button className="pagination-btn">
					<PaginationBackIcon />
					<span aria-hidden="true" className="hidden sm:block">
						{t('previous')}
					</span>
				</button>
				<div className="flex-items-center gap-x-1">
					<button className="min-h-9.5 min-w-9.5 flex justify-center items-center bg-primary text-white py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none">
						1
					</button>
					<button className="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
						2
					</button>
					<button className="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
						3
					</button>
				</div>
				<button className="pagination-btn">
					<span aria-hidden="true" className="hidden sm:block">
						{t('next')}
					</span>
					<PaginationNextIcon />
				</button>
			</nav>
		</section>
	);
};
