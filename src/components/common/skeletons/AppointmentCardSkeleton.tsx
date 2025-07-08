export const AppointmentCardSkeleton = ({ count = 3 }: { count?: number }) => {
	return Array.from({ length: count }).map((_, index) => (
		<div
			key={index}
			className="p-5 bg-white rounded-2xl border border-black/10 w-full max-w-sm animate-pulse"
		>
			<div className="flex gap-2.5">
				{/* Avatar Skeleton */}
				<div className="inline-block size-11 bg-gray-300 rounded-full" />

				<div className="flex-1 space-y-2">
					{/* Name & Rating */}
					<div className="flex justify-between items-center">
						<div className="h-4 w-1/2 bg-gray-300 rounded" />
						<div className="h-4 w-10 bg-gray-300 rounded" />
					</div>

					{/* Specialty and Hospital */}
					<div className="h-3 w-3/4 bg-gray-300 rounded" />

					{/* Date and Time */}
					<div className="flex justify-between items-center mt-2.5">
						<div className="flex gap-2 items-center">
							<div className="w-4 h-4 bg-gray-300 rounded" />
							<div className="h-3 w-14 bg-gray-300 rounded" />
						</div>

						<div className="h-6 w-32 bg-gray-300 rounded-full" />
					</div>
				</div>
			</div>
		</div>
	));
};
