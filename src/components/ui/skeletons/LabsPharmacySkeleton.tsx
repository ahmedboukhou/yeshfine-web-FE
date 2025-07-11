export const LabsPharmacyCardSkeleton = ({ count = 4 }: { count?: number }) => {
	return Array.from({ length: count }).map((_, index) => (
		<div key={index} className="col-span-12 sm:col-span-6 xl:col-span-4">
			<div className="p-4 bg-white rounded-2xl border border-black/10 animate-pulse">
				{/* Image Placeholder */}
				<div className="w-full h-40 bg-gray-300 rounded-xl mb-3" />

				<div className="flex flex-col gap-2.5">
					{/* Title & Rating */}
					<div className="flex justify-between items-center">
						<div className="h-4 w-1/2 bg-gray-300 rounded" />
						<div className="h-4 w-12 bg-gray-300 rounded" />
					</div>

					{/* Location */}
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-gray-300 rounded-full" />
						<div className="h-4 w-3/4 bg-gray-300 rounded" />
					</div>

					{/* Status, Time, Distance */}
					<div className="flex justify-between items-center gap-2">
						<div className="h-4 w-10 bg-gray-300 rounded" />
						<div className="h-6 w-28 bg-gray-300 rounded-full" />
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 bg-gray-300 rounded-full" />
							<div className="w-12 h-4 bg-gray-300 rounded" />
						</div>
					</div>
				</div>
			</div>
		</div>
	));
};
