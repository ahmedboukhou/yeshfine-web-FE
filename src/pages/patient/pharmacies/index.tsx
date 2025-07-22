import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	useGetMedicinesCategoriesQuery,
	useGetPharmaciesQuery,
} from '../../../apis/patient/pharmacies';
import { SearchInput } from '../../../components/ui/actions/SearchInput';
import { PharmacyCard } from '../../../components/ui/cards/PharmacyCard';
import { Pagination } from '../../../components/ui/Pagination';
import { ScrollableList } from '../../../components/ui/ScrollableList';
import { PharmacyCardSkeleton } from '../../../components/ui/skeletons/PharmacyCardSkeleton';
import type { PharmacyFilterType } from '../../../interfaces';
import { LocationEnum } from '../../../interfaces/enums';
import { PHARMACIES_DETAIL_ROUTE } from '../../../routes';
import { useMedicineCategoriesStore } from '../../../store/medicineCategories';
import { SearchPharmacyFilter } from './Filter';

const filterInitialState: PharmacyFilterType = {
	location: LocationEnum.All,
	showOpen: false,
};

export const PatientPharmacies = () => {
	const { t } = useTranslation();

	const [page, setPage] = useState(1);
	const [shouldRefetch, setShouldRefetch] = useState(false);
	const [search, setSearch] = useState('');
	const [filterValues, setFilterValues] = useState<PharmacyFilterType>(filterInitialState);
	const [category, setCategory] = useState('');
	const { setMedicineCategories, medicineCategories } = useMedicineCategoriesStore(
		(state) => state
	);

	const { data, isFetching, refetch } = useGetPharmaciesQuery({
		page,
		limit: 6,
		...filterValues,
		search,
		category,
	});
	const pharmacies = data?.data?.items || [];
	const meta = data?.data?.meta;

	const { data: medicineCategoriesResponse, isSuccess: gotCategories } =
		useGetMedicinesCategoriesQuery();
	const medicineTypes = medicineCategoriesResponse?.data?.medicineCategories || [];

	useEffect(() => {
		gotCategories && !medicineCategories?.length && setMedicineCategories(medicineTypes);
	}, [medicineTypes, gotCategories]);

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

	const handleCategoryChange = (id: string) => {
		setPage(1);
		setCategory(id);
		setShouldRefetch(true);
	};

	return (
		<section>
			<div className="mb-6 space-y-2">
				<div className="flex-between-center flex-wrap gap-3">
					<h3 className="font-semibold text-typography-700">{t('pharmacies')}</h3>

					<div className="flex-items-center gap-2">
						<SearchInput onChange={handleSearch} />
						<SearchPharmacyFilter
							disabled={isFetching}
							setFilterValues={setFilterValues}
							filterValues={filterValues}
							applyFilters={handleApplyFilters}
							clearFilters={handleClearFilters}
						/>
					</div>
				</div>
				{!!medicineCategories?.length && (
					<ScrollableList
						medicineCategories={medicineCategories}
						category={category}
						disabled={isFetching}
						onCategoryChange={handleCategoryChange}
					/>
				)}
			</div>
			<div className="grid grid-cols-12 gap-5 mb-10">
				{isFetching ? (
					<PharmacyCardSkeleton count={6} />
				) : !!pharmacies?.length ? (
					<Fragment>
						{pharmacies.map(
							({ is_open, id, image, name, distance, medicines, address, time_range }) => (
								<PharmacyCard
									address={address}
									image={image}
									open={is_open}
									medicines={medicines}
									timeRange={time_range}
									key={id}
									distance={distance}
									name={name}
									link={PHARMACIES_DETAIL_ROUTE.replace(':id', `${id}`)}
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

			<Pagination
				currentPage={page}
				totalPages={meta?.totalPages || 1}
				onPageChange={handlePageChange}
				isLoading={isFetching}
			/>
		</section>
	);
};
