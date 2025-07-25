import { useTranslation } from 'react-i18next';
import { BirthdayIcon, GenderIcon } from '../../../assets/icons';
import { useCurrentUserStore } from '../../../store/user';
import { ProfileInfoCard } from '../../../components/ui/cards/ProfileInfoCard';

export const PatientViewProfile = () => {
	const { t } = useTranslation();
	const { currentUser } = useCurrentUserStore((state) => state);
	const { dob, gender, image, name, phone } = currentUser || {};
	return (
		<div>
			<div className="flex-center space-y-2 flex-col -mt-15 mb-20">
				<img
					src={
						image ??
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s'
					}
					className="h-30 w-30 rounded-full object-cover border-4 border-white "
				/>
				<h3 className="font-semibold text-typography-800">{name}</h3>
				<p className="text-typography-700">{phone}</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<ProfileInfoCard icon={<BirthdayIcon />} text={dob} title={t('dob')} />
				<ProfileInfoCard icon={<GenderIcon />} text={gender} title={t('gender')} />
			</div>
		</div>
	);
};
