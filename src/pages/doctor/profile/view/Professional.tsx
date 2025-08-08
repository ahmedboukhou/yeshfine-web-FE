import { useTranslation } from 'react-i18next';
import { NoInformationCard } from '../../../../components/ui/cards/NoInformationCard';
import { ProfileInfoCard } from '../../../../components/ui/cards/ProfileInfoCard';
import { useCurrentUserStore } from '../../../../store/user';
import licenseIcon from '../../../../assets/icons/license.svg';
import specialtyIcon from '../../../../assets/icons/specialty.svg';
import hospitalIcon from '../../../../assets/icons/hospital-1.svg';
import experienceIcon from '../../../../assets/icons/experience.svg';
import priceIcon from '../../../../assets/icons/price.svg';
import biographyIcon from '../../../../assets/icons/biography.svg';

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
							icon={<img src={specialtyIcon} />}
						/>
					</div>
					<div className="lg:col-span-4 sm:col-span-6 col-span-12">
						<ProfileInfoCard
							title={t('hospitalName')}
							text={clinicName || '--'}
							icon={<img src={hospitalIcon} />}
						/>{' '}
					</div>

					<div className="lg:col-span-4 sm:col-span-6 col-span-12">
						<ProfileInfoCard
							title={t('experience')}
							text={`${experience}`}
							icon={<img src={experienceIcon} />}
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
							icon={<img src={priceIcon} />}
						/>
					</div>

					<div className="col-span-12">
						<ProfileInfoCard
							title={t('biography')}
							text={biography || '--'}
							icon={<img src={biographyIcon} />}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
