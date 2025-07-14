import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';
import { Breadcrumb } from '../../../../../components/ui/Breadcrumb';
import { SelectSlot } from '../../../../../components/ui/SelectSlot';
import { DOCTORS_DETAIL_ROUTE, DOCTORS_ROUTE } from '../../../../../routes';
import { VerifyBooking } from './VerifyBooking';

export const PatientDoctorBookAppointment = () => {
	const { t } = useTranslation(['patient', 'common']);
	const { id } = useParams<{ id: string }>();

	const [date, setDate] = useState<Date>(new Date());
	const [appointmentType, setAppointmentType] = useState<string>('onsite');
	const [showVerifyScreen, setShowVerifyScreen] = useState(false);
	const [reason, setReason] = useState('');
	const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null);

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
						/>

						<div className="border-t border-t-border-1 my-5 lg:my-10" />

						<div>
							<h4 className="text-typography-900 font-semibold mb-6">{t('typeOfAppointment')}</h4>
							<div className="my-6">
								<div className="flex gap-3">
									{appointmentTypes.map((type) => (
										<div className="flex items-center " key={type.value}>
											<input
												type="radio"
												id={`appointment-type-${type.value}`}
												name="appointment-type"
												value={type.value}
												checked={appointmentType === type.value}
												onChange={(e) => setAppointmentType(e.target.value)}
												className="shrink-0 mt-0.5 border-gray-200 rounded-full cursor-pointer text-primary focus:ring-0 checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
											/>
											<label
												htmlFor={`appointment-type-${type.value}`}
												className="text-sm text-gray-600 ms-2  cursor-pointer"
											>
												{type.label}
											</label>
										</div>
									))}
								</div>
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
				<div className="flex-end gap-5">
					<Link to={DOCTORS_DETAIL_ROUTE.replace(':id', `${id}`)} className="outlined-primary-btn">
						{t('cancel', { ns: 'common' })}
					</Link>
					<button onClick={handleSave} className="primary-btn">
						{showVerifyScreen ? t('proceedPayment') : t('bookNow')}
					</button>
				</div>
			</div>
		</section>
	);
};
