import dayjs from 'dayjs';
import { CalendarIcon } from '../../../assets/icons';
import { useCurrentUserStore } from '../../../store/user';
import { useTranslation } from 'react-i18next';

export const DashboardCard = () => {
	const { t } = useTranslation(['doctor', 'common']);
	const { currentUser } = useCurrentUserStore((state) => state);
	return (
		<div className="bg-[#88D702] p-5 rounded-2xl">
			<div className="bg-[linear-gradient(111deg,#1298BC_-37.21%,#88D702_115.79%)] space-y-2.5 rounded-2xl p-8">
				<div className="flex-items-center gap-2">
					<CalendarIcon />
					<small>{dayjs().format('MMM DD, YYYY')}</small>
				</div>

				<h1 className="text-typography-800 font-semibold">
					{t('welcomeDoctor', { ns: 'common', name: currentUser?.name })}
				</h1>
				<h4 className="text-typography-800 font-medium">{t('dashboardIntro')}</h4>
			</div>
		</div>
	);
};
