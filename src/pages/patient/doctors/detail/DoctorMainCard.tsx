import { useTranslation } from 'react-i18next';
import { BookAppointmentIcon } from '../../../../assets/icons';
import { Rating } from '../../../../components/common/Rating';
export const DoctorMainCard = () => {
	const { t } = useTranslation(['patient']);

	return (
		<div className="relative bg-white rounded-2xl border border-border-1 min-h-44 overflow-hidden">
			<div className="hidden md:block absolute left-0 top-0 h-full md:w-20 xl:w-40 bg-[linear-gradient(111deg,#1298BC_-37.21%,#88D702_115.79%)] rounded-l-2xl" />

			<div className="flex flex-col md:flex-row md:p-6 gap-2 p-3 relative z-10">
				<div className="flex-center xl:ms-19">
					<img
						src="https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/12.jpg"
						alt="Doctor"
						className="h-30 w-30 rounded-full object-cover border-4 border-white"
					/>
				</div>
				<div className="flex-1 flex flex-col items-center justify-center text-center md:justify-between md:flex-row md:text-left gap-3">
					<div>
						<div className="flex gap-3">
							<h3 className="!text-typography-900">Amadou Oumar Sall</h3>
							<Rating rating="4.2" />
						</div>
						<div className="inline-block mt-2.5 px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-purple-light text-purple">
							<span>Ear, Nose & Throat specialist</span>
						</div>
					</div>
					<button className="primary-btn w-full md:w-auto flex-center gap-2">
						<BookAppointmentIcon />
						{t('bookAppointment')}
					</button>
				</div>
			</div>
		</div>
	);
};
