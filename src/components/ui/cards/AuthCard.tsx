import type { FC, ReactNode } from 'react';
import logo from '../../../assets/logo.svg';

export const AuthCardHeading: FC<{ heading: string; subHeading: string }> = ({
	heading,
	subHeading,
}) => {
	return (
		<div className="flex-center flex-col gap-3 text-center mb-12">
			<div>
				<img src={logo} alt="yeshfine-logo" className="mb-3" />
			</div>
			<h3 className="font-bold">{heading}</h3>
			<p className="text-typography-500">{subHeading}</p>
		</div>
	);
};

export const AuthCard: FC<{ children: ReactNode }> = ({ children }) => (
	<section className="p-4 sm:p-8 rounded-xl container mx-auto max-w-md card-box-shadow card-gradient">
		{children}
	</section>
);
