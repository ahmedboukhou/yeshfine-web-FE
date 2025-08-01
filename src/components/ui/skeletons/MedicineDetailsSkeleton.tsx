import { MedicineCardSkeleton } from './MedicineCardSkeleton';

export const MedicineDetailCardSkeleton = () => {
	return (
		<div className="py-5 px-4 rounded-2xl pointer-events-none card animate-pulse">
			<div className="grid grid-cols-12 gap-4">
				{/* Left: Medicine Image */}
				<div className="rounded-lg flex items-center justify-center h-120 px-10 bg-gray-300 col-span-12 sm:col-span-7" />

				{/* Right: Medicine Info */}
				<div className="flex-items-center md:justify-center col-span-12 sm:col-span-5 space-y-2">
					<div className="space-y-2">
						<div className="h-5 w-3/4 bg-gray-300 rounded" />
						<div className="h-4 w-1/2 bg-gray-300 rounded" />
						<div className="w-full sm:w-xs h-10 bg-gray-300 rounded mt-2" />
					</div>
				</div>
			</div>

			{/* Divider */}
			<div className="border-t border-t-border-1 my-8" />

			{/* Popular Products */}
			<div className="space-y-3">
				<div className="h-5 w-1/4 bg-gray-300 rounded" />
				<div className="grid grid-cols-4 gap-4">
					<MedicineCardSkeleton count={4} />
				</div>
			</div>
		</div>
	);
};
