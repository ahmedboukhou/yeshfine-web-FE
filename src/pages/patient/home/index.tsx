import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router';
import { useGetPatientUpcomingAppointmentsQuery } from '../../../apis/patient/appointments';
import { useGetTopRatedStatsQuery } from '../../../apis/patient/home';
import { AppointmentIcon, DoctorIcon, LabIcon, PharmacyIcon } from '../../../assets/icons';
import { AppointmentCard } from '../../../components/ui/cards/AppointmentCard';
import { DoctorCard } from '../../../components/ui/cards/DoctorCard';
import { LabsPharmacyCard } from '../../../components/ui/cards/LabsPharmacyCard';
import { NotFoundCard } from '../../../components/ui/cards/NotFoundCard';
import { HomeCarousal } from '../../../components/ui/HomeCarousal';
import { AppointmentCardSkeleton } from '../../../components/ui/skeletons/AppointmentCardSkeleton';
import { DoctorCardSkeleton } from '../../../components/ui/skeletons/DoctorCardSkeleton';
import { LabsPharmacyCardSkeleton } from '../../../components/ui/skeletons/LabsPharmacySkeleton';
import {
	APPOINTMENTS_ROUTE,
	DOCTORS_ROUTE,
	LABS_DETAIL_ROUTE,
	LABS_ROUTE,
	PHARMACIES_DETAIL_ROUTE,
	PHARMACIES_ROUTE,
} from '../../../routes';

export const PatientHome = () => {
	const { t } = useTranslation(['patient', 'common']);
	const isSmallToLargeScreen = useMediaQuery({ maxWidth: 1535 });

	// get upcoming appointments
	const { data: getAppointmentsResponse, isLoading: loadingAppointments } =
		useGetPatientUpcomingAppointmentsQuery();
	const { data: appointmentsData } = getAppointmentsResponse || {};

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
					text={t('upcomingDoctorAppointments', { heading: t('doctors', { ns: 'common' }) })}
					route={APPOINTMENTS_ROUTE}
				/>
				<div className="grid grid-cols-6 gap-5">
					{loadingAppointments ? (
						<AppointmentCardSkeleton />
					) : !!appointmentsData?.length ? (
						appointmentsData?.map(
							(
								{
									doctor_image,
									start_time,
									appointment_date,
									distance,
									speciality,
									appointment_type,
									doctor_name,
									clinicName,
									end_time,
									appointment_id,
									meeting_link,
									latitude,
									longitude,
									rating,
								},
								index
							) => (
								<div key={index} className="col-span-6 md:col-span-3 xl:col-span-2">
									<AppointmentCard
										id={appointment_id}
										image={doctor_image}
										distance={distance}
										latitude={latitude}
										longitude={longitude}
										rating={rating}
										name={doctor_name}
										label={appointment_type}
										specialty={speciality}
										meeting_link={meeting_link}
										clinicName={clinicName}
										appointmentDate={appointment_date}
										timeRange={`${start_time} - ${end_time}`}
									/>
								</div>
							)
						)
					) : (
						<div className="col-span-6">
							<NotFoundCard
								icon={<AppointmentIcon />}
								heading={t('noAppointmentYet')}
								subHeading={t('bookWhenReady')}
							/>
						</div>
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
									doctorDetailId={id}
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
						<NotFoundCard
							icon={<DoctorIcon />}
							heading={t('unableToLoadDoctors')}
							subHeading={t('doctorProfilesFetchError')}
						/>
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
					) : !!topLabs?.length ? (
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
					) : (
						<NotFoundCard
							icon={<LabIcon />}
							heading={t('labsNotDisplayed')}
							subHeading={t('labsLoadingError')}
						/>
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
					) : !!topPharmacies?.length ? (
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
					) : (
						<NotFoundCard
							icon={<PharmacyIcon />}
							heading={t('pharmaciesUnavailable')}
							subHeading={t('pharmaciesFetchError')}
						/>
					)}
				</div>
			</section>
		</main>
	);
};
