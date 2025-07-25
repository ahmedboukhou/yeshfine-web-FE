import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Rating } from '../Rating';
import { LocationIcon } from '../../../assets/icons';
import { Badge } from '../Badge';

type LabInfoCardProps = {
	name: string;
	averageRating?: string;
	image: string;
	timeRange: string;
	isOpen?: boolean;
	address: string;
};

export const LabInfoCard: FC<LabInfoCardProps> = ({
	name,
	averageRating,
	image,
	isOpen,
	address,
	timeRange,
}) => {
	const { t } = useTranslation(['patient', 'common']);

	return (
		<div className="border border-border-1 card-gradient-2 rounded-lg">
			<div className="p-4 flex gap-5">
				<img className="inline-block size-22 rounded-lg" src={image} alt={name} />
				<div className="flex-1 flex-col gap-3">
					<div className="flex-items-center gap-2 flex-wrap">
						<p className="font-bold text-typography-900">{name}</p>
						{averageRating && <Rating rating={averageRating} />}
					</div>

					<div className="flex-items-center gap-1">
						<LocationIcon />
						<span className="text-typography-700">{address}</span>
					</div>
					<div className="mt-2 flex-items-center gap-2">
						<small className={`${isOpen ? 'text-primary' : 'text-typography-500'}`}>
							{t(isOpen ? 'open' : 'closed', { ns: 'common' })}
						</small>
						<Badge specialty={timeRange} variant="primary" />
					</div>
				</div>
			</div>
		</div>
	);
};
