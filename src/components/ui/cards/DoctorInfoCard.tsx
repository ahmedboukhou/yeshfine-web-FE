import { useTranslation } from 'react-i18next';
import { Badge } from '../Badge';
import { ReviewRating } from '../ReviewRating';
import type { FC } from 'react';

type DoctorInfoCardProps = {
	name?: string;
	averageRating: number | string;
	image?: string;
	specialty?: string;
};

export const DoctorInfoCard: FC<DoctorInfoCardProps> = ({
	name,
	averageRating,
	image,
	specialty,
}) => {
	const { t } = useTranslation(['patient', 'common']);

	return (
		<div className="border border-border-1 card-gradient-2 rounded-lg">
			<div className="p-4 flex gap-5">
				<img className="inline-block size-22 rounded-lg" src={image} alt={name} />
				<div className="flex-1 flex-col gap-3">
					<div className="flex-items-center gap-2 flex-wrap">
						<span className="text-typography-500">{t('rating')}</span>
						<ReviewRating rating={+averageRating || 0} />
						<span className="text-typography-500">{averageRating}</span>
					</div>
					<p className="font-bold text-typography-900">{name}</p>
					<div className="mt-2">
						<Badge specialty={specialty} />
					</div>
				</div>
			</div>
		</div>
	);
};
