import { useEffect, useState } from 'react';
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
	}>({ specializations: [], location: '' });
	const [search, setSearch] = useState('');
	const {
		data,
		isLoading: loadingDoctors,
		refetch,
	} = useGetDoctorsQuery({
		page,
		limit: 6,
		search,
		specialization_filter: filterValues.specializations.map(({ id }) => id),
		location_filter: filterValues.location,
	});
	const doctorsData = data?.data?.items || [];
	const pagination = data?.data?.meta;
	const handlePageChange = (pageNum: number) => setPage(pageNum);
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

	useEffect(() => {
		const handler = setTimeout(() => {
			refetch();
		}, 500);

		return () => {
			clearTimeout(handler);
		};
	}, [search]);

	return (
		<section>
			<div className="mb-6 flex-between-center flex-wrap gap-3">
				<h3>{t('doctors')}</h3>

				<div className="flex-items-center gap-2">
					<SearchInput onChange={handleSearch} />
					<SearchDoctorFilter
						setFilterValues={setFilterValues}
						filterValues={filterValues}
						applyFilters={refetch}
					/>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-5 mb-10">
				{loadingDoctors ? (
					<DoctorCardSkeleton count={6} />
				) : (
					doctorsData.map(
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
					)
				)}
			</div>

			{/* Pagination */}
			<Pagination
				currentPage={page}
				totalPages={pagination?.totalPages || 1}
				onPageChange={handlePageChange}
				isLoading={loadingDoctors}
			/>
		</section>
	);
};
