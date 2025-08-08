import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetDoctorProfileQuery } from '../../../apis/doctor/profile';
import { useCurrentUserStore } from '../../../store/user';
import { DoctorEditProfile } from './edit';
import { DoctorViewProfile } from './view';
import { ProfileSkeleton } from '../../../components/ui/skeletons/ProfileSkeleton';

export const DoctorProfile = () => {
	const { t } = useTranslation();
	const [showEditProfile, setShowEditProfile] = useState(false);
	const { data, isSuccess, isFetching } = useGetDoctorProfileQuery();
	const { setCurrentUser, currentUser } = useCurrentUserStore((state) => state);
	useEffect(() => {
		setCurrentUser({ ...currentUser, ...data?.data?.doctor });
	}, [isSuccess, data?.data?.doctor]);

	return (
		<section>
			<div className="pb-5 flex-between-center">
				<h3 className="font-bold text-typography-700">{t('profile')}</h3>
				{!showEditProfile && (
					<button className="primary-btn" onClick={() => setShowEditProfile(true)}>
						{t('editProfile')}
					</button>
				)}
			</div>

			<div className="rounded-2xl bg-white border border-border-1 flex flex-col min-h-[calc(100vh-20rem)]">
				<div className="bg-[linear-gradient(111deg,#1298BC_-37.21%,#88D702_115.79%)] h-30 rounded-t-2xl" />
				{isFetching ? (
					<ProfileSkeleton />
				) : (
					isSuccess &&
					data?.data?.doctor && (
						<div className="flex-1 px-4 sm:px-8 pb-3">
							{showEditProfile ? <DoctorEditProfile /> : <DoctorViewProfile setShowEditProfile={setShowEditProfile} isProfileComplete = {data?.data?.doctor?.is_profile_complete}/>}
						</div>
					)
				)}
			</div>
		</section>
	);
};
