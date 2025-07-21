import { useRef, type FC } from 'react';
import { PaginationBackIcon, PaginationNextIcon } from '../../assets/icons';

type ScrollableList = {
	medicineCategories: { id: number; name: string }[];
	category: string;
	onCategoryChange: (name: string) => void;
};

export const ScrollableList: FC<ScrollableList> = ({
	medicineCategories,
	category,
	onCategoryChange,
}) => {
	const scrollRef = useRef<HTMLDivElement>(null);

	const scrollLeft = () => {
		scrollRef.current?.scrollBy({ left: -150, behavior: 'smooth' });
	};

	const scrollRight = () => {
		scrollRef.current?.scrollBy({ left: 150, behavior: 'smooth' });
	};
	return (
		<div className="relative w-full">
			<div
				ref={scrollRef}
				className="flex overflow-x-auto text-nowrap gap-3 scrollbar-hide scroll-smooth mx-10"
			>
				<button
					className={`!rounded-full ${
						category === ''
							? 'primary-btn !font-semibold !pointer-events-none'
							: 'pagination-btn !font-normal !px-4'
					}`}
					onClick={() => onCategoryChange('')}
				>
					All
				</button>
				{medicineCategories.map(({ id, name }) => (
					<button
						type="button"
						onClick={() => onCategoryChange(name)}
						className={`!rounded-full mr-0.5 ${
							category === name
								? 'primary-btn !font-semibold !pointer-events-none'
								: 'pagination-btn !font-normal !px-4'
						}`}
						key={id}
					>
						{name}
					</button>
				))}
			</div>

			<button
				onClick={scrollLeft}
				className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow h-full p-2 z-10 rounded-r-xl"
			>
				<PaginationBackIcon />
			</button>

			<button
				onClick={scrollRight}
				className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow h-full p-2 z-10 rounded-l-xl"
			>
				<PaginationNextIcon />
			</button>
		</div>
	);
};
