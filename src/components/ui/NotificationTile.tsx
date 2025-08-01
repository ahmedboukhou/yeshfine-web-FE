import type { FC } from 'react';
import { Link } from 'react-router';
import { NotificationBellIcon } from '../../assets/icons';
import { getRelativeTimeString } from '../../lib/dayjs';

type NotificationTileProps = {
	message: string;
	id: number;
	isRead: boolean;
	title: string;
	createdAt: string;
	actionUrl: string;
	markAsRead: any;
};
export const NotificationTile: FC<NotificationTileProps> = ({
	message,
	title,
	id,
	isRead,
	createdAt,
	actionUrl,
	markAsRead,
}) => {
	const handleMarkAsRead = () => {
		if (!isRead) {
			markAsRead({ id });
		}
	};
	return (
		<Link
			to={actionUrl}
			onClick={handleMarkAsRead}
			className={`rounded-2xl cursor-pointer ${
				isRead ? 'bg-white' : 'bg-primary-light-hover'
			} border border-border-1 p-4 flex-items-center gap-4`}
		>
			<div className="card-box-shadow-2 size-12 rounded-full flex-center shrink-0">
				<NotificationBellIcon />
			</div>

			<div className="flex-1">
				<div className="flex flex-col">
					<div className="flex-between">
						<span className="font-semibold text-typography-700">{title}</span>
						<small className="font-semibold text-typography-500">
							{getRelativeTimeString(createdAt)}
						</small>
					</div>
					<small className="font-semibold text-typography-700">{message}</small>
				</div>
			</div>
		</Link>
	);
};
