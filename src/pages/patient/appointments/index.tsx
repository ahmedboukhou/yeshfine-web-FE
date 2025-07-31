import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAppointmentsQuery } from '../../../apis/patient/appointments';
import { Pagination } from '../../../components/ui/Pagination';
import { SearchInput } from '../../../components/ui/actions/SearchInput';
import { Tabs } from '../../../components/ui/actions/Tabs';
import { AppointmentCard } from '../../../components/ui/cards/AppointmentCard';
import { AppointmentCardSkeleton } from '../../../components/ui/skeletons/AppointmentCardSkeleton';
import { AppointmentFilterTypeEnum } from '../../../interfaces/enums';

export const PatientAppointments = () => {
	const { t } = useTranslation(['common', 'patient']);

	const [page, setPage] = useState(1);
	const [shouldRefetch, setShouldRefetch] = useState(false);
	const [search, setSearch] = useState('');
	const [type, setType] = useState(AppointmentFilterTypeEnum.Upcoming);
	const {
		data: getAppointmentsResponse,
		isFetching: loadingAppointments,
		refetch,
	} = useGetAppointmentsQuery({ page, limit: 6, search, type });
	const { items, meta } = getAppointmentsResponse?.data || {};

	const tabData = [
		{ label: t('upcoming'), value: AppointmentFilterTypeEnum.Upcoming },
		{ label: t('past'), value: AppointmentFilterTypeEnum.Past },
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
					disabled={loadingAppointments}
				/>
			</div>
			<div className="grid grid-cols-6 gap-5 mb-10">
				{loadingAppointments ? (
					<AppointmentCardSkeleton count={6} />
				) : !!items?.length ? (
					items?.map(
						(
							{
								doctor: { image, name, speciality, clinicName },
								appointment_date_formatted,
								time_range,
								appointment_type_label,
								distance,
								appointment_id,
								meeting_link,
							},
							index
						) => (
							<div key={index} className="col-span-6 md:col-span-3 xl:col-span-2">
								<AppointmentCard
									key={index}
									id={appointment_id}
									distance={distance}
									meeting_link={meeting_link}
									image={image}
									label={appointment_type_label}
									name={name}
									meetingButtonDisabled={type === AppointmentFilterTypeEnum.Past}
									specialty={speciality}
									clinicName={clinicName}
									appointmentDate={appointment_date_formatted}
									timeRange={time_range}
								/>
							</div>
						)
					)
				) : (
					<div className="col-span-6 my-4 flex-center">
						<p>{t('notFound', { ns: 'patient', text: t('pharmacies', { ns: 'common' }) })}</p>
					</div>
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
