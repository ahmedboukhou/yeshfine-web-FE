import dayjs from 'dayjs';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { RedHospitalIcon } from '../../../../../assets/icons';
import calendarIcon from '../../../../../assets/icons/menu-board.svg';
import { Badge } from '../../../../../components/ui/Badge';
import { GoogleMap } from '../../../../../components/ui/GoogleMap';
import { DoctorInfoCard } from '../../../../../components/ui/cards/DoctorInfoCard';
import { LocationInfo } from '../../../../../components/ui/LocationInfo';

type VerifyBookingProps = {
	appointmentType?: string;
	date?: Date;
	reason?: string;
	selectedSlot: {
		start: string;
		end: string;
	} | null;
};

export const VerifyBooking: FC<VerifyBookingProps> = ({
	appointmentType,
	date,
	reason,
	selectedSlot,
}) => {
	const { t } = useTranslation(['patient', 'common']);
	const { state } = useLocation();
	const { name, image, clinicName, averageRating, specialty, latitude, longitude } = state;

	return (
		<section className="space-y-8">
			<DoctorInfoCard
				averageRating={averageRating}
				name={name}
				image={image}
				specialty={specialty}
			/>
			<div>
				<LocationInfo address={clinicName} />
				<div className="h-60 mt-5">
					<GoogleMap latitude={latitude} longitude={longitude} />
				</div>
			</div>

			<div className="p-4 card-box-shadow rounded-lg">
				<div className="flex-between-center mb-5">
					<h5 className="font-semibold text-typography-800">{t('scheduleDate')}</h5>
				</div>
				<div className="flex gap-5">
					<div>
						<img src={calendarIcon} className="min-w-12 bg-blue-100 p-2 rounded-lg" />
					</div>
					<div className="flex-1">
						<span className="text-typography-500">{t('appointment', { ns: 'common' })}</span>
						<div className="flex gap-2">
							<p className="font-bold">{`${dayjs(date).format('ddd, DD MMM YYYY')}`}</p>
							<Badge
								variant="primary"
								specialty={`${selectedSlot?.start} - ${selectedSlot?.end}`}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="p-4 card-box-shadow rounded-lg">
				<h5 className="font-semibold text-typography-800 mb-5">{t('typeOfAppointment')}</h5>
				<div className="flex-items-center gap-5">
					<RedHospitalIcon size="50" />
					<p className="font-bold capitalize">{appointmentType}</p>
				</div>
			</div>

			<div className="p-4 card-box-shadow rounded-lg">
				<h5 className="font-semibold text-typography-800 mb-5">{t('reasonForVisit')}</h5>
				<p className="text-typography-600">{reason || '--'}</p>
			</div>
		</section>
	);
};
