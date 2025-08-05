import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
	useGetPatientAppointmentDetailQuery,
	useMarkAsCompleteAppointmentMutation,
} from '../../../../apis/patient/appointments';
import { RedHospitalIcon, VideoIcon, VirtualIcon } from '../../../../assets/icons';
import calendarIcon from '../../../../assets/icons/menu-board.svg';
import { Badge } from '../../../../components/ui/Badge';
import { Breadcrumb } from '../../../../components/ui/Breadcrumb';
import { DoctorInfoCard } from '../../../../components/ui/cards/DoctorInfoCard';
import { GoogleMap } from '../../../../components/ui/GoogleMap';
import { LocationInfo } from '../../../../components/ui/LocationInfo';
import { AppointmentDetailsSkeleton } from '../../../../components/ui/skeletons/AppointmentDetailSkeleton';
import { AppointmentTypeEnum } from '../../../../interfaces/enums';
import { APPOINTMENTS_ROUTE } from '../../../../routes';

export const PatientAppointmentDetails = () => {
	const { t } = useTranslation(['patient', 'common']);
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { data, isLoading } = useGetPatientAppointmentDetailQuery({ id });
	const {
		appointment_date,
		appointment_type,
		appointment_type_label,
		meeting_link,
		reason,
		show_mark_complete,
		ticket_number,
		time_range,
		doctor,
		doctorDetail,
	} = data?.data || {};

	const { name, image, latitude, longitude } = doctor || {};
	const { average_rating, clinicName, speciality } = doctorDetail || {};
	const { mutateAsync: markAsComplete, isPending } = useMarkAsCompleteAppointmentMutation();

	const breadcrumbItems = [
		{ title: t('appointments', { ns: 'common' }), path: APPOINTMENTS_ROUTE },
		{ title: t('details', { ns: 'common' }), path: '' },
	];

	const handleMarkCompleted = () => {
		markAsComplete(
			{ id },
			{
				onSuccess: ({ message }) => {
					toast.success(message);
					navigate(APPOINTMENTS_ROUTE);
				},
			}
		);
	};

	return (
		<section>
			<Breadcrumb items={breadcrumbItems} />
			{isLoading ? (
				<AppointmentDetailsSkeleton />
			) : (
				<div className="space-y-8 card">
					<DoctorInfoCard
						averageRating={average_rating || 0}
						name={name}
						image={image}
						specialty={speciality}
					/>
					{appointment_type === AppointmentTypeEnum.Onsite && (
						<>
							<LocationInfo address={clinicName} />

							<div className="h-60 mt-5">
								<GoogleMap latitude={latitude} longitude={longitude} />
							</div>
						</>
					)}

					<div className="p-4 card-box-shadow rounded-lg">
						<div className="flex-between-center mb-5">
							<h5 className="font-semibold text-typography-800">{t('scheduleDate')}</h5>
							{show_mark_complete && (
								<button disabled={isPending} onClick={handleMarkCompleted} className="primary-btn">
									{t('markAsComplete', { ns: 'common' })}
								</button>
							)}
							{appointment_type === AppointmentTypeEnum.Virtual && meeting_link && (
								<button
									onClick={() => {
										window.open(meeting_link);
									}}
									className="primary-btn flex-center gap-2"
								>
									<VideoIcon />

									{t('join', { ns: 'common' })}
								</button>
							)}
						</div>
						<div className="flex gap-5">
							<div>
								<img src={calendarIcon} className="min-w-12 bg-blue-100 p-2 rounded-lg" />
							</div>
							<div className="flex-1">
								<span className="text-typography-500">{t('appointment', { ns: 'common' })}</span>
								<div className="flex gap-2 flex-wrap">
									<p className="font-bold text-typography-900">{`${dayjs(appointment_date).format(
										'ddd, DD MMM YYYY'
									)}`}</p>
									<Badge variant="primary" specialty={`${time_range} (#${ticket_number})`} />
								</div>
							</div>
						</div>
					</div>

					<div className="p-4 card-box-shadow rounded-lg">
						<h5 className="font-semibold text-typography-800 mb-5">{t('typeOfAppointment')}</h5>
						<div className="flex-items-center gap-5">
							{appointment_type === AppointmentTypeEnum.Onsite ? (
								<RedHospitalIcon size="50" />
							) : (
								<VirtualIcon />
							)}
							<Badge
								specialty={appointment_type_label}
								variant={appointment_type === AppointmentTypeEnum.Onsite ? 'danger' : 'blue'}
							/>
						</div>
					</div>

					<div className="p-4 card-box-shadow rounded-lg">
						<h5 className="font-semibold text-typography-800 mb-5">{t('reasonForVisit')}</h5>
						<p className="text-typography-600">{reason || '--'}</p>
					</div>
				</div>
			)}
		</section>
	);
};
