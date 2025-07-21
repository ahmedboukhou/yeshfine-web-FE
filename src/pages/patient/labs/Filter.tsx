import { useCallback, useEffect, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetLabTestsQuery } from '../../../apis/patient/labs';
import { CrossIcon, FilterIcon } from '../../../assets/icons';
import { Checkbox } from '../../../components/ui/actions/Checkbox';
import { Radio } from '../../../components/ui/actions/Radio';
import { Switch } from '../../../components/ui/actions/Switch';
import type { LabFilterType } from '../../../interfaces';
import { LocationEnum } from '../../../interfaces/enums';
import { useLabTestsStore } from '../../../store/labTests';

interface SearchDoctorFilterProps {
	filterValues: LabFilterType;
	setFilterValues: React.Dispatch<React.SetStateAction<LabFilterType>>;
	applyFilters: () => void;
	clearFilters: () => void;
	disabled: boolean;
}

const resultTimeOptions = [
	{ value: 'same_day', label: 'sameDay' },
	{ value: 'less_than_2', label: 'lessThan48Hours' },
	{ value: 'more_than_2', label: 'moreThan48Hours' },
];

export const SearchLabFilter: FC<SearchDoctorFilterProps> = ({
	filterValues,
	setFilterValues,
	applyFilters,
	clearFilters,
	disabled,
}) => {
	const { t } = useTranslation(['common', 'patient']);

	const [isOpen, setIsOpen] = useState(false);

	const { labTestsData, setLabTestsData } = useLabTestsStore((state) => state);

	const { data: labTestResponse, isSuccess } = useGetLabTestsQuery();
	const labTests = labTestResponse?.data?.labtests || [];

	useEffect(() => {
		isSuccess && labTests && setLabTestsData(labTests);
	}, [labTests, isSuccess]);

	const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);
	const closeModal = useCallback(() => setIsOpen(false), []);

	const handleCheckboxChange = useCallback(
		(id: number) => {
			setFilterValues((prev) => ({
				...prev,
				labTestList: prev.labTestList.some((spec) => spec.id === id)
					? prev.labTestList.filter((spec) => spec.id !== id)
					: [...prev.labTestList, labTestsData.find((spec) => spec.id === id)!].filter(Boolean),
			}));
		},
		[labTests, setFilterValues]
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

					<div className="py-8 px-5 flex flex-col gap-8 bg-primary-light border-y border-gray-200 max-h-90 overflow-auto">
						<div>
							<h4 className="text-typography-800 font-semibold">
								{t('testType', { ns: 'patient' })}
							</h4>
							<div className="flex flex-wrap gap-x-5 gap-y-4 max-h-40 overflow-y-auto mt-5">
								{labTestsData.map(({ id, name }) => {
									const isChecked = filterValues.labTestList.some((spec) => spec.id === id);
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

						<div>
							<h4 className="text-typography-800 font-semibold">
								{t('availability', { ns: 'patient' })}
							</h4>
							<div className="mt-3 flex-between-center gap-2">
								<p className="text-primary font-semibold">
									{t('onlyShowOpenLabs', { ns: 'patient' })}
								</p>
								<Switch
									checked={filterValues.showOpen}
									onChange={(checked) =>
										setFilterValues((prev) => ({
											...prev,
											showOpen: checked,
										}))
									}
								/>
							</div>
						</div>

						<div>
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

						<div>
							<h4 className="text-typography-800 font-semibold">{t('resultTime')}</h4>
							<div className="flex flex-wrap gap-x-5 gap-y-4 max-h-40 overflow-y-auto mt-5">
								{resultTimeOptions.map(({ value, label }) => (
									<Radio
										key={value}
										label={t(label, { ns: 'patient' })}
										value={value}
										checked={filterValues.resultTime === value}
										onChange={(val) =>
											setFilterValues((prev) => ({
												...prev,
												resultTime: val.target.value as any,
											}))
										}
									/>
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
