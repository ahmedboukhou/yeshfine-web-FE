import type { FC } from 'react';
import { CalendarIcon, LocationIcon, VideoIcon } from '../../../assets/icons';
import { Badge } from '../Badge';
import { Distance } from '../Distance';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { APPOINTMENTS_DETAIL_ROUTE } from '../../../routes';

type AppointmentCardProps = {
	image: string;
	id: number;
	name: string;
	distance: number | null;
	meeting_link: string | null;
	specialty: string;
	clinicName: string;
	appointmentDate: string;
	timeRange: string;
	label: string;
};

export const AppointmentCard: FC<AppointmentCardProps> = ({
	image,
	name,
	specialty,
	clinicName,
	appointmentDate,
	timeRange,
	label,
	distance,
	meeting_link,
	id,
}) => {
	const { t } = useTranslation();
	const isInPerson = label === 'In Person';

	return (
		<Link to={APPOINTMENTS_DETAIL_ROUTE.replace(':id', `${id}`)}>
			<div className={`p-4 bg-white rounded-2xl border border-black/10 h-45 space-y-1`}>
				<div className="flex gap-2.5 ">
					<img className="inline-block size-15 rounded-full" src={image} alt={name} />

					<div className="flex-1 flex flex-col gap-1">
						<div className="flex-between-center">
							<h5 className="font-semibold text-typography-800 line-clamp-1">{name}</h5>
							<Badge specialty={label} variant={isInPerson ? 'danger' : 'blue'} />
						</div>

						{isInPerson ? (
							<Badge specialty={specialty} variant={'primary'} />
						) : (
							<span className="text-typography-700 capitalize line-clamp-1">
								{specialty} | {clinicName}
							</span>
						)}
					</div>
				</div>

				<div className="flex-between flex-col gap-2 mt-2">
					<div className="">
						{isInPerson ? (
							<div className="flex-between-center">
								<div className="flex-items-center gap-1">
									<div>
										<LocationIcon />
									</div>
									<span className="text-typography-700 line-clamp-1">{clinicName}</span>
								</div>

								<Distance distance={distance} />
							</div>
						) : (
							<div className="flex-between-center">
								<div className="flex gap-1">
									<CalendarIcon />

									<span className="text-typography-800">{appointmentDate}</span>
								</div>

								<Badge specialty={timeRange} variant="primary" />
							</div>
						)}
					</div>

					<div>
						{isInPerson ? (
							<div className="flex-between-center mt-4">
								<div className="flex gap-1">
									<CalendarIcon />

									<span className="text-typography-800">{appointmentDate}</span>
								</div>

								<Badge specialty={timeRange} variant="primary" />
							</div>
						) : (
							<div>
								{meeting_link && (
									<button
										className="primary-btn w-full flex-center gap-2"
										onClick={() => window.open(meeting_link)}
									>
										<VideoIcon />
										{t('join')}
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
};
