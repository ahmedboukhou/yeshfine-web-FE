export const MedicineCardSkeleton = ({ count = 2 }) =>
	[...Array(count)].map((_, i) => (
		<div
			key={i}
			className="border border-border-1 col-span-1 rounded-xl h-50 overflow-hidden flex flex-col bg-white"
		>
			<div className="h-24 bg-gray-300 rounded-t-xl" />
			<div className="p-2 space-y-1">
				<div className="h-4 w-16 bg-gray-300 rounded" />
				<div className="h-3 w-14 bg-gray-300 rounded" />
				<div className="h-3 w-3/4 bg-gray-300 rounded" />
			</div>
		</div>
	));
