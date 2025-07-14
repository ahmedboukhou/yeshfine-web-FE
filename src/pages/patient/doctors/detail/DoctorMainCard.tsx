import { useTranslation } from 'react-i18next';
import { BookAppointmentIcon } from '../../../../assets/icons';
import { Rating } from '../../../../components/ui/Rating';
import type { FC } from 'react';
import { Badge } from '../../../../components/ui/Badge';
import { Link } from 'react-router';
import { DOCTOR_BOOK_APPOINTMENT_ROUTE } from '../../../../routes';

type DoctorTypeCardProps = {
	id?: string;
	name?: string;
	averageRating?: string;
	image?: string;
	specialty?: string;
	clinicName?: string;
	latitude?: number;
	longitude?: number;
};
export const DoctorMainCard: FC<DoctorTypeCardProps> = ({
	name,
	averageRating,
	image,
	id,
	specialty,
	clinicName,
	latitude,
	longitude,
}) => {
	const { t } = useTranslation(['patient']);

	return (
		<div className="relative bg-white rounded-2xl border border-border-1 min-h-44 overflow-hidden">
			<div className="hidden md:block absolute left-0 top-0 h-full md:w-20 xl:w-40 bg-[linear-gradient(111deg,#1298BC_-37.21%,#88D702_115.79%)] rounded-l-2xl" />

			<div className="flex flex-col md:flex-row md:p-6 gap-2 p-3 relative z-10">
				<div className="flex-center xl:ms-19">
					<img
						src={image}
						alt={name}
						className="h-30 w-30 rounded-full object-cover border-4 border-white"
					/>
				</div>
				<div className="flex-1 flex flex-col items-center justify-center text-center md:justify-between md:flex-row md:text-left gap-3">
					<div>
						<div className="flex gap-3 mb-1">
							<h3 className="text-typography-900">{name}</h3>
							<Rating rating={averageRating} />
						</div>
						<Badge specialty={specialty} />
					</div>
					<Link
						className="primary-btn w-full md:w-auto flex-center gap-2"
						to={{
							pathname: DOCTOR_BOOK_APPOINTMENT_ROUTE.replace(':id', `${id}`),
						}}
						state={{
							id,
							name,
							image,
							clinicName,
							averageRating,
							specialty,
							latitude,
							longitude,
						}}
					>
						<BookAppointmentIcon />
						{t('bookAppointment')}
					</Link>
				</div>
			</div>
		</div>
	);
};
