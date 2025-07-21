import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetLabsQuery } from '../../../apis/patient/labs';
import { SearchInput } from '../../../components/ui/actions/SearchInput';
import { LabsPharmacyCard } from '../../../components/ui/cards/LabsPharmacyCard';
import { Pagination } from '../../../components/ui/Pagination';
import { LabsPharmacyCardSkeleton } from '../../../components/ui/skeletons/LabsPharmacySkeleton';
import type { LabFilterType } from '../../../interfaces';
import { LABS_DETAIL_ROUTE } from '../../../routes';
import { SearchLabFilter } from './Filter';
import { LocationEnum } from '../../../interfaces/enums';

const filterInitialState: LabFilterType = {
	labTestList: [],
	location: LocationEnum.All,
	showOpen: false,
	resultTime: 'all',
};

export const PatientLabs = () => {
	const { t } = useTranslation();

	const [page, setPage] = useState(1);
	const [shouldRefetch, setShouldRefetch] = useState(false);
	const [search, setSearch] = useState('');

	const [filterValues, setFilterValues] = useState<LabFilterType>(filterInitialState);

	const { data, isFetching, refetch, isSuccess } = useGetLabsQuery({
		page,
		limit: 6,
		...filterValues,
		labTestList: filterValues.labTestList.map(({ id }) => id),
		search,
	});
	const labs = data?.data?.items || [];
	const meta = data?.data?.meta;

	useEffect(() => {
		if (shouldRefetch) {
			refetch();
			setShouldRefetch(false);
		}
	}, [page, shouldRefetch]);

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
		setFilterValues(filterInitialState);
		setShouldRefetch(true);
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		setShouldRefetch(true);
	};

	return (
		<section>
			<div className="mb-6 flex-between-center flex-wrap gap-3">
				<h3 className="font-semibold text-typography-700">{t('labs')}</h3>

				<div className="flex-items-center gap-2">
					<SearchInput onChange={handleSearch}
					 />
					<SearchLabFilter
						disabled={isFetching}
						setFilterValues={setFilterValues}
						filterValues={filterValues}
						applyFilters={handleApplyFilters}
						clearFilters={handleClearFilters}
					/>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-5 mb-10">
				{isFetching ? (
					<LabsPharmacyCardSkeleton count={6} />
				) : !!labs?.length ? (
					<Fragment>
						{labs.map(
							({
								address,
								id,
								image,
								name,
								distance,
								todaySlot,
								labDetail: { average_rating },
							}) => (
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
						)}
					</Fragment>
				) : (
					<div className="col-span-12 my-4 flex-center">
						<p>{t('notFound', { ns: 'patient', text: t('labs', { ns: 'common' }) })}</p>
					</div>
				)}
			</div>

			{isSuccess && !!labs?.length && (
				<Pagination
					currentPage={page}
					totalPages={meta?.totalPages || 1}
					onPageChange={handlePageChange}
					isLoading={isFetching}
				/>
			)}
		</section>
	);
};
