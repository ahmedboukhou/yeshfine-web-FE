export const DoctorCardSkeleton = ({ count = 1 }: { count?: number }) => {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
					<div className="flex flex-col bg-white border border-border-1 rounded-2xl overflow-hidden animate-pulse">
						{/* Image placeholder */}
						<div className="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden hidden sm:block">
							<div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-t-xl" />
						</div>

						<div className="sm:p-6 p-3">
							<div className="flex gap-3">
								{/* Small image placeholder for mobile */}
								<div className="block sm:hidden">
									<div className="w-20 h-20 bg-gray-300 rounded-xl" />
								</div>

								<div className="flex flex-col gap-3 flex-1">
									{/* Name & Rating */}
									<div className="flex-between-center">
										<div className="h-4 bg-gray-300 rounded w-1/2" />
										<div className="h-4 bg-gray-300 rounded w-12" />
									</div>

									{/* Badge and Experience */}
									<div className="flex-items-center gap-3">
										<div className="w-20 h-6 bg-gray-300 rounded-full" />
										<div className="flex-items-center gap-2">
											<div className="w-4 h-4 bg-gray-300 rounded-full" />
											<div className="w-24 h-4 bg-gray-300 rounded" />
										</div>
									</div>

									{/* Hospital and Distance */}
									<div className="flex justify-between">
										<div className="flex-items-center gap-2">
											<div className="w-4 h-4 bg-gray-300 rounded-full" />
											<div className="w-28 h-4 bg-gray-300 rounded" />
										</div>
										<div className="flex-items-center gap-2">
											<div className="w-4 h-4 bg-gray-300 rounded-full" />
											<div className="w-12 h-4 bg-gray-300 rounded" />
										</div>
									</div>
								</div>
							</div>

							{/* Button Placeholder */}
							<div className="w-full h-10 bg-gray-300 rounded-xl mt-6" />
						</div>
					</div>
				</div>
			))}
		</>
	);
};
