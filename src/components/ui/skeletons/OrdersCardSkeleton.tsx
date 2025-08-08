export const OrdersCardSkeleton = ({ count }: { count: number }) =>
	Array.from({ length: count }).map((_) => (
		<div className="col-span-6 md:col-span-3 xl:col-span-2">
			<div className="p-4 bg-white rounded-2xl border border-border-1 animate-pulse">
				{/* Top Section with Image and Text */}
				<div className="flex gap-2 mb-5">
					<div className="w-20 h-20 rounded-xl bg-gray-200" />
					<div className="flex-1 space-y-2">
						<div className="flex justify-between">
							<div className="h-4 w-24 bg-gray-200 rounded" />
							<div className="h-4 w-10 bg-gray-100 rounded" />
						</div>
						<div className="flex gap-2 items-center">
							<div className="h-4 w-4 bg-gray-200 rounded-full" />
							<div className="h-4 w-32 bg-gray-100 rounded" />
						</div>
						<div className="flex gap-2 items-center">
							<div className="h-4 w-12 bg-gray-200 rounded" />
							<div className="h-5 w-24 bg-gray-100 rounded" />
						</div>
					</div>
				</div>

				<div className="border-t border-border-1 my-2" />

				{/* Order# and Date */}
				<div className="flex justify-between mb-3">
					<div className="h-4 w-28 bg-gray-200 rounded" />
					<div className="flex gap-2 items-center">
						<div className="h-4 w-4 bg-gray-200 rounded-full" />
						<div className="h-4 w-20 bg-gray-100 rounded" />
					</div>
				</div>

				{/* Payment Status and Amount */}
				<div className="flex justify-between items-center">
					<div className="h-6 w-20 bg-gray-200 rounded-full" />
					<div className="h-5 w-24 bg-gray-100 rounded" />
				</div>
			</div>
		</div>
	));
