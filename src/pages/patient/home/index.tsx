import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
// import { useGetAppointmentsQuery } from '../../../apis/patient/appointments';
import { useGetTopRatedStatsQuery } from '../../../apis/patient/home';
import { DoctorCardSkeleton } from '../../../components/ui/skeletons/DoctorCardSkeleton';
import { HomeCarousal } from '../../../components/ui/HomeCarousal';
// import { AppointmentTypeEnum } from '../../../interfaces/enums';
import { useMediaQuery } from 'react-responsive';
import { LabsPharmacyCardSkeleton } from '../../../components/ui/skeletons/LabsPharmacySkeleton';
import {
	APPOINTMENTS_ROUTE,
	DOCTORS_ROUTE,
	LABS_DETAIL_ROUTE,
	LABS_ROUTE,
	PHARMACIES_DETAIL_ROUTE,
	PHARMACIES_ROUTE,
} from '../../../routes';
import { DoctorCard } from '../../../components/ui/cards/DoctorCard';
import { LabsPharmacyCard } from '../../../components/ui/cards/LabsPharmacyCard';
import { AppointmentCard } from '../../../components/ui/cards/AppointmentCard';
import { AppointmentTypeEnum } from '../../../interfaces/enums';
import { useGetAppointmentsQuery } from '../../../apis/patient/appointments';

export const PatientHome = () => {
	const { t } = useTranslation(['patient', 'common']);
	const isSmallToLargeScreen = useMediaQuery({ maxWidth: 1535 });

	// get upcoming appointments
	const { data: getAppointmentsResponse, isLoading: loadingAppointments } = useGetAppointmentsQuery(
		{ page: 1, limit: 3, type: AppointmentTypeEnum.Upcoming }
	);
	const appointmentsData = getAppointmentsResponse?.data?.items || [];
	console.log('🚀 ~ PatientHome ~ appointmentsData:', appointmentsData);

	const { data, isFetching: gettingStats } = useGetTopRatedStatsQuery();
	const { topDoctors, topLabs, topPharmacies } = data?.data || {};

	const Heading: FC<{ text: string; route: string }> = ({ text, route }) => {
		return (
			<div className="flex-between flex-col sm:flex-row gap-1">
				<h3 className="font-semibold text-typography-700">{text}</h3>
				<Link to={route} className="text-primary font-medium hover:underline text-nowrap">
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
					{appointmentsData.map(
						(
							{
								doctor: { image, name, speciality, clinicName },
								appointment_date_formatted,
								time_range,
							},
							index
						) => (
							<div key={index} className=" col-span-12 sm:col-span-6  lg:col-span-4">
								<AppointmentCard
									image={image}
									name={name}
									speciality={speciality}
									clinicName={clinicName}
									appointmentDate={appointment_date_formatted}
									timeRange={time_range}
								/>
							</div>
						)
					)}
				</div>
			</section>

			<section className="flex flex-col gap-5">
				<Heading
					text={t('topRatedHeading', { heading: t('doctors', { ns: 'common' }) })}
					route={DOCTORS_ROUTE}
				/>

				<div className="grid grid-cols-12 gap-5">
					{gettingStats ? (
						<DoctorCardSkeleton count={isSmallToLargeScreen ? 3 : 4} />
					) : !!topDoctors?.length ? (
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
								latitude,
								longitude,
								user_id,
							}) => (
								<DoctorCard
									key={id}
									latitude={latitude}
									longitude={longitude}
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
							({ address, id, image, name, averageRating, distance, todaySlot, open, user_id }) => (
								<LabsPharmacyCard
									open={open}
									address={address}
									image={image}
									key={id}
									averageRating={averageRating}
									distance={distance}
									todaySlot={todaySlot}
									name={name}
									link={LABS_DETAIL_ROUTE.replace(':id', `${user_id}`)}
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
						topPharmacies.map(
							({ address, id, image, name, averageRating, distance, todaySlot, user_id }) => (
								<LabsPharmacyCard
									address={address}
									image={image}
									todaySlot={todaySlot}
									key={id}
									averageRating={averageRating}
									distance={distance}
									name={name}
									link={PHARMACIES_DETAIL_ROUTE.replace(':id', `${user_id}`)}
								/>
							)
						)
					)}
				</div>
			</section>
		</main>
	);
};
