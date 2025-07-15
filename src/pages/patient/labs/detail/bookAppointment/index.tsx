import { useState } from 'react';
import type { FileWithPath } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useGetLabAppointmentSlotQuery } from '../../../../../apis/patient/labs';
import { ClockIcon } from '../../../../../assets/icons';
import { Breadcrumb } from '../../../../../components/ui/Breadcrumb';
import { DropZone } from '../../../../../components/ui/Dropzone';
import { SelectSlot } from '../../../../../components/ui/SelectSlot';
import { LABS_DETAIL_ROUTE, LABS_ROUTE } from '../../../../../routes';

export const PatientLabBookAppointment = () => {
	const { t } = useTranslation(['patient', 'common']);
	const { id } = useParams<{ id: string }>();
	const { state } = useLocation();
	const navigate = useNavigate();

	const [step, setStep] = useState(1);
	const [date, setDate] = useState<Date>(new Date());
	const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]);

	const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null);

	const [reason, setReason] = useState('');

	const breadcrumbItems = [
		{ title: t('labs', { ns: 'common' }), path: LABS_ROUTE },
		{ title: t('labDetails'), path: LABS_DETAIL_ROUTE.replace(':id', `${id}`) },
		{ title: t('makeAppointment'), path: '' },
	];
	const { name, price, description, result_time, pre_test_instructions, requires_prescription } =
		state;

	const heading = () => {
		switch (step) {
			case 1:
				return 'selectVisitDateTime';
			case 2:
				return 'uploadPrescription';
			case 3:
				return 'verifyVisitDateTime';
			default:
				return '';
		}
	};

	const subHeading = () => {
		switch (step) {
			case 1:
				return 'chooseDateTimeInfo';
			case 2:
				return 'prescriptionRequirementInfo';
			case 3:
				return 'updateDateTimeInfo';
			default:
				return '';
		}
	};

	const handleSave = () => {
		if (step <= 2) {
			setStep(requires_prescription ? step + 1 : step + 2);
		} else {
			return;
		}
	};

	const handleCancel = () => {
		if (step > 1) {
			setStep(requires_prescription ? step - 1 : step - 2);
		} else {
			navigate(LABS_DETAIL_ROUTE.replace(':id', `${id}`));
		}
	};

	return (
		<section>
			<Breadcrumb items={breadcrumbItems} />
			<div className="mb-5 lg:mb-10">
				<h3 className="text-typography-800 font-bold">{t(heading())}</h3>
				<h5 className="text-typography-600 font-medium">{t(subHeading())}</h5>
			</div>

			<div className="card">
				{step === 1 && (
					<div className="flex flex-col gap-5 md:gap-10">
						<div className="card-gradient-2 card-box-shadow p-4 rounded-lg">
							<div className="mb-5">
								<h5 className="font-bold">{name}</h5>
								<span className="!text-xs text-typography-600">{description}</span>
							</div>

							<div className="mb-4 flex flex-col gap-3">
								<div className="flex-items-center gap-1">
									<ClockIcon />

									<span className="text-typography-500 font-semibold !text-xs">
										{t('resultTime', { ns: 'common' })}{' '}
										<span className="font-bold !text-xs">{result_time}</span>
									</span>
								</div>

								<span className="text-typography-500 font-semibold !text-xs">
									{t('requiresPrescription')}
									<span className="font-bold !text-xs">
										{' '}
										{requires_prescription ? t('yes', { ns: 'common' }) : t('no', { ns: 'common' })}
									</span>
								</span>

								<span className="text-typography-500 font-semibold !text-xs">
									{t('preTestInstructions')}{' '}
									<span className="font-bold !text-xs">{pre_test_instructions}</span>
								</span>
							</div>

							<div className="flex-between-center">
								<p className="font-semibold">{t('price')}</p>
								<span className="text-primary font-semibold">MRU {price}</span>
							</div>
						</div>

						<SelectSlot
							date={date}
							setDate={setDate}
							selectedSlot={selectedSlot}
							setSelectedSlot={setSelectedSlot}
							useSlotsQuery={useGetLabAppointmentSlotQuery}
						/>

						<div className="border-t border-t-border-1" />

						<div>
							<h4 className="text-typography-900 font-semibold mb-6">{t('reasonForVisit')}</h4>

							<textarea
								className="py-2 px-3 sm:py-3 sm:px-4 bg-gray-200 block w-full border-border-1 rounded-lg sm:text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
								rows={3}
								value={reason}
								onChange={(e) => setReason(e.target.value)}
								placeholder={t('messageForDoctor')}
							/>
						</div>
					</div>
				)}

				{step === 2 && (
					<div>
						<p className="font-medium mb-1">{t('uploadReport')}</p>
						<DropZone files={uploadedFiles} setFiles={setUploadedFiles} />
					</div>
				)}

				<div className="flex-end gap-5 mt-5">
					<button onClick={handleCancel} className="outlined-primary-btn">
						{step > 1 ? t('back', { ns: 'common' }) : t('cancel', { ns: 'common' })}
					</button>
					<button onClick={handleSave} className="primary-btn">
						{step > 2 ? t('proceedPayment') : t('next', { ns: 'common' })}
					</button>
				</div>
			</div>
		</section>
	);
};
