import { ActivityIcon, LocationIcon } from '../../../assets/icons';
import { Rating } from '../Rating';

export const LabsPharmacyCard = () => {
	return (
		<div className="p-4 bg-white rounded-2xl border border-black/10">
			<img
				src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
				className="rounded-xl mb-3"
			/>

			<div className="flex flex-col gap-2.5">
				<div className="flex-between">
					<h5>MauriLab Express</h5>
					<Rating rating={"4.8"} />
				</div>

				<div className="gap-2 flex-items-center">
					<LocationIcon />
					<span className="text-typography-700">East side, Model Park J Block</span>
				</div>

				<div className="flex-between-center">
					<span className="text-xs text-primary">Open</span>

					<span className="text-primary bg-primary-light py-1 px-4 rounded-full">
						10:00 AM- 10:30 AM
					</span>

					<div className="flex-items-center">
						<ActivityIcon />
						<p className="text-warning-400 font-medium text-sm">1.0 km</p>
					</div>
				</div>
			</div>
		</div>
	);
};
