export const ProfileSkeleton = () => {
	return (
		<div className="space-y-8 animate-pulse p-7">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{/* Name */}
				<div className="h-14 bg-gray-200 rounded" />

				{/* Gender */}
				<div className="h-14 bg-gray-200 rounded" />

				{/* Phone */}
				<div className="sm:col-span-2 h-14 bg-gray-200 rounded" />

				{/* DOB */}
				<div className="h-14 bg-gray-200 rounded" />

				{/* Address */}
				<div className="sm:col-span-2 h-14 bg-gray-200 rounded" />
			</div>

			<div className="flex justify-end gap-5 mt-12">
				<div className="w-24 h-10 bg-gray-200 rounded" />
				<div className="w-24 h-10 bg-gray-300 rounded" />
			</div>
		</div>
	);
};
