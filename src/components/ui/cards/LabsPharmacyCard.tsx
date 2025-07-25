import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ClockIcon, LocationIcon } from '../../../assets/icons';
import { Badge } from '../Badge';
import { Distance } from '../Distance';
import { Rating } from '../Rating';

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
	open,
	link,
}) => {
	const { t } = useTranslation();
	return (
		<Link to={link} className="col-span-12 sm:col-span-6 xl:col-span-4">
			<div className="p-4 bg-white rounded-2xl border border-border-1">
				<div className="relative pt-[50%] rounded-xl overflow-hidden hidden sm:block">
					<img
						className="size-full absolute top-0 start-0 object-cover object-top group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
						src={image}
						alt={name}
					/>
				</div>
				<div className="flex gap-3 mt-3">
					<div className="block sm:hidden shrink-0">
						<img src={image} width={80} className="w-20 h-20 rounded-xl" />
					</div>
					<div className="flex flex-col gap-2.5 flex-1">
						<div className="grid grid-cols-3">
							<h5 className="col-span-2 ellipses font-semibold text-typography-800">{name}</h5>
							<div className="col-span-1 flex-end">
								<Rating rating={averageRating} />
							</div>
						</div>

						<div className="gap-2 flex-items-center">
							<LocationIcon />
							<span className="text-typography-700">{address}</span>
						</div>

						<div className="flex-between flex-col gap-y-2 md:flex-row">
							<span className={`!text-xs ${open ? 'text-primary' : 'text-typography-500'}`}>
								{t(open ? 'open' : 'closed')}
							</span>
							<Badge icon={<ClockIcon />} specialty={todaySlot} variant="primary" />

							<Distance distance={distance} />
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};
