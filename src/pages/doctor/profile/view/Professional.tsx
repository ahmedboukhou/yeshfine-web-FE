import { useTranslation } from 'react-i18next';
import { NoInformationCard } from '../../../../components/ui/cards/NoInformationCard';
import { ProfileInfoCard } from '../../../../components/ui/cards/ProfileInfoCard';
import { useCurrentUserStore } from '../../../../store/user';
import licenseIcon from '../../../../assets/icons/license.svg';
export const DoctorViewProfessionalProfile = () => {
	const { t } = useTranslation();
	const { currentUser } = useCurrentUserStore((state) => state);
	const { profile } = currentUser || {};
	const { speciality, clinicName, experience, liscenceNumber, fee, biography } = profile || {};
	const noInfo =
		!speciality && !clinicName && !experience && !liscenceNumber && fee === '0.00' && !biography;

	return (
		<div>
			{noInfo ? (
				<NoInformationCard />
			) : (
				<div className="grid grid-cols-12 gap-6 mb-6">
					<div className="lg:col-span-4 sm:col-span-6 col-span-12">
						<ProfileInfoCard
							title={t('specialty')}
							text={speciality || '--'}
							icon={<img src={licenseIcon} />}
						/>
					</div>
					<div className="lg:col-span-4 sm:col-span-6 col-span-12">
						<ProfileInfoCard
							title={t('hospitalName')}
							text={clinicName || '--'}
							icon={<img src={licenseIcon} />}
						/>{' '}
					</div>

					<div className="lg:col-span-4 sm:col-span-6 col-span-12">
						<ProfileInfoCard
							title={t('experience')}
							text={`${experience}`}
							icon={<img src={licenseIcon} />}
						/>
					</div>

					<div className="sm:col-span-6 col-span-12">
						<ProfileInfoCard
							title={t('licenseNumber')}
							text={liscenceNumber || '--'}
							icon={<img src={licenseIcon} />}
						/>
					</div>

					<div className="lg:col-span-6 col-span-12">
						<ProfileInfoCard
							title={t('price', { ns: 'patient' })}
							text={fee || '--'}
							icon={<img src={licenseIcon} />}
						/>
					</div>

					<div className="col-span-12">
						<ProfileInfoCard
							title={t('biography')}
							text={biography || '--'}
							icon={<img src={licenseIcon} />}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
