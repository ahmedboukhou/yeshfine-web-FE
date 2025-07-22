import { MedicineCardSkeleton } from './MedicineCardSkeleton';

export const PharmacyCardSkeleton = ({ count = 3 }: { count?: number }) => {
	return Array.from({ length: count }).map((_, index) => (
		<div key={index} className="col-span-12 sm:col-span-6 xl:col-span-4">
			<div className="p-4 bg-white rounded-2xl border border-border-1 animate-pulse">
				{/* Top section */}
				<div className="flex gap-2 mb-5">
					<div className="w-20 h-20 bg-gray-300 rounded-xl" />
					<div className="flex-1 space-y-2">
						<div className="flex justify-between items-center">
							<div className="h-5 w-32 bg-gray-300 rounded" />
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 bg-gray-300 rounded-full" />
								<div className="h-4 w-12 bg-gray-300 rounded" />
							</div>
						</div>

						<div className="flex items-center gap-2">
							<div className="w-4 h-4 bg-gray-300 rounded-full" />
							<div className="h-4 w-3/4 bg-gray-300 rounded" />
						</div>

						<div className="flex items-center gap-2">
							<div className="h-4 w-16 bg-gray-300 rounded" />
							<div className="h-5 w-20 bg-gray-300 rounded-full" />
						</div>
					</div>
				</div>

				{/* Products grid */}
				<div className="grid grid-cols-3 gap-2">
					<MedicineCardSkeleton />
				</div>
			</div>
		</div>
	));
};
