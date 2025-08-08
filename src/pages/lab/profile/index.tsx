import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetLabProfileQuery } from '../../../apis/lab/profile';
import { ProfileSkeleton } from '../../../components/ui/skeletons/ProfileSkeleton';
import { useCurrentUserStore } from '../../../store/user';
import { LabEditProfile } from './edit';
import { LabViewProfile } from './view';

export const LabProfile = () => {
	const { t } = useTranslation();
	const [showEditProfile, setShowEditProfile] = useState(false);
	const { data, isSuccess, isFetching } = useGetLabProfileQuery();
	const { setCurrentUser, currentUser } = useCurrentUserStore((state) => state);
	useEffect(() => {
		setCurrentUser({ ...currentUser, ...data?.data?.lab });
	}, [isSuccess, data?.data?.lab]);

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
					data?.data?.lab && (
						<div className="flex-1 px-4 sm:px-8 pb-3">
							{showEditProfile ? (
								<LabEditProfile />
							) : (
								<LabViewProfile
									setShowEditProfile={setShowEditProfile}
									isProfileComplete={data?.data?.lab?.is_profile_complete}
								/>
							)}
						</div>
					)
				)}
			</div>
		</section>
	);
};
