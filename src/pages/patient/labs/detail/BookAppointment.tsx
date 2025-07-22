import dayjs from 'dayjs';
import { useState } from 'react';
import type { FileWithPath } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ClockIcon } from '../../../../assets/icons';
import calendarIcon from '../../../../assets/icons/menu-board.svg';
import { DatePicker } from '../../../../components/ui/actions/DayPicker';
import { Breadcrumb } from '../../../../components/ui/Breadcrumb';
import { DropZone } from '../../../../components/ui/dropzone';
import { FilePreview } from '../../../../components/ui/dropzone/FilePreview';
import { GoogleMap } from '../../../../components/ui/GoogleMap';
import { APPOINTMENTS_ROUTE, LABS_DETAIL_ROUTE, LABS_ROUTE } from '../../../../routes';
import { useLabBookAppointmentMutation } from '../../../../apis/patient/labs';
import { toast } from 'react-toastify';
import { responseStatus } from '../../../../interfaces/enums';

export const PatientLabBookAppointment = () => {
	const { t } = useTranslation(['patient', 'common']);
	const { id } = useParams<{ id: string }>();
	const { state } = useLocation();
	const navigate = useNavigate();

	const [step, setStep] = useState(1);
	const [date, setDate] = useState<Date>(new Date());
	const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]);
	const { latitude, address, longitude, labDetailId, selectedTest } = state;
	const {
		requires_prescription,
		result_time_in_days,
		name,
		price,
		description,
		pre_test_instructions,
	} = selectedTest || {};

	const { mutateAsync: bookAppointment, isPending } = useLabBookAppointmentMutation();

	const breadcrumbItems = [
		{ title: t('labs', { ns: 'common' }), path: LABS_ROUTE },
		{ title: t('labDetails'), path: LABS_DETAIL_ROUTE.replace(':id', `${id}`) },
		{ title: t('makeAppointment'), path: '' },
	];

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
			const formData = new FormData();
			formData.append('appointment_date', date.toISOString());
			formData.append('lab_id', String(id));
			formData.append('lab_detail_id', String(labDetailId));
			formData.append('services', JSON.stringify(selectedTest));

			if (uploadedFiles.length > 0) {
				formData.append('file', uploadedFiles[0]);
			}

			bookAppointment(formData, {
				onSuccess: ({ message, status }) => {
					if (status === responseStatus.Success) {
						toast.success(message);
						navigate(APPOINTMENTS_ROUTE);
					} else toast.error(message);
				},
			});
		}
	};

	const handleCancel = () => {
		if (step > 1) {
			setStep(requires_prescription ? step - 1 : step - 2);
		} else {
			navigate(LABS_DETAIL_ROUTE.replace(':id', `${id}`));
		}
	};

	const LabInfoCard = () => (
		<div className="card-gradient-2 card-box-shadow p-4 rounded-lg">
			<div className="mb-5">
				<h5 className="font-bold">{name}</h5>
				<span className="!text-xs text-typography-600">{description}</span>
			</div>

			<div className="mb-4 flex flex-col gap-3">
				<div className="flex-items-center gap-1">
					<ClockIcon />

					<span className="text-typography-500 font-semibold !text-xs">
						{t('resultTime', { ns: 'common' })}:
						<span className="font-bold !text-xs">{result_time_in_days}</span>
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
	);

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
						<LabInfoCard />
						<DatePicker date={date} setDate={setDate} />
					</div>
				)}

				{step === 2 && (
					<div>
						<p className="font-medium mb-1">{t('uploadReport')}</p>
						<DropZone files={uploadedFiles} setFiles={setUploadedFiles} />
					</div>
				)}
				{step === 3 && (
					<div className="flex flex-col gap-8">
						<LabInfoCard />

						<div>
							<h5 className="font-semibold text-typography-700">{t('workLocation')}</h5>
							<p className="text-typography-500 mt-1">{address}</p>

							<div className="h-60 mt-5">
								<GoogleMap latitude={latitude} longitude={longitude} />
							</div>
						</div>

						{requires_prescription && (
							<div className="p-4 card-box-shadow rounded-lg">
								<h5 className="font-semibold text-typography-800 mb-5">{t('yourPrescription')}</h5>
								<div className="flex-items-center gap-5">
									{uploadedFiles.map((file) => {
										const isImage = file.type.startsWith('image/');
										return <FilePreview key={file.path} isImage={isImage} file={file} />;
									})}
								</div>
							</div>
						)}

						<div className="p-4 card-box-shadow rounded-lg">
							<div className="flex-between-center mb-5">
								<h5 className="font-semibold text-typography-800">{t('scheduleDate')}</h5>
							</div>
							<div className="flex gap-5">
								<div className="bg-blue-100 p-2 rounded-lg">
									<img src={calendarIcon} />
								</div>
								<div className="flex-1">
									<span className="text-typography-500">{t('appointment', { ns: 'common' })}</span>
									<div className="flex gap-2">
										<p className="font-bold">{`${dayjs(date).format('ddd, DD MMM YYYY')}`}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className="flex-end gap-5 mt-5">
					<button onClick={handleCancel} className="outlined-primary-btn">
						{step > 1 ? t('back', { ns: 'common' }) : t('cancel', { ns: 'common' })}
					</button>
					<button
						onClick={handleSave}
						className="primary-btn"
						disabled={
							isPending || (step === 2 && requires_prescription && uploadedFiles.length === 0)
						}
					>
						{step === 3 ? t('bookAppointment') : t('next', { ns: 'common' })}
					</button>
				</div>
			</div>
		</section>
	);
};
