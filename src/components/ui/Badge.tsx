import type { ReactNode } from 'react';

const badgeVariants = {
	purple: 'text-purple bg-purple-light',
	warning: 'bg-warning-50 text-warning-700',
	primary: 'bg-primary-light text-primary',
	blue: 'bg-blue-50 text-blue-700',
	danger: 'bg-danger-50 text-danger-500',
};

const variantKeys = Object.keys(badgeVariants);

type BadgeVariant = keyof typeof badgeVariants;

interface BadgeProps {
	specialty?: string;
	icon?: ReactNode;
	variant?: BadgeVariant;
}

export const Badge = ({ specialty = 'Cardiologist', variant, icon }: BadgeProps) => {
	const selectedVariant =
		variant && badgeVariants[variant]
			? badgeVariants[variant]
			: badgeVariants[variantKeys[Math.floor(Math.random() * variantKeys.length)] as BadgeVariant];

	return (
		<div>
			<span
				className={`flex gap-1 w-fit  text-nowrap capitalize px-2.5 py-1.5 rounded-full !text-xs sm:text-sm font-semibold ${selectedVariant}`}
			>
				{icon}
				{specialty}
			</span>
		</div>
	);
};
