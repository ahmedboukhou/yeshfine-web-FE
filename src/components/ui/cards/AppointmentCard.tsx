import type { FC } from 'react';
import { CalendarIcon, LocationIcon } from '../../../assets/icons';
import { Rating } from '../Rating';
import { Badge } from '../Badge';
import { Distance } from '../Distance';

type AppointmentCardProps = {
	image: string;
	name: string;
	specialty: string;
	clinicName: string;
	appointmentDate: string;
	timeRange: string;
};

export const AppointmentCard: FC<AppointmentCardProps> = ({
	image,
	name,
	specialty,
	clinicName,
	appointmentDate,
	timeRange,
}) => {
	return (
		<div className={`p-5 bg-white rounded-2xl border border-black/10 h-40`}>
			<div className="flex gap-2.5 ">
				<img className="inline-block size-11 rounded-full" src={image} alt={name} />

				<div className="flex-1 flex flex-col flex-between space-y-1">
					<div className="flex-between-center">
						<h5 className="font-semibold text-typography-800">{name}</h5>
						<Rating rating={'4.8'} />
					</div>

					<Badge specialty={specialty} />
					<div className="flex-between-center">
						<div className="flex-items-center gap-1">
							<div>
								<LocationIcon />
							</div>
							<span className="text-typography-700 line-clamp-1">{clinicName}</span>
						</div>

						<Distance distance={9} />
					</div>
					<div className="flex-between-center mt-3">
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
