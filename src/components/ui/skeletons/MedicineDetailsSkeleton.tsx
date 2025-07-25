import { MedicineCardSkeleton } from './MedicineCardSkeleton';

export const MedicineDetailsSkeleton = () => {
	return (
		<div className="bg-primary-light rounded-2xl pointer-events-none">
			<div className=" py-5 px-4 animate-pulse">
				{/* Content Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{/* Medicine Image */}
					<div className="bg-white rounded-lg flex items-center justify-center h-120 px-10">
						<div className="w-full h-full bg-gray-300 rounded-lg" />
					</div>

					{/* Medicine Info */}
					<div className="flex items-center">
						<div className="space-y-3 w-full">
							<div className="h-5 w-2/3 bg-gray-300 rounded" />
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
		</div>
	);
};
