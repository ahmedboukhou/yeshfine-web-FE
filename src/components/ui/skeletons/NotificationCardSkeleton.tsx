export const NotificationCardSkeleton = ({ count = 3 }: { count?: number }) => {
	return Array.from({ length: count }).map((_, index) => (
		<div
			key={index}
			className="rounded-2xl border border-border-1 p-4 flex items-center gap-4 bg-white animate-pulse"
		>
			{/* Icon */}
			<div className="card-box-shadow-2 size-12 rounded-full bg-gray-300 shrink-0" />

			{/* Text Content */}
			<div className="flex-1 space-y-2">
				<div className="flex justify-between items-center">
					<div className="h-4 w-1/3 bg-gray-300 rounded" />
					<div className="h-3 w-12 bg-gray-300 rounded" />
				</div>
				<div className="h-3 w-2/3 bg-gray-300 rounded" />
			</div>
		</div>
	));
};
