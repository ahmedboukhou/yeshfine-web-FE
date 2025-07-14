import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetLabsQuery } from '../../../apis/patient/labs';
import { LabsPharmacyCard } from '../../../components/ui/cards/LabsPharmacyCard';
import { Pagination } from '../../../components/ui/Pagination';
import { LabsPharmacyCardSkeleton } from '../../../components/ui/skeletons/LabsPharmacySkeleton';
import { LABS_DETAIL_ROUTE } from '../../../routes';

export const PatientLabs = () => {
	const { t } = useTranslation();

	const [page, setPage] = useState(1);
	// const [search, setSearch] = useState('');

	const { data, isLoading } = useGetLabsQuery({ page, limit: 6 });
	const labs = data?.data?.items || [];
	const meta = data?.data?.meta;
	const handlePageChange = (pageNum: number) => setPage(pageNum);
	// const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

	// useEffect(() => {
	// 	const handler = setTimeout(() => {
	// 		refetch();
	// 	}, 500);

	// 	return () => {
	// 		clearTimeout(handler);
	// 	};
	// }, [search]);

	return (
		<section>
			<div className="mb-6 flex-between-center flex-wrap gap-3">
				<h3 className="font-semibold text-typography-700">{t('labs')}</h3>

				{/* <div className="flex-items-center gap-2">
					<SearchInput onChange={handleSearch} />
					<SearchDoctorFilter
						setFilterValues={setFilterValues}
						filterValues={filterValues}
						applyFilters={refetch}
					/>
				</div> */}
			</div>
			<div className="grid grid-cols-12 gap-5 mb-10">
				{isLoading ? (
					<LabsPharmacyCardSkeleton count={6} />
				) : (
					!!labs?.length &&
					labs.map(
						({ address, id, image, name, distance, todaySlot, labDetail: { average_rating } }) => (
							<LabsPharmacyCard
								address={address}
								image={image}
								todaySlot={todaySlot}
								key={id}
								averageRating={average_rating}
								distance={distance}
								name={name}
								link={LABS_DETAIL_ROUTE.replace(':id', `${id}`)}
							/>
						)
					)
				)}
			</div>

			<Pagination
				currentPage={page}
				totalPages={meta?.totalPages || 1}
				onPageChange={handlePageChange}
				isLoading={isLoading}
			/>
		</section>
	);
};
