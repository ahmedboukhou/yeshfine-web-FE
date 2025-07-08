export const Badge = ({ specialty = 'Cardiologist' }: { specialty?: string }) => (
	<div className="inline-flex flex-items-center px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-warning-50 text-warning-700">
		<span>{specialty}</span>
	</div>
);
