import dayjs from 'dayjs';
import GoogleMapReact from 'google-map-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { RedHospitalIcon } from '../../../../../assets/icons';
import calendarIcon from '../../../../../assets/icons/menu-board.svg';
import { Badge } from '../../../../../components/ui/Badge';
import { ReviewRating } from '../../../../../components/ui/ReviewRating';

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
		<section className="flex flex-col gap-8">
			<div className="border border-border-1 card-gradient rounded-lg">
				<div className="p-4 flex gap-5">
					<img className="inline-block size-22 rounded-lg" src={image} alt={name} />
					<div className="flex-1 flex-col gap-3">
						<div className="flex-items-center gap-2">
							<span className="text-typography-500">{t('rating')}</span>
							<ReviewRating rating={averageRating} />
							<span className="text-typography-500">{averageRating}</span>
						</div>
						<p className="font-bold text-typography-900">{name}</p>
						<div className="mt-2">
							<Badge specialty={specialty} />
						</div>
					</div>
				</div>
			</div>

			<div>
				<h5 className="!text-typography-700">{t('workLocation')}</h5>
				<p className="text-typography-500 mt-1">{clinicName}</p>

				<div className="h-60 mt-5">
					{latitude && longitude && (
						<GoogleMapReact
							bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAP_API_KEY }}
							defaultCenter={{
								lat: latitude,
								lng: longitude,
							}}
							defaultZoom={11}
						/>
					)}
				</div>
			</div>

			<div className="p-4 card-box-shadow rounded-lg">
				<div className="flex-between-center mb-5">
					<h5 className="!text-typography-800">{t('scheduleDate')}</h5>
				</div>
				<div className="flex gap-5">
					<div className="bg-blue-100 p-2 rounded-lg">
						<img src={calendarIcon} />
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
				<h5 className="!text-typography-800 mb-5">{t('typeOfAppointment')}</h5>
				<div className="flex-items-center gap-5">
					<RedHospitalIcon size="50" />
					<p className="font-bold capitalize">{appointmentType}</p>
				</div>
			</div>

			<div className="p-4 card-box-shadow rounded-lg">
				<h5 className="!text-typography-800 mb-5">{t('reasonForVisit')}</h5>
				<p className="text-typography-600">{reason || '--'}</p>
			</div>
		</section>
	);
};
