import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import {
	useGetDoctorDetailQuery,
	useGetDoctorReviewsQuery,
} from '../../../../apis/patient/doctors';
import briefcaseImg from '../../../../assets/icons/briefcase.svg';
import feeImg from '../../../../assets/icons/fee.svg';
import hospitalImg from '../../../../assets/icons/hospital.svg';
import tripleImg from '../../../../assets/icons/user-triple.svg';
import { GoogleMap } from '../../../../components/ui/GoogleMap';
import { ReviewList } from '../../../../components/ui/ReviewList';
import { DoctorDetailsSkeleton } from '../../../../components/ui/skeletons/DoctorDetailSkeleton';
import { DoctorMainCardSkeleton } from '../../../../components/ui/skeletons/DoctorMainCardSkeleton';
import { DoctorMainCard } from './DoctorMainCard';

export const PatientDoctorDetail = () => {
	const { id } = useParams();
	const { t } = useTranslation(['common', 'patient']);
	const { data, isLoading } = useGetDoctorDetailQuery({ id });
	const { doctorDetail, image, latitude, longitude, name, treated_patients } = data?.data || {};
	const { average_rating, speciality, clinicName, fee, experience, biography, total_reviews } =
		doctorDetail || {};

	const docInfo = [
		{ img: hospitalImg, heading: t('hospital'), text: clinicName },
		{ img: feeImg, heading: t('consultationFee', { ns: 'patient' }), text: fee },
		{ img: briefcaseImg, heading: t('experience'), text: experience },
		{ img: tripleImg, heading: t('treatedPatient', { ns: 'patient' }), text: treated_patients },
	];

	return (
		<main>
			{isLoading ? (
				<DoctorMainCardSkeleton />
			) : (
				<DoctorMainCard
					name={name}
					averageRating={average_rating}
					image={image}
					specialty={speciality}
					id={id}
					clinicName={clinicName}
					latitude={latitude}
					longitude={longitude}
				/>
			)}
			<section className="mt-6 bg-white rounded-2xl border border-border-1 py-10 md:px-8 px-4">
				{isLoading ? (
					<DoctorDetailsSkeleton />
				) : (
					<div className="grid grid-cols-4 gap-8">
						{docInfo.map(({ img, heading, text }, index) => (
							<div
								className="col-span-4 md:col-span-2 xl:col-span-1 flex flex-col gap-1"
								key={index}
							>
								<div className="flex-items-center gap-1">
									<img src={img} />
									<p className="text-typography-500 font-medium">{heading}</p>
								</div>
								<p>{text}</p>
							</div>
						))}
						<div className="col-span-4">
							<h5 className="font-semibold text-typography-800">{t('biography')}</h5>
							<p className="text-typography-500 mt-1">
								{biography ?? t('noBiographyAdded', { ns: 'patient' })}
							</p>
						</div>

						<div className="col-span-4">
							<h5 className="font-semibold text-typography-800">
								{t('workLocation', { ns: 'patient' })}
							</h5>
							<p className="text-typography-500 mt-1">{clinicName}</p>
							<div className="h-60 mt-5">
								<GoogleMap latitude={latitude} longitude={longitude} />
							</div>
						</div>
					</div>
				)}

				<div className="mt-8">
					{isLoading ? (
						<div className="h-5 w-40 bg-gray-200 rounded mb-3" />
					) : (
						<h5 className="mb-3 font-semibold text-typography-800">
							{t('rating')} ({total_reviews})
						</h5>
					)}
					<ReviewList id={id} useReviewQuery={useGetDoctorReviewsQuery} limit={4} />
				</div>
			</section>
		</main>
	);
};
