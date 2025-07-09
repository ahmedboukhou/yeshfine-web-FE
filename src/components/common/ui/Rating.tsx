import type { FC } from 'react';
import { StarIcon } from '../../../assets/icons';

export const Rating: FC<{ rating?: string }> = ({ rating = '0.0' }) => (
	<div className="flex-items-center gap-2 ">
		<StarIcon />
		<span className="text-typography-700 font-medium">{rating}</span>
	</div>
);
