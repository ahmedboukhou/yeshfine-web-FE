export const LabReportCardSkeleton = ({ count = 3 }: { count?: number }) => {
	return Array.from({ length: count }).map((_, index) => (
		<div
			key={index}
			className="p-4 bg-white rounded-2xl border border-border-1 col-span-12 md:col-span-6 xl:col-span-4 animate-pulse"
		>
			{/* Top section */}
			<div className="flex gap-2 mb-5">
				<div className="w-20 h-20 bg-gray-300 rounded-xl" />
				<div className="flex-1 space-y-2">
					<div className="flex justify-between items-center">
						<div className="h-5 w-32 bg-gray-300 rounded" />
						<div className="h-4 w-12 bg-gray-300 rounded" />
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-gray-300 rounded-full" />
						<div className="h-4 w-3/4 bg-gray-300 rounded" />
					</div>
					<div className="flex items-center gap-2">
						<div className="h-3 w-16 bg-gray-300 rounded" />
						<div className="h-5 w-20 bg-gray-300 rounded-full" />
					</div>
				</div>
			</div>

			{/* Report status */}
			<div className="border border-border-1 p-3 rounded-lg flex justify-between items-center gap-2 h-25">
				<div className="space-y-2">
					<div className="h-5 w-20 bg-gray-300 rounded-full" />
					<div className="h-3 w-40 bg-gray-300 rounded" />
				</div>
				<div className="w-10 h-10 bg-gray-300 rounded-full shrink-0" />
			</div>

			{/* Action buttons */}
			<div className="mt-4">
				<div className="grid grid-cols-2 gap-3">
					<div className="h-10 w-full bg-gray-300 rounded-lg" />
					<div className="h-10 w-full bg-gray-300 rounded-lg" />
				</div>
			</div>
		</div>
	));
};
