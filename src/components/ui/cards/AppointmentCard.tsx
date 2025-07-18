import type { FC } from 'react';
import { CalendarIcon } from '../../../assets/icons';
import { Rating } from '../Rating';
import { Badge } from '../Badge';

type AppointmentCardProps = {
	image: string;
	name: string;
	speciality: string;
	clinicName: string;
	appointmentDate: string;
	timeRange: string;
};

export const AppointmentCard: FC<AppointmentCardProps> = ({
	image,
	name,
	speciality,
	clinicName,
	appointmentDate,
	timeRange,
}) => {
	return (
		<div className="p-5 bg-white rounded-2xl border border-black/10 w-sm">
			<div className="flex gap-2.5 ">
				<img className="inline-block size-11 rounded-full" src={image} alt={name} />

				<div className="flex-1">
					<div className="flex-between-center">
						<h5 className="font-semibold text-typography-800">{name}</h5>
						<Rating rating={'4.8'} />
					</div>

					<span className="text-typography-500">
						{speciality} | {clinicName}
					</span>

					<div className="mt-2.5 flex-between-center">
						<div className="flex gap-1">
							<CalendarIcon />

							<span className="text-typography-800">{appointmentDate}</span>
						</div>

						<Badge specialty={timeRange} variant="primary" />
					</div>
				</div>
			</div>
		</div>
	);
};
