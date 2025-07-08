export const Badge = ({ specialty = 'Cardiologist' }: { specialty?: string }) => (
	<div>
		<span className="px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-warning-50 text-warning-700">
			{specialty}
		</span>
	</div>
);
