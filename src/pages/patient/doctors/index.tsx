import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetDoctorsQuery } from '../../../apis/patient/doctors';
import { Pagination } from '../../../components/ui/Pagination';
import { SearchInput } from '../../../components/ui/actions/SearchInput';
import { DoctorCard } from '../../../components/ui/cards/DoctorCard';
import { DoctorCardSkeleton } from '../../../components/ui/skeletons/DoctorCardSkeleton';
import type { DoctorSpecialtiesType } from '../../../interfaces';
import { SearchDoctorFilter } from './Filter';

export const PatientDoctors = () => {
	const { t } = useTranslation();
	
	const [page, setPage] = useState(1);
	const [filterValues, setFilterValues] = useState<{
		specializations: DoctorSpecialtiesType[];
		location: string;
	}>({ specializations: [], location: 'all' });
	const [search, setSearch] = useState('');
	const [shouldRefetch, setShouldRefetch] = useState(false);

	const {
		data,
		isFetching: loadingDoctors,
		refetch,
		isSuccess,
	} = useGetDoctorsQuery({
		page,
		limit: 6,
		search,
		specialization: filterValues.specializations.map(({ id }) => id),
		location: filterValues.location,
	});
	const doctorsData = data?.data?.items || [];
	const pagination = data?.data?.meta;

	useEffect(() => {
		if (shouldRefetch) {
			setPage(1);
			refetch();
			setShouldRefetch(false);
		}
	}, [page, shouldRefetch]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		setShouldRefetch(true);
	};

	const handleApplyFilters = () => {
		setShouldRefetch(true);
	};

	const handleClearFilters = () => {
		setFilterValues({ specializations: [], location: 'all' });
		setShouldRefetch(true);
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		setShouldRefetch(true);
	};

	return (
		<section>
			<div className="mb-6 flex-between-center flex-wrap gap-3">
				<h3 className="font-semibold text-typography-700">{t('doctors')}</h3>

				<div className="flex-items-center gap-2">
					<SearchInput onChange={handleSearch} />
					<SearchDoctorFilter
						setFilterValues={setFilterValues}
						filterValues={filterValues}
						applyFilters={handleApplyFilters}
						clearFilters={handleClearFilters}
					/>
				</div>
			</div>
			<div>
				<div className="grid grid-cols-12 gap-5 mb-10">
					{loadingDoctors ? (
						<DoctorCardSkeleton count={6} />
					) : !!doctorsData?.length ? (
						<Fragment>
							{doctorsData.map(
								({
									image,
									name,
									id,
									distance,
									latitude,
									longitude,
									doctorDetail: { experience, clinicName, average_rating, speciality },
								}) => (
									<DoctorCard
										key={id}
										latitude={latitude}
										longitude={longitude}
										image={image}
										name={name}
										id={id}
										experience={experience}
										clinicName={clinicName}
										averageRating={average_rating}
										specialty={speciality}
										distance={distance}
									/>
								)
							)}
						</Fragment>
					) : (
						<div className="col-span-12 my-4 flex-center">
							<p>{t('notFound', { ns: 'patient', text: t('doctors', { ns: 'common' }) })}</p>
						</div>
					)}
				</div>

				{/* Pagination */}
				{isSuccess && !!doctorsData?.length && (
					<Pagination
						currentPage={page}
						totalPages={pagination?.totalPages || 1}
						onPageChange={handlePageChange}
						isLoading={loadingDoctors}
					/>
				)}
			</div>
		</section>
	);
};
