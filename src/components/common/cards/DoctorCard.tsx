import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import {
	ActivityIcon,
	BookAppointmentIcon,
	BriefCaseIcon,
	HospitalIcon,
} from '../../../assets/icons';
import { DOCTORS_ROUTE } from '../../../routes';
import { Badge } from '../Badge';
import { Rating } from '../Rating';

type DoctorCardProps = {
	id: number;
	image: string;
	experience: number;
	name: string;
	averageRating: string;
	clinicName: string;
	speciality: string;
	distance: number | null;
};

export const DoctorCard: FC<DoctorCardProps> = ({
	id,
	name,
	image,
	experience,
	clinicName,
	averageRating,
	speciality,
	distance,
}) => {
	const { t } = useTranslation(['patient']);

	return (
		<div className="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
			<div className="flex flex-col group  bg-white border border-border-1 rounded-2xl overflow-hidden hover:shadow-lg focus:outline-hidden focus:shadow-lg transition">
				<Link
					to={`${DOCTORS_ROUTE}/${id}`}
					className="relative pt-[80%] rounded-t-xl overflow-hidden hidden sm:block"
				>
					<img
						className="size-full absolute top-0 start-0 object-cover object-top group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
						src={image}
						alt={name}
					/>
				</Link>
				<div className="md:p-6 p-3">
					<Link to={`${DOCTORS_ROUTE}/${id}`} className="flex gap-3">
						<div className="block sm:hidden">
							<img src={image} width={80} className="h-full rounded-xl" />
						</div>
						<div className="flex flex-col gap-3 flex-1">
							<div className="grid grid-cols-3">
								<h5 className="col-span-2 ellipses">{name}</h5>
								<div className="col-span-1 flex-end">
									<Rating rating={averageRating} />
								</div>
							</div>
							<div className="flex-items-center gap-3">
								<Badge specialty={speciality} />
								<div className="gap-2 flex-items-center">
									<BriefCaseIcon />
									<span className="text-sm sm:text-xs xl:text-sm text-typography-500 text-nowrap">
										{t('experienceYears', { experience })}
									</span>
								</div>
							</div>

							<div className="grid grid-cols-3">
								<div className="flex-items-center gap-2 flex-1 col-span-2">
									<HospitalIcon />
									<p className="text-typography-700 font-medium text-sm ellipses">{clinicName}</p>
								</div>

								{distance && (
									<div className="flex-end shrink-0 text-nowrap col-span-1">
										<ActivityIcon />
										<p className="text-warning-400 font-medium text-sm">{distance} km</p>
									</div>
								)}
							</div>
						</div>
					</Link>
					<button className="primary-btn w-full mt-6 flex-center gap-2 text-sm font-semibold">
						<BookAppointmentIcon />
						{t('bookAppointment')}
					</button>
				</div>
			</div>
		</div>
	);
};
