import { type FC, type ReactNode } from 'react';
import { GoogleMap } from '../GoogleMap';

type ProfileInfoCardProps = {
	icon: ReactNode;
	title: string;
	longitude?: number;
	latitude?: number;
	text?: string;
};
export const ProfileInfoCard: FC<ProfileInfoCardProps> = ({
	icon,
	title,
	text,
	longitude,
	latitude,
}) => {
	return (
		<div className="p-4 card-box-shadow rounded-xl card-box-shadow-3 ">
			<div className="flex gap-3">
				<div className="bg-primary-light rounded-full size-10 flex-center ">{icon}</div>

				<div className="flex flex-col">
					<span className="text-typography-500">{title}</span>
					<span className="text-typography-800 font-medium">{text}</span>
				</div>
			</div>
			{latitude && longitude && (
				<div className="h-60 mt-5">
					<GoogleMap latitude={latitude} longitude={longitude} />
				</div>
			)}
		</div>
	);
};
