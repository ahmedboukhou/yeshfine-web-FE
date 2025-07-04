import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { AppointmentCard } from '../../../components/common/cards/AppointmentCard';
import { DoctorCard } from '../../../components/common/cards/DoctorCard';
import { LabsPharmacyCard } from '../../../components/common/cards/LabsPharmacyCard';
import { APPOINTMENTS_ROUTE, DOCTORS_ROUTE, LABS_ROUTE, PHARMACIES_ROUTE } from '../../../routes';
import { HomeCarousal } from '../../../components/HomeCarousal';

export const PatientHome = () => {
	const { t } = useTranslation(['patient', 'common']);

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
					{[1, 2, 3, 3].map(() => (
						<div className=" col-span-12 sm:col-span-6  lg:col-span-4 2xl:col-span-3">
							<DoctorCard />
						</div>
					))}
				</div>
			</section>

			<section className="flex flex-col gap-5">
				<Heading
					text={t('topRatedHeading', { heading: t('labs', { ns: 'common' }) })}
					route={LABS_ROUTE}
				/>
				<div className="grid grid-cols-12 gap-5">
					{[1, 2, 3].map(() => (
						<div className="col-span-12 sm:col-span-6 lg:col-span-4">
							<LabsPharmacyCard />
						</div>
					))}
				</div>
			</section>

			<section className="flex flex-col gap-5">
				<Heading
					text={t('topRatedHeading', { heading: t('pharmacies', { ns: 'common' }) })}
					route={PHARMACIES_ROUTE}
				/>

				<div className="grid grid-cols-12 gap-5">
					{[1, 2, 3].map(() => (
						<div className=" col-span-12 sm:col-span-6 lg:col-span-4">
							<LabsPharmacyCard />
						</div>
					))}
				</div>
			</section>
		</main>
	);
};
