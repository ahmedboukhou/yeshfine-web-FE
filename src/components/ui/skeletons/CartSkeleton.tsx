export const CartSkeleton = ({
	count = 2,
	itemsPerCart = 2,
}: {
	count?: number;
	itemsPerCart?: number;
}) => {
	return (
		<div className="card animate-pulse space-y-10">
			{Array.from({ length: count }).map((_, cartIndex) => (
				<div key={cartIndex} className="space-y-8">
					{/* Pharmacy name */}
					<div className="h-5 w-1/3 bg-gray-300 rounded mb-2" />

					{/* Cart items */}
					<div className="space-y-3 mt-3">
						{Array.from({ length: itemsPerCart }).map((_, itemIndex) => (
							<div
								key={itemIndex}
								className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200"
							>
								<div className="w-16 h-16 bg-gray-300 rounded-lg" />
								<div className="flex-1 space-y-2">
									<div className="h-4 w-1/2 bg-gray-300 rounded" />
									<div className="h-3 w-1/3 bg-gray-300 rounded" />
									<div className="h-3 w-1/4 bg-gray-300 rounded" />
								</div>
								<div className="h-4 w-10 bg-gray-300 rounded" />
							</div>
						))}
					</div>

					{/* Total & Pay Now */}
					<div className="card flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
						<div>
							<div className="h-3 w-12 bg-gray-300 rounded mb-2" />
							<div className="h-4 w-20 bg-gray-300 rounded" />
						</div>
						<div className="h-10 w-24 bg-gray-300 rounded-lg" />
					</div>
				</div>
			))}
		</div>
	);
};
