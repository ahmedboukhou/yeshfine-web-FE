import { useTranslation } from 'react-i18next';
import { LocationIcon } from '../../assets/icons';

export const LocationInfo = ({ address }: { address?: string }) => {
	const { t } = useTranslation();

	return (
		<div>
			<h5 className="font-semibold text-typography-800">{t('location', { ns: 'common' })}</h5>
			<div className="flex-items-center gap-1">
				<LocationIcon />
				<p className="text-typography-500 font-medium">{address}</p>
			</div>
		</div>
	);
};
