import type { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '../../../../components/ui/actions/Tabs';
import { Badge } from '../../../../components/ui/Badge';
import { PLACEHOLDER_IMAGE } from '../../../../constants';
import { useCurrentUserStore } from '../../../../store/user';
import { DoctorPersonalViewProfile } from './Personal';
import { DoctorViewProfessionalProfile } from './Professional';
import { DoctorAvailabilityViewProfile } from './Availability';

export const DoctorViewProfile: FC<{
	isProfileComplete: boolean;
	setShowEditProfile: Dispatch<SetStateAction<boolean>>;
}> = ({ isProfileComplete, setShowEditProfile }) => {
	const { t } = useTranslation();
	const { currentUser } = useCurrentUserStore((state) => state);
	const { image, name, phone, role } = currentUser || {};

	const tabData = [
		{ label: t('personal'), content: <DoctorPersonalViewProfile /> },
		{ label: t('professional'), content: <DoctorViewProfessionalProfile /> },
		{ label: t('availability'), content: <DoctorAvailabilityViewProfile /> },
	];
	return (
		<div>
			<div className="flex-center space-y-2 flex-col -mt-15 mb-10">
				<img
					src={image ?? PLACEHOLDER_IMAGE}
					className="h-30 w-30 rounded-full object-cover border-4 border-white "
				/>
				<h3 className="font-semibold text-typography-800">{name}</h3>
				<p className="text-typography-700">{phone}</p>
				<Badge specialty={role} variant="primary" />
			</div>
			{!isProfileComplete && (
				<div className="card flex-center flex-col gap-2">
					<h5 className="font-semibold text-typography-800">{t('completeProfileTitle')}</h5>
					<span className="text-typography-800">{t('completeProfileDescription')}</span>
					<button className="primary-btn mt-1" onClick={() => setShowEditProfile(true)}>
						{t('completeProfileAction')}
					</button>
				</div>
			)}
			<div className="mt-5">
				<Tabs
					center
					tabs={tabData.map((tab) => ({
						label: tab.label,
						content: tab.content,
					}))}
				/>
			</div>
		</div>
	);
};
