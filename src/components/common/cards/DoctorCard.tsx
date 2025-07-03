import { Fragment } from 'react';
import { Link } from 'react-router';
import {
	ActivityIcon,
	BookAppointmentIcon,
	BriefCaseIcon,
	HospitalIcon,
} from '../../../assets/icons';
import { DOCTORS_ROUTE } from '../../../routes';
import { Rating } from '../Rating';

export const Badge = () => (
	<div className="inline-flex flex-items-center px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-warning-50 text-warning-700">
		<span>Cardiologist</span>
	</div>
);

export const DoctorCard = () => {
	return (
		<Fragment>
			<div className="flex flex-col group  bg-white border border-border-1 rounded-2xl overflow-hidden hover:shadow-lg focus:outline-hidden focus:shadow-lg transition">
				<Link
					to={`${DOCTORS_ROUTE}/${23}`}
					className="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden hidden sm:block"
				>
					<Link to={`${DOCTORS_ROUTE}/1`}>
						<img
							className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
							src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
							alt="Card Image"
						/>
					</Link>
				</Link>
				<div className="sm:p-6 p-3">
					<Link to={`${DOCTORS_ROUTE}/${23}`} className="flex gap-3">
						<div className="block sm:hidden">
							<img
								src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
								width={80}
								className="h-full rounded-xl"
							/>
						</div>
						<div className="flex flex-col gap-3 flex-1">
							<div className="flex-between">
								<h5>Habiboulaye Diagna</h5>
								<Rating rating={4.8} />
							</div>
							<div className="flex-items-center gap-3">
								<Badge />
								<div className="gap-2 flex-items-center">
									<BriefCaseIcon />
									<span className="text-sm sm:text-xs xl:text-sm text-typography-500">
										Exp: 3+years
									</span>
								</div>
							</div>

							<div className="flex-between">
								<div className="flex-items-center gap-2">
									<HospitalIcon />
									<p className="text-typography-700 font-medium text-sm">Mercy Hospital</p>
								</div>
								<div className="flex-items-center">
									<ActivityIcon />
									<p className="text-warning-400 font-medium text-sm">1.0 km</p>
								</div>
							</div>
						</div>
					</Link>
					<button className="primary-btn w-full mt-6 flex-center gap-2 text-sm font-semibold">
						<BookAppointmentIcon />
						Book Appointment
					</button>
				</div>
			</div>
		</Fragment>
	);
};
