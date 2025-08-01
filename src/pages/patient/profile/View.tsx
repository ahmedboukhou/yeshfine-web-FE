import { useTranslation } from 'react-i18next';
import { AddressIcon, BirthdayIcon, GenderIcon } from '../../../assets/icons';
import { useCurrentUserStore } from '../../../store/user';
import { ProfileInfoCard } from '../../../components/ui/cards/ProfileInfoCard';
import { PLACEHOLDER_IMAGE } from '../../../constants';
import { Badge } from '../../../components/ui/Badge';

export const PatientViewProfile = () => {
	const { t } = useTranslation();
	const { currentUser } = useCurrentUserStore((state) => state);
	const { dob, gender, image, name, phone, address, role } = currentUser || {};
	return (
		<div>
			<div className="flex-center space-y-2 flex-col -mt-15 mb-20">
				<img
					src={image ?? PLACEHOLDER_IMAGE}
					className="h-30 w-30 rounded-full object-cover border-4 border-white "
				/>
				<h3 className="font-semibold text-typography-800">{name}</h3>
				<p className="text-typography-700">{phone}</p>
				<Badge specialty={role} variant="primary" />
			</div>

			<div className="grid grid-cols-2 gap-6 mb-6">
				<div className="col-span-2 sm:col-span-1">
					<ProfileInfoCard icon={<BirthdayIcon />} text={dob} title={t('dob')} />
				</div>
				<div className="col-span-2 sm:col-span-1">
					<ProfileInfoCard icon={<GenderIcon />} text={gender} title={t('gender')} />
				</div>
				<div className="col-span-2">
					<ProfileInfoCard icon={<AddressIcon />} text={address} title={t('address')} />
				</div>
			</div>
		</div>
	);
};
