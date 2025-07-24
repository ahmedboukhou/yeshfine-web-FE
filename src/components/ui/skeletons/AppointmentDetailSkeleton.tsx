export const AppointmentDetailsSkeleton = () => {
	return (
		<div className="space-y-2 animate-pulse card">
			{/* Doctor Info Card */}
			<div className="p-4 bg-white rounded-lg card-box-shadow flex gap-4">
				<div className="h-16 w-16 bg-gray-300 rounded-full" />
				<div className="flex-1 space-y-2">
					<div className="h-4 w-1/2 bg-gray-300 rounded" />
					<div className="h-3 w-1/3 bg-gray-300 rounded" />
					<div className="h-3 w-16 bg-gray-300 rounded" />
				</div>
			</div>

			{/* Location Info */}
			<div className="p-4 bg-white rounded-lg card-box-shadow flex items-center gap-3">
				<div className="w-5 h-5 bg-gray-300 rounded-full" />
				<div className="h-4 w-2/3 bg-gray-300 rounded" />
			</div>

			{/* Schedule Date Card */}
			<div className="p-4 card-box-shadow rounded-lg space-y-4">
				<div className="h-4 w-28 bg-gray-300 rounded mb-5" />
				<div className="flex gap-5 items-center">
					<div className="bg-gray-300 p-6 rounded-lg w-12 h-12" />
					<div className="flex-1 space-y-2">
						<div className="h-3 w-1/3 bg-gray-300 rounded" />
						<div className="flex gap-2 items-center flex-wrap">
							<div className="h-4 w-40 bg-gray-300 rounded" />
							<div className="h-5 w-16 bg-gray-300 rounded-full" />
						</div>
					</div>
				</div>
			</div>

			{/* Type of Appointment */}
			<div className="p-4 card-box-shadow rounded-lg">
				<div className="h-4 w-32 bg-gray-300 rounded mb-5" />
				<div className="flex items-center gap-5">
					<div className="h-12 w-12 bg-gray-300 rounded-lg" />
					<div className="h-4 w-1/2 bg-gray-300 rounded" />
				</div>
			</div>

			{/* Reason for Visit */}
			<div className="p-4 card-box-shadow rounded-lg space-y-2">
				<div className="h-4 w-40 bg-gray-300 rounded mb-5" />
				<div className="h-3 w-full bg-gray-300 rounded" />
				<div className="h-3 w-5/6 bg-gray-300 rounded" />
			</div>
		</div>
	);
};
