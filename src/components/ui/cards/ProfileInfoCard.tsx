import { type FC, type ReactNode } from 'react';

type ProfileInfoCardProps = {
	icon: ReactNode;
	title: string;
	text?: string;
};
export const ProfileInfoCard: FC<ProfileInfoCardProps> = ({ icon, title, text }) => {
	return (
		<div className="p-4 card-box-shadow rounded-xl card-box-shadow-3 flex gap-3">
			<div className="bg-primary-light rounded-full size-10 flex-center ">{icon}</div>

			<div className="flex flex-col">
				<span className="text-typography-500">{title}</span>
				<span className="text-typography-800 font-medium">{text}</span>
			</div>
		</div>
	);
};
