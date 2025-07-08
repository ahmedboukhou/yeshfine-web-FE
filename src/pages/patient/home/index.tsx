import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useGetAppointmentsQuery } from '../../../apis/patient/appointments';
import { useGetTopRatedStatsQuery } from '../../../apis/patient/home';
import { AppointmentCard } from '../../../components/common/cards/AppointmentCard';
import { DoctorCard } from '../../../components/common/cards/DoctorCard';
import { DoctorCardSkeleton } from '../../../components/common/skeletons/DoctorCardSkeleton';
import { HomeCarousal } from '../../../components/HomeCarousal';
import { AppointmentTypeEnum } from '../../../interfaces/enums';
import { APPOINTMENTS_ROUTE, DOCTORS_ROUTE, LABS_ROUTE, PHARMACIES_ROUTE } from '../../../routes';
import { useMediaQuery } from 'react-responsive'

export const PatientHome = () => {
	const { t } = useTranslation(['patient', 'common']);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  console.log("🚀 ~ PatientHome ~ isTabletOrMobile:", isTabletOrMobile)
	// get upcoming appointments
	const { data: getAppointmentsResponse, isLoading: loadingAppointments } = useGetAppointmentsQuery(
		{ page: 1, limit: 3, type: AppointmentTypeEnum.Upcoming }
	);
	const appointmentsData = getAppointmentsResponse?.data?.labs || [];

	const { data, isFetching: gettingStats } = useGetTopRatedStatsQuery();
	const { topDoctors, topLabs, topPharmacies } = data?.data || {};

	const Heading: FC<{ text: string; route: string }> = ({ text, route }) => {
		return (
			<div className="flex-between-center">
				<h3>{text}</h3>
				<Link to={route} className="text-primary font-medium hover:underline">
					{t('seeAll', { ns: 'common' })}
				</Link>
			</div>
		);
	};

	return (
		<main className="flex flex-col gap-8">
			<HomeCarousal />
			<section className="flex flex-col gap-5">
				<Heading
					text={t('upcomingAppointments', { heading: t('doctors', { ns: 'common' }) })}
					route={APPOINTMENTS_ROUTE}
				/>
				<div className="flex gap-5 overflow-auto">
					{[1, 2, 3].map(() => (
						<div className=" col-span-12 sm:col-span-6  lg:col-span-4">
							<AppointmentCard />
						</div>
					))}
				</div>
			</section>

			<section className="flex flex-col gap-5">
				<Heading
					text={t('topRatedHeading', { heading: t('doctors', { ns: 'common' }) })}
					route={DOCTORS_ROUTE}
				/>

				<div className="grid grid-cols-12 gap-5">
					{gettingStats ? (
						<DoctorCardSkeleton count={6} />
					) : (
						!!topDoctors?.length &&
						topDoctors.map(
							({
								image,
								name,
								id,
								experience,
								clinicName,
								averageRating,
								distance,
								speciality,
								totalReviews,
							}) => (
								<DoctorCard
									key={id}
									image={image}
									name={name}
									id={id}
									experience={experience}
									clinicName={clinicName}
									averageRating={averageRating}
									speciality={speciality}
									distance={distance}
								/>
							)
						)
					)}
				</div>
			</section>

			<section className="flex flex-col gap-5">
				<Heading
					text={t('topRatedHeading', { heading: t('labs', { ns: 'common' }) })}
					route={LABS_ROUTE}
				/>
				<div className="grid grid-cols-12 gap-5">
					{/* {loadingLabs ? (
						<LabsPharmacyCardSkeleton count={3} />
					) : (
						labsData.map(({ address, id, image, labDetail, name }) => (
							<LabsPharmacyCard
								address={address}
								id={id}
								image={image}
								key={id}
								labDetail={labDetail}
								name={name}
							/>
						))
					)} */}
				</div>
			</section>

			<section className="flex flex-col gap-5">
				<Heading
					text={t('topRatedHeading', { heading: t('pharmacies', { ns: 'common' }) })}
					route={PHARMACIES_ROUTE}
				/>

				{/* <div className="grid grid-cols-12 gap-5">
					{[1, 2, 3].map(() => (
						<div className=" col-span-12 sm:col-span-6 lg:col-span-4">
							<LabsPharmacyCard />
						</div>
					))}
				</div> */}
			</section>
		</main>
	);
};
