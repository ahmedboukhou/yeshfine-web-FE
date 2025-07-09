export const DoctorDetailsSkeleton = () => (
	<div className="grid grid-cols-3 gap-8 animate-pulse">
		{Array.from({ length: 3 }).map((_, i) => (
			<div className="col-span-1 flex flex-col gap-1" key={i}>
				<div className="flex items-center gap-2">
					<div className="h-6 w-6 bg-gray-200 rounded-full" />
					<div className="h-4 w-24 bg-gray-200 rounded" />
				</div>
				<div className="h-3 w-full bg-gray-200 rounded" />
			</div>
		))}

		<div className="col-span-3">
			<div className="h-5 w-40 bg-gray-200 rounded mb-2" />
			<div className="space-y-2">
				<div className="h-3 w-full bg-gray-200 rounded" />
				<div className="h-3 w-11/12 bg-gray-200 rounded" />
				<div className="h-3 w-10/12 bg-gray-200 rounded" />
			</div>
		</div>

		<div className="col-span-3">
			<div className="h-5 w-40 bg-gray-200 rounded mb-2" />
			<div className="h-4 w-48 bg-gray-200 rounded mb-4" />
			<div className="w-full h-80 bg-gray-200 rounded-xl" />
		</div>
	</div>
);
