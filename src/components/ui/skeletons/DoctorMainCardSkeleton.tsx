export const DoctorMainCardSkeleton = () => (
	<div className="relative bg-white rounded-2xl border border-border-1 min-h-44 overflow-hidden animate-pulse">
		{/* Gradient sidebar */}
		<div className="hidden md:block absolute left-0 top-0 h-full md:w-20 xl:w-40 bg-[linear-gradient(111deg,#1298BC_-37.21%,#88D702_115.79%)] rounded-l-2xl" />

		<div className="flex flex-col md:flex-row md:p-6 gap-2 p-3 relative z-10">
			{/* Avatar */}
			<div className="flex-center xl:ms-19">
				<div className="h-30 w-30 rounded-full bg-gray-200 border-4 border-white" />
			</div>

			{/* Content */}
			<div className="flex-1 flex flex-col items-center justify-center text-center md:justify-between md:flex-row md:text-left gap-3 w-full">
				{/* Left Side */}
				<div className="flex flex-col items-center md:items-start gap-2 w-full">
					<div className="flex gap-3 items-center">
						<div className="h-4 w-32 bg-gray-200 rounded" />
						<div className="h-4 w-16 bg-gray-200 rounded" />
					</div>
					<div className="h-4 w-24 bg-gray-200 rounded" />
				</div>

				{/* Button */}
				<div className="h-10 w-full md:w-40 bg-gray-200 rounded" />
			</div>
		</div>
	</div>
);
