export const DoctorReviewsSkeleton = () => (
	<section className="animate-pulse">
		{Array.from({ length: 4 }).map((_, index) => (
			<div className="flex py-3 gap-3" key={index}>
				{/* Profile Image */}
				<div>
					<div className="size-12 rounded-2xl bg-gray-200" />
				</div>

				{/* Review Content */}
				<div className="flex-1 space-y-2">
					<div className="flex justify-between gap-3">
						<div className="h-4 w-24 bg-gray-200 rounded" />
						<div className="h-4 w-20 bg-gray-200 rounded" />
					</div>

					<div className="flex gap-2 items-center">
						<div className="h-4 w-24 bg-gray-200 rounded" />
						<div className="h-3 w-6 bg-gray-200 rounded" />
					</div>

					<div className="h-3 w-11/12 bg-gray-200 rounded" />
				</div>
			</div>
		))}
		{/* View More Button */}
		<div className="mt-4 flex justify-center">
			<div className="h-4 w-24 bg-gray-200 rounded" />
		</div>
	</section>
);
