import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import {
	useGetMedicinesCategoriesQuery,
	useGetPharmacyMedicinesQuery,
} from '../../../../apis/patient/pharmacies';
import { useMedicineCategoriesStore } from '../../../../store/medicineCategories';
import { ScrollableList } from '../../../../components/ui/ScrollableList';
import { SearchInput } from '../../../../components/ui/actions/SearchInput';
import { useTranslation } from 'react-i18next';
import { MedicineCard } from '../../../../components/ui/MedicineCard';
import { MedicineCardSkeleton } from '../../../../components/ui/skeletons/MedicineCardSkeleton';
import { Pagination } from '../../../../components/ui/Pagination';
import { Breadcrumb } from '../../../../components/ui/Breadcrumb';
import { PHARMACIES_ROUTE } from '../../../../routes';

export const PatientMedicineCategories = () => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation(['patient', 'common']);
	const [searchParams] = useSearchParams();

	const [category, setCategory] = useState(searchParams.get('category') || '');
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [shouldRefetch, setShouldRefetch] = useState(false);

	const { medicineCategories, setMedicineCategories } = useMedicineCategoriesStore(
		(state) => state
	);

	const { data: medicineCategoriesResponse, isSuccess: gotCategories } =
		useGetMedicinesCategoriesQuery();
	const medicineTypes = medicineCategoriesResponse?.data?.medicineCategories || [];

	const { data, isFetching, refetch } = useGetPharmacyMedicinesQuery({
		category,
		search,
		id,
		page,
		limit: 8,
	});
	const { medicines, meta } = data?.data || {};

	const breadcrumbItems = [
		{ title: t('pharmacies', { ns: 'common' }), path: PHARMACIES_ROUTE },
		{ title: t('pharmacyDetails'), path: '' },
	];

	useEffect(() => {
		gotCategories && setMedicineCategories(medicineTypes);
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

	const handleCategoryChange = (id: string) => {
		setPage(1);
		setCategory(id);
		setShouldRefetch(true);
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		setShouldRefetch(true);
	};

	return (
		<section>
			<Breadcrumb items={breadcrumbItems} />

			<div className="mb-6 space-y-2">
				<div className="flex-between-center flex-wrap gap-3">
					<h3 className="font-semibold text-typography-700">{t('allCategories')}</h3>

					<div className="flex-items-center gap-2">
						<SearchInput onChange={handleSearch} />
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

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-10">
				{isFetching ? (
					<MedicineCardSkeleton count={8} />
				) : !!medicines?.length ? (
					medicines.map(({ name, strength, unit_price, medicine_image, id, dosage_form }) => (
						<div className="col-span-1" key={id}>
							<MedicineCard
								id={id}
								image={medicine_image}
								name={name}
								strength={strength}
								dosage={dosage_form}
								price={unit_price}
							/>
						</div>
					))
				) : (
					<div className="col-span-8 text-center h-55 flex-center">
						<p>{t('notFound', { text: t('medicines', { ns: 'common' }) })}</p>
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
