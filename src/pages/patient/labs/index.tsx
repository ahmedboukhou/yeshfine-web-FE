import { useTranslation } from 'react-i18next';
import { Tabs } from '../../../components/ui/actions/Tabs';
import { LabsListing } from './listing';
import { PatientLabReports } from './reports';

export const PatientLabs = () => {
	const { t } = useTranslation(['patient']);

	const tabData = [
		{ label: t('allLabs'), content: <LabsListing /> },
		{ label: t('yourReports'), content: <PatientLabReports /> },
	];

	return (
		<section>
			<div className="mb-6">
				<h3 className="font-semibold text-typography-700">{t('labs')}</h3>
			</div>

			<Tabs
				tabs={tabData.map((tab) => ({
					label: tab.label,
					content: tab.content,
				}))}
			/>
		</section>
	);
};
