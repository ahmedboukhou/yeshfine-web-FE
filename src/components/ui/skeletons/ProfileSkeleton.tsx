export const ProfileSkeleton = () => {
	return (
		<div>
			{/* Top Profile Section */}
			<div className="flex-center space-y-2 flex-col -mt-15 mb-10 animate-pulse">
				<div className="h-30 w-30 rounded-full bg-gray-200 border-4 border-white" />
				<div className="h-4 w-40 bg-gray-200 rounded" />
				<div className="h-4 w-32 bg-gray-100 rounded" />
				<div className="h-6 w-20 bg-gray-100 rounded" />
			</div>

			{/* Tabs Section */}
			<div className="mt-5 space-y-4 animate-pulse">
				<div className="flex justify-center gap-4">
					<div className="h-8 w-24 bg-gray-200 rounded" />
					<div className="h-8 w-24 bg-gray-100 rounded" />
				</div>
			</div>

			{/* Profile Info Cards + Change Password */}
			<div className="grid grid-cols-2 gap-6 mb-6 mt-10 animate-pulse p-8">
				{/* DOB Card */}
				<div className="col-span-2 sm:col-span-1 h-15 bg-gray-100 rounded-lg p-4" />

				{/* Gender Card */}
				<div className="col-span-2 sm:col-span-1 h-15 bg-gray-100 rounded-lg p-4" />

				{/* Address Card */}
				<div className="col-span-2 h-15 bg-gray-100 rounded-lg p-4" />

				{/* Change Password */}
				<div className="col-span-2 h-16 bg-gray-100 rounded-lg p-4" />
			</div>
		</div>
	);
};
