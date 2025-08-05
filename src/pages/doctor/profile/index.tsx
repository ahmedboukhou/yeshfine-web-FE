import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DoctorEditProfile } from "./edit";
import { DoctorViewProfile } from "./view";
// import { useGetDoctorProfileQuery } from "../../../apis/doctor/profile";

export const DoctorProfile = () => {

	const { t } = useTranslation();
		const [showEditProfile, setShowEditProfile] = useState(false);
		// const {data} = useGetDoctorProfileQuery()
	
	return <section>
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
					<div className="flex-1 px-4 sm:px-8 pb-3">
						{showEditProfile ? <DoctorEditProfile /> : <DoctorViewProfile />}
					</div>
				</div>
			</section>;
};
