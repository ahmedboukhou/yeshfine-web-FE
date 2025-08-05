import { useTranslation } from 'react-i18next';
import {
	useGetDoctorSummaryQuery,
	useGetDoctorUpcomingAppointmentsQuery,
} from '../../../apis/doctor/home';
import { AppointmentIcon, RevenueIcon } from '../../../assets/icons';
import { DashboardCard } from '../../../components/ui/cards/DashboardCard';
import { SummaryCard } from '../../../components/ui/cards/SummaryCard';
import { BarChart } from '../../../components/ui/charts/BarChart';
import { AppointmentCard } from '../../../components/ui/cards/AppointmentCard';
import { NotFoundCard } from '../../../components/ui/cards/NotFoundCard';
import { AppointmentCardSkeleton } from '../../../components/ui/skeletons/AppointmentCardSkeleton';

export const DoctorHome = () => {
	const { t } = useTranslation(['doctor', 'patient']);
	const { data, isFetching } = useGetDoctorSummaryQuery();
	const { appointmentsThisWeek, summary, totalRevenue, weekOverWeekChange } = data?.data || {};
	const { data: upcomingAppointmentResponse, isFetching: gettingAppointments } =
		useGetDoctorUpcomingAppointmentsQuery();
	const { appointments } = upcomingAppointmentResponse || {};

	return (
		<section className="space-y-8">
			<DashboardCard />

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<SummaryCard
					title={`MRU ${totalRevenue || 0}`}
					description={t('totalRevenue')}
					icon={<RevenueIcon />}
					isLoading={isFetching}
				/>
				<SummaryCard
					title={`${appointmentsThisWeek || 0}`}
					description={t('appointmentsThisWeek')}
					icon={<AppointmentIcon />}
					isLoading={isFetching}
				/>
			</div>

			<div className="space-y-5">
				<h3 className="text-typography-700 font-semibold">{t('patientsSummary')}</h3>
				{isFetching ? (
					<div className="animate-pulse">
						{/* Image */}
						<div className="h-72 w-full bg-gray-300 rounded-2xl" />
					</div>
				) : (
					<BarChart weekOverWeekChange={weekOverWeekChange} summary={summary} />
				)}
			</div>

			<div className="space-y-5">
				<h3 className="text-typography-700 font-semibold">
					{t('upcomingAppointments', { ns: 'patient' })}
				</h3>

				<div className="grid grid-cols-6 gap-5">
					{gettingAppointments ? (
						<AppointmentCardSkeleton />
					) : !!appointments?.length ? (
						appointments?.map(
							( 
								{
									patient_image,
									start_time,
									appointment_date,
									patient_name,
									type,
									end_time,
									appointment_id,
									meeting_link,
								},
								index
							) => (
								<div key={index} className="col-span-6 md:col-span-3 xl:col-span-2">
									<AppointmentCard
										id={appointment_id}
										image={patient_image}
										name={patient_name}
										label={type}
										meeting_link={meeting_link}
										appointmentDate={appointment_date}
										timeRange={`${start_time} - ${end_time}`}
									/>
								</div>
							)
						)
					) : (
						<div className="col-span-6">
							<NotFoundCard
								icon={<AppointmentIcon />}
								heading={t('noAppointmentYet', { ns: 'patient' })}
								subHeading={t('bookWhenReady', { ns: 'patient' })}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};
