import { ActivityIcon } from '../../assets/icons';

export const Distance = ({ distance }: { distance?: number | null }) => (
	<div className="flex-items-center">
		<ActivityIcon />
		<span className="text-warning-400 font-medium text-nowrap">{distance ?? 0} km</span>
	</div>
);
