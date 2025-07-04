import { CalendarIcon } from '../../../assets/icons';
import { Rating } from '../Rating';

export const AppointmentCard = () => {
	return (
		<div className="p-5 bg-white rounded-2xl border border-black/10 w-sm">
			<div className="flex gap-2.5 ">
				<img
					className="inline-block size-11 rounded-full"
					src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
					alt="Avatar"
				/>

				<div className="flex-1">
					<div className="flex-between-center">
						<h5>Habiboulaye Diagna</h5>
						<Rating rating={'4.8'} />
					</div>

					<span className="text-typography-500">Neurologist | Mercy Hospital</span>

					<div className="mt-2.5 flex-between-center">
						<div className="flex gap-1">
							<CalendarIcon />

							<span className="text-typography-800">5 Oct</span>
						</div>

						<span className="text-primary bg-primary-light py-1 px-4 rounded-full">
							10:00 AM- 10:30 AM
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
