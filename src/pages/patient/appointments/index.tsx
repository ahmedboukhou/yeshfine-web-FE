import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAppointmentsQuery } from '../../../apis/patient/appointments';
import { Pagination } from '../../../components/ui/Pagination';
import { SearchInput } from '../../../components/ui/actions/SearchInput';
import { Tabs } from '../../../components/ui/actions/Tabs';
import { AppointmentCard } from '../../../components/ui/cards/AppointmentCard';
import { AppointmentCardSkeleton } from '../../../components/ui/skeletons/AppointmentCardSkeleton';
import { AppointmentTypeEnum } from '../../../interfaces/enums';

export const PatientAppointments = () => {
	const { t } = useTranslation();

	const [page, setPage] = useState(1);
	const [shouldRefetch, setShouldRefetch] = useState(false);
	const [search, setSearch] = useState('');
	const [type, setType] = useState(AppointmentTypeEnum.Upcoming);
	const {
		data: getAppointmentsResponse,
		isFetching: loadingAppointments,
		refetch,
	} = useGetAppointmentsQuery({ page, limit: 6, search, type });
	const { items, meta } = getAppointmentsResponse?.data || {};

	const tabData = [
		{ label: 'Upcoming', value: AppointmentTypeEnum.Upcoming },
		{ label: 'Past', value: AppointmentTypeEnum.Past },
	];

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

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		setShouldRefetch(true);
	};

	return (
		<section>
			<div className="flex-between-center flex-wrap gap-3 mb-5 space-y-2">
				<h3 className="font-semibold text-typography-700">{t('appointments')}</h3>

				<SearchInput onChange={handleSearch} />
			</div>

			<div className="max-w-xs">
				<Tabs
					tabs={tabData.map((tab) => ({
						label: tab.label,
						content: null, // no need for duplicate content
					}))}
					defaultIndex={tabData.findIndex((tab) => tab.value === type)}
					onChange={(index) => {
						setType(tabData[index].value);
						setPage(1);
						setShouldRefetch(true);
					}}
				/>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 overflow-auto">
				{loadingAppointments ? (
					<AppointmentCardSkeleton />
				) : !!items?.length ? (
					items?.map(
						(
							{
								doctor: { image, name, speciality, clinicName },
								appointment_date_formatted,
								time_range,
							},
							index
						) => (
							<AppointmentCard
								key={index}
								image={image}
								name={name}
								specialty={speciality}
								clinicName={clinicName}
								appointmentDate={appointment_date_formatted}
								timeRange={time_range}
							/>
						)
					)
				) : (
					<p>asd</p>
				)}
			</div>

			<Pagination
				currentPage={page}
				totalPages={meta?.totalPages || 1}
				onPageChange={handlePageChange}
				isLoading={loadingAppointments}
			/>
		</section>
	);
};
