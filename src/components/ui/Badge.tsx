const badgeVariants = {
	purple: 'text-purple bg-purple-light',
	warning: 'bg-warning-50 text-warning-700',
	primary: 'bg-primary-light text-primary',
	blue: 'bg-blue-50 text-blue-700',
};

const variantKeys = Object.keys(badgeVariants);

type BadgeVariant = keyof typeof badgeVariants;

interface BadgeProps {
	specialty?: string;
	variant?: BadgeVariant;
}

export const Badge = ({ specialty = 'Cardiologist', variant }: BadgeProps) => {
	const selectedVariant =
		variant && badgeVariants[variant]
			? badgeVariants[variant]
			: badgeVariants[variantKeys[Math.floor(Math.random() * variantKeys.length)] as BadgeVariant];

	return (
		<div>
			<span
				className={`text-nowrap capitalize px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold ${selectedVariant}`}
			>
				{specialty}
			</span>
		</div>
	);
};
