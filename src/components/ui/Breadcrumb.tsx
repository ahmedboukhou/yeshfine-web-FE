import type { FC } from 'react';
import { Link } from 'react-router';
import { RightArrowIcon } from '../../assets/icons';
import HomeIcon from '../../assets/icons/home-line.svg';
import { HOME_ROUTE } from '../../routes';

type BreadcrumbItem = {
	title: string;
	path: string;
};

export const Breadcrumb: FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
	return (
		<nav className="flex items-center gap-2 mb-5 lg:mb-10 text-sm flex-wrap">
			<Link to={HOME_ROUTE}>
				<img src={HomeIcon} alt="Home" />
			</Link>

			{items.map(({ path, title }, index) => {
				const isLast = index === items.length - 1;

				return (
					<div key={index} className="flex items-center gap-2">
						<RightArrowIcon />
						<Link
							to={path}
							className={
								isLast
									? 'text-primary pointer-events-none'
									: 'text-typography-600 hover:text-typography-900'
							}
						>
							{title}
						</Link>
					</div>
				);
			})}
		</nav>
	);
};
