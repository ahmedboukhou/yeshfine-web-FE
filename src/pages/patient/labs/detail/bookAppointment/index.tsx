import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';
import { LABS_DETAIL_ROUTE, LABS_ROUTE } from '../../../../../routes';
import { Breadcrumb } from '../../../../../components/ui/Breadcrumb';
import { useState } from 'react';

export const PatientLabBookAppointment = () => {
	const { t } = useTranslation(['patient', 'common']);
	const { id } = useParams<{ id: string }>();
	const { state } = useLocation();
	const [step, setStep] = useState(1);
	const [reason, setReason] = useState('');

	const breadcrumbItems = [
		{ title: t('labs', { ns: 'common' }), path: LABS_ROUTE },
		{ title: t('labDetails'), path: LABS_DETAIL_ROUTE.replace(':id', `${id}`) },
		{ title: t('labDetails'), path: '' },
	];
	const { name, price, description, result_time, pre_test_instructions, requires_prescription } =
		state;
	console.log(
		`🚀 ~ PatientLabBookAppointment ~ { name, price, description, result_time, pre_test_instructions, requires_prescription }:`,
		{ name, price, description, result_time, pre_test_instructions, requires_prescription }
	);
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
		if (step === 1) {
			setStep(step + 1);
		} else {
			return;
		}
	};

	return (
		<section>
			<Breadcrumb items={breadcrumbItems} />
			<div className="mb-5 lg:mb-10">
				<h3 className="text-typography-800 font-bold">{t(heading())}</h3>
				<h5 className="text-typography-600 font-medium">{t(subHeading())}</h5>
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
		</section>
	);
};
