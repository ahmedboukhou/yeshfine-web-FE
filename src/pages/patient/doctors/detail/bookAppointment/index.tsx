import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
	useBookAppointmentMutation,
	useGetDoctorAppointmentSlotQuery,
} from '../../../../../apis/patient/appointments';
import { Radio } from '../../../../../components/ui/actions/Radio';
import { Breadcrumb } from '../../../../../components/ui/Breadcrumb';
import { SelectSlot } from '../../../../../components/ui/SelectSlot';
import type { TimeSlot } from '../../../../../interfaces';
import { DOCTORS_DETAIL_ROUTE, DOCTORS_ROUTE, HOME_ROUTE } from '../../../../../routes';
import { VerifyBooking } from './VerifyBooking';

export const PatientDoctorBookAppointment = () => {
	const { t } = useTranslation(['patient', 'common']);
	const { id } = useParams<{ id: string }>();
	const { state } = useLocation();
	const navigate = useNavigate();

	const [date, setDate] = useState<Date>(new Date());
	const [appointmentType, setAppointmentType] = useState<string>('onsite');
	const [showVerifyScreen, setShowVerifyScreen] = useState(false);
	const [reason, setReason] = useState('');
	const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
	const { doctorDetailId } = state;
	const { mutateAsync: bookAppointment, isPending } = useBookAppointmentMutation();

	const breadcrumbItems = [
		{ title: t('doctors', { ns: 'common' }), path: DOCTORS_ROUTE },
		{ title: t('doctorDetails'), path: DOCTORS_DETAIL_ROUTE.replace(':id', id || '') },
		{ title: t('makeAppointment'), path: '' },
	];
	const appointmentTypes = [
		{ label: t('inPerson'), value: 'onsite' },
		{ label: t('videoCall'), value: 'virtual' },
	];

	const handleSave = () => {
		if (!showVerifyScreen) {
			setShowVerifyScreen(true);
		} else {
			selectedSlot &&
				id &&
				bookAppointment(
					{
						appointment_date: date,
						appointment_type: appointmentType,
						doctor_detail_id: doctorDetailId,
						doctor_id: Number(id),
						ticket_number: selectedSlot.selectedTicketNumber,
						start_time: selectedSlot.start,
						end_time: selectedSlot.end,
						reason,
					},
					{
						onSuccess: ({ message, status }) => {
							if (status) {
								toast.success(message);
								navigate(HOME_ROUTE);
							}
						},
					}
				);
			return;
		}
	};

	return (
		<section>
			<Breadcrumb items={breadcrumbItems} />
			<div className="mb-5 lg:mb-10">
				<h3 className="text-typography-800 font-bold">
					{showVerifyScreen ? t('verifyVisitDateTime') : t('selectVisitDateTime')}
				</h3>
				<h5 className="text-typography-600 font-medium">
					{showVerifyScreen ? t('updateDateTimeInfo') : t('chooseDateTimeInfo')}
				</h5>
			</div>
			<div className="card">
				{!showVerifyScreen ? (
					<Fragment>
						<SelectSlot
							date={date}
							setDate={setDate}
							selectedSlot={selectedSlot}
							setSelectedSlot={setSelectedSlot}
							useSlotsQuery={useGetDoctorAppointmentSlotQuery}
						/>

						<div className="border-t border-t-border-1 my-5 lg:my-10" />

						<div>
							<h4 className="text-typography-900 font-semibold mb-6">{t('typeOfAppointment')}</h4>
							<div className="flex gap-3 my-6">
								{appointmentTypes.map(({ label, value }) => (
									<Radio
										label={label}
										key={value}
										value={value}
										checked={appointmentType === value}
										onChange={(e) => setAppointmentType(e.target.value)}
									/>
								))}
							</div>
						</div>

						<div className="border-t border-t-border-1 my-5 lg:my-10" />

						<div className="mb-10">
							<h4 className="text-typography-900 font-semibold mb-6">{t('reasonForVisit')}</h4>

							<textarea
								className="py-2 px-3 sm:py-3 sm:px-4 bg-gray-200 block w-full border-border-1 rounded-lg sm:text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
								rows={3}
								value={reason}
								onChange={(e) => setReason(e.target.value)}
								placeholder={t('messageForDoctor')}
							></textarea>
						</div>
					</Fragment>
				) : (
					<VerifyBooking
						appointmentType={appointmentType}
						date={date}
						reason={reason}
						selectedSlot={selectedSlot}
					/>
				)}
				<div className="flex-end gap-5 mt-5">
					{showVerifyScreen ? (
						<button onClick={() => setShowVerifyScreen(false)} className="outlined-primary-btn">
							{t('back', { ns: 'common' })}
						</button>
					) : (
						<Link
							to={DOCTORS_DETAIL_ROUTE.replace(':id', `${id}`)}
							className="outlined-primary-btn"
						>
							{t('cancel', { ns: 'common' })}
						</Link>
					)}
					<button
						onClick={handleSave}
						className="primary-btn"
						disabled={!selectedSlot || isPending}
					>
						{showVerifyScreen ? t('bookAppointment') : t('bookNow', { ns: 'common' })}
					</button>
				</div>
			</div>
		</section>
	);
};
