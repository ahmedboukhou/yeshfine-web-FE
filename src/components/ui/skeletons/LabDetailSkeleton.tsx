export const LabDetailSkeleton = () => {
	return (
		<div className="animate-pulse">
			{/* Image */}
			<div className="h-72 w-full bg-gray-300 rounded-2xl" />

			{/* Card */}
			<div className="card mt-6">
				{/* Title + Button */}
				<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pt-4">
					<div className="flex items-center gap-4">
						<div className="h-6 w-40 bg-gray-300 rounded" />
						<div className="h-5 w-20 bg-gray-300 rounded" />
					</div>
					<div className="h-10 w-48 bg-gray-300 rounded" />
				</div>

				{/* Location Section */}
				<div className="mt-6 space-y-3">
					<div className="h-4 w-24 bg-gray-300 rounded" />
					<div className="h-4 w-3/4 bg-gray-300 rounded" />
					<div className="h-60 bg-gray-300 rounded-lg mt-5 mb-5" />
				</div>

				{/* Test Search & Grid */}
				<div className="mb-6">
					<div className="h-4 w-24 bg-gray-300 rounded mb-4" />
					<div className="h-10 w-full bg-gray-300 rounded mb-4" />

					{/* Test Cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{Array.from({ length: 3 }).map((_, index) => (
							<div key={index} className="p-3 bg-white rounded-lg card-box-shadow-2 space-y-3">
								<div className="flex justify-between items-center">
									<div className="h-4 w-1/2 bg-gray-300 rounded" />
									<div className="h-4 w-4 bg-gray-300 rounded-full" />
								</div>
								<div className="h-3 w-3/4 bg-gray-300 rounded" />
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<div className="w-4 h-4 bg-gray-300 rounded-full" />
										<div className="h-3 w-20 bg-gray-300 rounded" />
									</div>
									<div className="h-4 w-12 bg-gray-300 rounded" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
