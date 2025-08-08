import { useTranslation } from 'react-i18next';
import licenseIcon from '../../../../assets/icons/license.svg';
import { NoInformationCard } from '../../../../components/ui/cards/NoInformationCard';
import { ProfileInfoCard } from '../../../../components/ui/cards/ProfileInfoCard';
import { useCurrentUserStore } from '../../../../store/user';

export const LabViewProfessionalProfile = () => {
	const { t } = useTranslation();
	const { currentUser } = useCurrentUserStore((state) => state);

	return (
		<div>
			{currentUser?.profile?.license_number ? (
				<ProfileInfoCard
					title={t('licenseNumber')}
					text={currentUser?.profile?.license_number}
					icon={<img src={licenseIcon} />}
				/>
			) : (
				<NoInformationCard />
			)}
		</div>
	);
};
