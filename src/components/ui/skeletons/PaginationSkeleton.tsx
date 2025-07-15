export const PaginationSkeleton = () => {
	return (
		<nav
			className="flex justify-between items-center gap-x-1 pt-5 border-t border-t-border-1 animate-pulse"
			aria-label="Pagination"
		>
			{/* Previous Button Skeleton */}
			<div className="h-9 w-24 bg-gray-300 rounded-lg" />

			{/* Page Number Skeletons */}
			<div className="flex items-center gap-x-1">
				{Array.from({ length: 5 }).map((_, index) => (
					<div key={index} className="h-9 w-9 bg-gray-300 rounded-lg" />
				))}
			</div>

			{/* Next Button Skeleton */}
			<div className="h-9 w-24 bg-gray-300 rounded-lg" />
		</nav>
	);
};