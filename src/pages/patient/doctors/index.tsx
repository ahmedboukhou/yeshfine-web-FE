import { DoctorCard } from "../../../components/common/cards/DoctorCard";

export const PatientDoctors = () => {
	return <div className="grid grid-cols-12 gap-5">
			{[1, 2, 3, 3, 4].map(() => (
				<div className=" col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3">
					<DoctorCard />
				</div>
			))}
		</div>;
};
