import { useTranslation } from 'react-i18next';
import { AddressIcon, BirthdayIcon, GenderIcon } from '../../../../assets/icons';
import { ProfileInfoCard } from '../../../../components/ui/cards/ProfileInfoCard';
import { ChangePassword } from '../../../../components/ui/ChangePassword';
import { useCurrentUserStore } from '../../../../store/user';

export const DoctorPersonalViewProfile = () => {
	const { t } = useTranslation();
	const { currentUser } = useCurrentUserStore((state) => state);
	const { dob, gender, address, latitude, longitude } = currentUser || {};

	return (
		<div className="grid grid-cols-2 gap-6 mb-6">
			<div className="col-span-2 sm:col-span-1">
				<ProfileInfoCard icon={<BirthdayIcon />} text={dob} title={t('dob')} />
			</div>
			<div className="col-span-2 sm:col-span-1">
				<ProfileInfoCard icon={<GenderIcon />} text={gender} title={t('gender')} />
			</div>
			<div className="col-span-2">
				<ProfileInfoCard
					icon={<AddressIcon />}
					text={address}
					title={t('address')}
					latitude={latitude}
					longitude={longitude}
				/>
			</div>

			<div className="col-span-2">
				<ChangePassword />
			</div>
		</div>
	);
};
