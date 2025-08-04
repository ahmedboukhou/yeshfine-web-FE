import type { FC, ReactNode } from 'react';

type SummaryCardProps = {
	title: string;
	description: string;
	icon: ReactNode;
};
export const SummaryCard: FC<SummaryCardProps> = ({ title, icon, description }) => {
	return (
		<div className="bg-white card-box-shadow-4 rounded-2xl p-4 relative overflow-hidden">
			<h3 className="font-semibold text-typography-900">{title}</h3>
			<span className="font-medium text-typography-900">{description}</span>

			<div className="absolute -top-4 -right-4 bg-primary-light-hover rounded-full p-6 flex-center">
				{icon}
			</div>
		</div>
	);
};
