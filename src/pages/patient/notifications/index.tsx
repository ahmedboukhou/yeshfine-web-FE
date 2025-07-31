import { useTranslation } from 'react-i18next';
import { NotificationTile } from '../../../components/ui/NotificationTile';
import {
	useGetPatientNotificationsQuery,
	useMarkAllAsReadNotificationMutation,
	useMarkAsReadNotificationMutation,
} from '../../../apis/patient/notifications';
import { useState } from 'react';
import { Pagination } from '../../../components/ui/Pagination';
import { NotificationCardSkeleton } from '../../../components/ui/skeletons/NotificationCardSkeleton';

export const PatientNotifications = () => {
	const { t } = useTranslation(['common', 'patient']);

	const [page, setPage] = useState(1);

	const { data, isFetching } = useGetPatientNotificationsQuery({ page, limit: 8 });
	const { meta, notifications } = data?.data || {};

	const { mutateAsync: markAsRead } = useMarkAsReadNotificationMutation();
	const { mutateAsync: markAllAsRead } = useMarkAllAsReadNotificationMutation();

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<section>
			<div className="mb-6 flex-between">
				<h3 className="font-semibold text-typography-700">{t('notifications')}</h3>
				<button className="link-text" onClick={()=>markAllAsRead()}>{t('readAll')}</button>
			</div>

			<div className="mb-10 space-y-2 card">
				{isFetching ? (
					<NotificationCardSkeleton count={8} />
				) : !!notifications?.length ? (
					notifications?.map(({ message, is_read, title, created_at, action_url,id }) => (
						<NotificationTile
							message={message}
							id={id}
							markAsRead={markAsRead}
							key={created_at}
							isRead={is_read}
							title={title}
							actionUrl={action_url}
							createdAt={created_at}
						/>
					))
				) : (
					<>no notifications</>
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
