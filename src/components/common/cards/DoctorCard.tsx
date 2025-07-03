import { Fragment } from 'react';
import { Link } from 'react-router';
import { BookAppointmentIcon, BriefCaseIcon, HospitalIcon, StarIcon } from '../../../assets/icons';
import { DOCTORS_ROUTE } from '../../../routes';

export const Badge = () => (
	<div className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-warning-50 text-warning-700">
		<span>Cardiologist</span>
	</div>
);

export const DoctorCard = () => {
	return (
		<Fragment>
			<div className="flex flex-col group  bg-white border border-border-1 rounded-2xl overflow-hidden hover:shadow-lg focus:outline-hidden focus:shadow-lg transition">
				<div className="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden hidden sm:block">
					<Link to={`${DOCTORS_ROUTE}/1`}>
						<img
							className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
							src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
							alt="Card Image"
						/>
					</Link>
				</div>
				<div className="sm:p-6 p-3">
          <div className='flex gap-3'>
          <div className='block sm:hidden'>
          <img 
							src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
          width={80}
          className='h-full rounded-xl'
          />
          </div>
					<div className="flex flex-col gap-3 flex-1">
						<div className="flex justify-between">
							<h3 className="text-lg font-semibold text-typography-800">Habiboulaye Diagana</h3>
							<div className="flex gap-2 items-center">
								<StarIcon />
								<span className="text-typography-700 font-medium">4.8</span>
							</div>
						</div>
						<div className="flex items-center flex-wrap gap-3">
							<Badge />
							<div className="flex gap-2">
								<BriefCaseIcon />
								<span className="text-sm text-typography-500">Exp: 3+years</span>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<HospitalIcon />
							<span className="text-typography-700 font-medium text-sm">Mercy Hospital</span>
						</div>
					</div>
          </div>
					<button className="primary-btn w-full mt-6 flex items-center justify-center gap-2 text-sm font-semibold">
						<BookAppointmentIcon />
						Book Appointment
					</button>
				</div>
			</div>
		</Fragment>
	);
};
