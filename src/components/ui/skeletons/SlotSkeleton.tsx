export const SlotSkeleton = () => (
	<div className="grid grid-cols-2 gap-3">
		{Array.from({ length: 4 }).map((_, index) => (
			<div
				key={index}
				className="col-span-2 xl:col-span-1 h-[42px] rounded-full w-full animate-pulse bg-gray-200"
			/>
		))}
	</div>
);
