import { useCallback, useEffect, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetDoctorSpecialtiesQuery } from '../../../apis/patient/doctors';
import { CrossIcon, FilterIcon } from '../../../assets/icons';
import type { DoctorSpecialtiesType } from '../../../interfaces';
import { useDoctorSpecialtiesStore } from '../../../store/doctorSpecialties';
import { Checkbox } from '../../../components/ui/actions/Checkbox';
import { LocationEnum } from '../../../interfaces/enums';

interface FilterValues {
	specializations: DoctorSpecialtiesType[];
	location: LocationEnum;
}

interface SearchDoctorFilterProps {
	filterValues: FilterValues;
	setFilterValues: React.Dispatch<React.SetStateAction<FilterValues>>;
	applyFilters: () => void;
	clearFilters: () => void;
	disabled: boolean;
}

export const SearchDoctorFilter: FC<SearchDoctorFilterProps> = ({
	filterValues,
	setFilterValues,
	applyFilters,
	clearFilters,
	disabled,
}) => {
	const { t } = useTranslation(['common', 'patient']);

	const [isOpen, setIsOpen] = useState(false);
	const { setSpecialties, specialties } = useDoctorSpecialtiesStore((state) => state);

	const { data, isSuccess } = useGetDoctorSpecialtiesQuery();
	const doctorSpecialties = data?.data?.doctorCategories || [];

	useEffect(() => {
		isSuccess && setSpecialties(doctorSpecialties);
	}, [doctorSpecialties, isSuccess]);

	const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);
	const closeModal = useCallback(() => setIsOpen(false), []);

	const handleCheckboxChange = useCallback(
		(id: number) => {
			setFilterValues((prev) => ({
				...prev,
				specializations: prev.specializations.some((spec) => spec.id === id)
					? prev.specializations.filter((spec) => spec.id !== id)
					: [...prev.specializations, specialties.find((spec) => spec.id === id)!].filter(Boolean),
			}));
		},
		[specialties, setFilterValues]
	);

	const handleLocationChange = useCallback(
		(location: LocationEnum) => {
			setFilterValues((prev) => ({ ...prev, location }));
		},
		[setFilterValues]
	);

	return (
		<div className="relative inline-block">
			<button
				type="button"
				disabled={disabled}
				onClick={toggleModal}
				className="primary-btn flex items-center gap-2.5 font-medium px-2.5"
			>
				<FilterIcon />
				{t('filters')}
			</button>

			{isOpen && (
				<div className="absolute z-50 mt-2 min-w-xs sm:min-w-sm md:min-w-md right-0 bg-white border border-gray-200 shadow-lg rounded-xl">
					<div className="flex justify-between items-center py-4 px-5">
						<h4 className="text-typography-800 font-semibold">{t('filters')}</h4>
						<button onClick={closeModal}>
							<CrossIcon />
						</button>
					</div>

					<div className="py-8 px-5 bg-primary-light border-y border-gray-200">
						<div>
							<h4 className="text-typography-800 font-semibold">
								{t('specializations', { ns: 'patient' })}
							</h4>
							<div className="flex flex-wrap gap-x-5 gap-y-4 max-h-40 overflow-y-auto mt-5">
								{specialties.map(({ id, name }) => {
									const isChecked = filterValues.specializations.some((spec) => spec.id === id);
									return (
										<Checkbox
											handleCheckbox={() => handleCheckboxChange(id)}
											id={id}
											key={id}
											isChecked={isChecked}
											name={name}
										/>
									);
								})}
							</div>
						</div>

						<div className="mt-8">
							<h4 className="text-typography-800 font-semibold">
								{t('locations', { ns: 'patient' })}
							</h4>
							<div className="grid grid-cols-3 gap-2 mt-2">
								{[
									{ label: t('nearMe', { ns: 'patient' }), value: LocationEnum.NearMe },
									{ label: t('myCity', { ns: 'patient' }), value: LocationEnum.City },
									{ label: t('all'), value: LocationEnum.All },
								].map(({ label, value }) => (
									<button
										key={value}
										type="button"
										onClick={() => handleLocationChange(value)}
										className={`!rounded-full w-full ${
											filterValues.location === value
												? 'primary-btn !font-semibold'
												: 'pagination-btn !font-normal'
										}`}
									>
										{label}
									</button>
								))}
							</div>
						</div>
					</div>

					<div className="flex-end py-4 px-5 gap-2">
						<button
							type="button"
							onClick={() => {
								closeModal();
								clearFilters();
							}}
							className="outlined-btn"
						>
							{t('clear')}
						</button>
						<button
							type="button"
							onClick={() => {
								applyFilters();
								closeModal();
							}}
							className="primary-btn"
						>
							{t('applyFilters')}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
