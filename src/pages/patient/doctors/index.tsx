import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetDoctorsQuery } from '../../../apis/patient/doctors';
import { Pagination } from '../../../components/ui/Pagination';
import { SearchInput } from '../../../components/ui/actions/SearchInput';
import { DoctorCard } from '../../../components/ui/cards/DoctorCard';
import { DoctorCardSkeleton } from '../../../components/ui/skeletons/DoctorCardSkeleton';
import type { DoctorSpecialtiesType } from '../../../interfaces';
import { LocationEnum } from '../../../interfaces/enums';
import { SearchDoctorFilter } from './Filter';

export const PatientDoctors = () => {
	const { t } = useTranslation();

	const [page, setPage] = useState(1);
	const [filterValues, setFilterValues] = useState<{
		specializations: DoctorSpecialtiesType[];
		location: LocationEnum;
	}>({ specializations: [], location: LocationEnum.All });
	const [search, setSearch] = useState('');
	const [shouldRefetch, setShouldRefetch] = useState(false);

	const { data, isFetching, refetch } = useGetDoctorsQuery({
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
			refetch();
			setShouldRefetch(false);
		}
	}, [shouldRefetch]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPage(1);
		setSearch(e.target.value);
		setShouldRefetch(true);
	};

	const handleApplyFilters = () => {
		setPage(1);
		setShouldRefetch(true);
	};

	const handleClearFilters = () => {
		setPage(1);
		setFilterValues({ specializations: [], location: LocationEnum.All });
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
						disabled={isFetching}
						applyFilters={handleApplyFilters}
						clearFilters={handleClearFilters}
					/>
				</div>
			</div>
			<div>
				<div className="grid grid-cols-12 gap-5 mb-10">
					{isFetching ? (
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
									doctorDetail: {
										experience,
										clinicName,
										average_rating,
										speciality,
										id: doctorDetailId,
									},
								}) => (
									<DoctorCard
										key={id}
										latitude={latitude}
										longitude={longitude}
										image={image}
										doctorDetailId={doctorDetailId}
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

				<Pagination
					currentPage={page}
					totalPages={pagination?.totalPages || 1}
					onPageChange={handlePageChange}
					isLoading={isFetching}
				/>
			</div>
		</section>
	);
};
