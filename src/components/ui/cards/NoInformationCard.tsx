import { useTranslation } from 'react-i18next';
import infoIcon from '../../../assets/icons/info-circle.svg';

export const NoInformationCard = () => {
	const { t } = useTranslation();
	return (
		<div className="p-5 card card-gradient flex-center space-y-4 flex-col">
			<img src={infoIcon} alt="info-icon" className="bg-primary-light-hover rounded-full p-2" />
			<div className="flex flex-col gap-1 text-center">
				<span className="font-semibold text-typography-800">{t('noInfoAdded')}</span>
				<span className="text-typography-800 font-medium">{t('completeProfileToView')}</span>
			</div>
		</div>
	);
};
