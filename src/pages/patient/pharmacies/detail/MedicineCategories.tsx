import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { useGetPharmacyMedicinesQuery } from '../../../../apis/patient/pharmacies';

export const PatientMedicineCategories = () => {
	const { id } = useParams<{ id: string }>();
	const [searchParams] = useSearchParams();
	const [category, setCategory] = useState('');
	const [search, setSearch] = useState('');

	useEffect(() => {
		const categoryParam = searchParams.get('category') || '';
		setCategory(categoryParam);
	}, [searchParams]);

	const { data } = useGetPharmacyMedicinesQuery({ category, search, id });
	console.log("🚀 ~ PatientMedicineCategories ~ data:", data)

	return <div>MedicineCategories</div>;
};
