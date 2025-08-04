import { useTranslation } from 'react-i18next';
import { AppointmentIcon, BookAppointmentIcon, RevenueIcon } from '../../../assets/icons';
import { DashboardCard } from '../../../components/ui/cards/DashboardCard';
import { SummaryCard } from '../../../components/ui/cards/SummaryCard';
import { BarChart } from '../../../components/ui/charts/BarChart';

export const DoctorHome = () => {
	const { t } = useTranslation(['doctor', 'patient']);
	return (
		<section className="space-y-8">
			<DashboardCard />

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<SummaryCard title="MRU 19,000" description={t('totalRevenue')} icon={<RevenueIcon />} />
				<SummaryCard
					title="16"
					description={t('appointmentsThisWeek')}
					icon={<AppointmentIcon />}
				/>
			</div>

			<div className="space-y-5">
				<h3 className="text-typography-700 font-semibold">{t('patientsSummary')}</h3>
				<BarChart />
			</div>

			<div className="space-y-5">
				<h3 className="text-typography-700 font-semibold">
					{t('upcomingAppointments', { ns: 'patient' })}
				</h3>
			</div>
		</section>
	);
};
