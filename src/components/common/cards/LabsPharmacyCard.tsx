import type { FC } from 'react';
import { Link } from 'react-router';
import { ActivityIcon, ClockIcon, LocationIcon } from '../../../assets/icons';
import { Rating } from '../ui/Rating';

type LabsPharmacyCardProps = {
	name: string;
	image: string;
	address: string;
	averageRating: string;
	distance: number | null;
	open?: boolean;
	todaySlot?: string;
	link: string;
};
export const LabsPharmacyCard: FC<LabsPharmacyCardProps> = ({
	name,
	image,
	address,
	averageRating,
	distance,
	todaySlot,
	// open,
	link,
}) => {
	return (
		<Link to={link} className="col-span-12 sm:col-span-6 lg:col-span-4">
			<div className="p-4 bg-white rounded-2xl border border-black/10">
				<div className="relative pt-[50%] rounded-xl overflow-hidden hidden sm:block">
					<img
						className="size-full absolute top-0 start-0 object-cover object-top group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
						src={image}
						alt={name}
					/>
				</div>
				<div className="flex gap-3">
					<div className="block sm:hidden shrink-0">
						<img src={image} width={80} className="w-20 h-20 rounded-xl" />
					</div>
					<div className="flex flex-col gap-2.5 flex-1">
						<div className="flex-between">
							<h5>{name}</h5>
							<Rating rating={averageRating} />
						</div>

						<div className="gap-2 flex-items-center">
							<LocationIcon />
							<span className="text-typography-700">{address}</span>
						</div>

						<div className="flex-between-center">
							<span className="text-xs text-primary">Open</span>
							<div className="flex-items-center gap-1 bg-primary-light py-1 px-4 rounded-full">
								<ClockIcon />
								<span className="text-primary font-semibold">{todaySlot}</span>
							</div>

							{distance ? (
								<div className="flex-items-center">
									<ActivityIcon />
									<p className="text-warning-400 font-medium text-sm">{distance} km</p>
								</div>
							) : (
								<div />
							)}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};
