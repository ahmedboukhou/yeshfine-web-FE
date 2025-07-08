import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
// import { useGetAppointmentsQuery } from '../../../apis/patient/appointments';
import { useGetTopRatedStatsQuery } from '../../../apis/patient/home';
import { DoctorCard } from '../../../components/common/cards/DoctorCard';
import { DoctorCardSkeleton } from '../../../components/common/skeletons/DoctorCardSkeleton';
import { HomeCarousal } from '../../../components/HomeCarousal';
// import { AppointmentTypeEnum } from '../../../interfaces/enums';
import { useMediaQuery } from 'react-responsive';
import { LabsPharmacyCard } from '../../../components/common/cards/LabsPharmacyCard';
import { LabsPharmacyCardSkeleton } from '../../../components/common/skeletons/LabsPharmacySkeleton';
import { DOCTORS_ROUTE, LABS_ROUTE, PHARMACIES_ROUTE } from '../../../routes';

export const PatientHome = () => {
	const { t } = useTranslation(['patient', 'common']);
	const isSmallToLargeScreen = useMediaQuery({ maxWidth: 1535 });

	// get upcoming appointments
	// const { data: getAppointmentsResponse, isLoading: loadingAppointments } = useGetAppointmentsQuery(
	// 	{ page: 1, limit: 3, type: AppointmentTypeEnum.Upcoming }
	// );
	// const appointmentsData = getAppointmentsResponse?.data?.labs || [];

	const { data, isFetching: gettingStats } = useGetTopRatedStatsQuery();
	const { topDoctors, topLabs, topPharmacies } = data?.data || {};

	const doctors = topDoctors?.slice(isSmallToLargeScreen ? 2 : 1)?.map((doctor) => doctor);

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
			{/* <section className="flex flex-col gap-5">
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
			</section> */}

			<section className="flex flex-col gap-5">
				<Heading
					text={t('topRatedHeading', { heading: t('doctors', { ns: 'common' }) })}
					route={DOCTORS_ROUTE}
				/>

				<div className="grid grid-cols-12 gap-5">
					{gettingStats ? (
						<DoctorCardSkeleton count={isSmallToLargeScreen ? 3 : 4} />
					) : !!doctors?.length ? (
						doctors.map(
							({
								image,
								name,
								id,
								experience,
								clinicName,
								averageRating,
								distance,
								speciality,
								user_id,
							}) => (
								<DoctorCard
									key={id}
									image={image}
									name={name}
									id={user_id}
									experience={experience}
									clinicName={clinicName}
									averageRating={averageRating}
									specialty={speciality}
									distance={distance}
								/>
							)
						)
					) : (
						<p>No doctors Found</p>
					)}
				</div>
			</section>

			<section className="flex flex-col gap-5">
				<Heading
					text={t('topRatedHeading', { heading: t('labs', { ns: 'common' }) })}
					route={LABS_ROUTE}
				/>
				<div className="grid grid-cols-12 gap-5">
					{gettingStats ? (
						<LabsPharmacyCardSkeleton count={3} />
					) : (
						!!topLabs?.length &&
						topLabs.map(
							({ address, id, image, name, averageRating, distance, todaySlot, open }) => (
								<LabsPharmacyCard
									open={open}
									address={address}
									image={image}
									key={id}
									averageRating={averageRating}
									distance={distance}
									todaySlot={todaySlot}
									name={name}
									link={`${LABS_ROUTE}/${id}`}
								/>
							)
						)
					)}
				</div>
			</section>

			<section className="flex flex-col gap-5">
				<Heading
					text={t('topRatedHeading', { heading: t('pharmacies', { ns: 'common' }) })}
					route={PHARMACIES_ROUTE}
				/>

				<div className="grid grid-cols-12 gap-5">
					{gettingStats ? (
						<LabsPharmacyCardSkeleton count={3} />
					) : (
						!!topPharmacies?.length &&
						topPharmacies.map(({ address, id, image, name, averageRating, distance }) => (
							<LabsPharmacyCard
								address={address}
								image={image}
								key={id}
								averageRating={averageRating}
								distance={distance}
								name={name}
								link={`${PHARMACIES_ROUTE}/${id}`}
							/>
						))
					)}
				</div>
			</section>
		</main>
	);
};
