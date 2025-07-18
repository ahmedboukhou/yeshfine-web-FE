import { type FC, type ReactNode } from 'react';
type NotFoundCardProps = {
	icon: ReactNode;
	heading: string;
	subHeading: string;
};
export const NotFoundCard: FC<NotFoundCardProps> = ({ icon, subHeading, heading }) => {
	return (
		<div className="p-5 sm:p-10 flex-center flex-col w-full bg-white card-box-shadow-2 rounded-2xl">
			<div className="p-3 mb-5 card-gradient rounded-lg border border-border-1">{icon}</div>
			<h5 className="text-typography-700 font-semibold">{heading}</h5>
			<span className="text-typography-500">{subHeading}</span>
		</div>
	);
};
