import { ActivityIcon } from '../../assets/icons';

export const Distance = ({ distance }: { distance?: number | null }) => (
	<div className="flex-items-center">
		<ActivityIcon />
		<p className="text-warning-400 font-medium text-sm">{distance ?? 0} km</p>
	</div>
);
