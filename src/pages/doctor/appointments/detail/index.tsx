import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useGetDoctorAppointmentDetailQuery } from '../../../../apis/doctor/appointments';
import { useMarkAsCompleteAppointmentMutation } from '../../../../apis/patient/appointments';
import { RedHospitalIcon, VideoIcon, VirtualIcon } from '../../../../assets/icons';
import calendarIcon from '../../../../assets/icons/menu-board.svg';
import { Badge } from '../../../../components/ui/Badge';
import { Breadcrumb } from '../../../../components/ui/Breadcrumb';
import { PatientInfoCard } from '../../../../components/ui/cards/PatientInfoCard';
import { GoogleMap } from '../../../../components/ui/GoogleMap';
import { LocationInfo } from '../../../../components/ui/LocationInfo';
import { AppointmentDetailsSkeleton } from '../../../../components/ui/skeletons/AppointmentDetailSkeleton';
import { PLACEHOLDER_IMAGE } from '../../../../constants';
import { APPOINTMENTS_ROUTE } from '../../../../routes';

export const DoctorAppointmentDetails = () => {
	const { t } = useTranslation(['patient', 'common']);
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { data, isLoading } = useGetDoctorAppointmentDetailQuery({ id });
	const {
		appointment_date,
		appointment_type,
		meeting_link,
		reason,
		show_mark_complete,
		ticket_number,
		doctor,
		patient,
		start_time,
		end_time,
	} = data?.data?.appointment || {};

	const { name, image, dob, gender, phone } = patient || {};
	const { mutateAsync: markAsComplete, isPending } = useMarkAsCompleteAppointmentMutation();
	const { address, latitude, longitude } = doctor || {};
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
					<PatientInfoCard
						dob={dob}
						gender={gender}
						phone={phone}
						name={name}
						image={image ?? PLACEHOLDER_IMAGE}
					/>
					{appointment_type === 'In Person' && (
						<>
							<LocationInfo address={address} />

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
							{appointment_type === 'In Person' && meeting_link && (
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
									<Badge
										variant="primary"
										specialty={`${start_time} - ${end_time} (#${ticket_number})`}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="p-4 card-box-shadow rounded-lg">
						<h5 className="font-semibold text-typography-800 mb-5">{t('typeOfAppointment')}</h5>
						<div className="flex-items-center gap-5">
							{appointment_type === 'In Person' ? <RedHospitalIcon size="50" /> : <VirtualIcon />}
							<Badge
								specialty={appointment_type}
								variant={appointment_type === 'In Person' ? 'danger' : 'blue'}
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
