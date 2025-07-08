import { useParams } from 'react-router';
import { useGetDoctorDetailQuery } from '../../../../apis/patient/doctors';
import { DoctorMainCard } from './DoctorMainCard';
import hospitalImg from '../../../../assets/icons/hospital.svg';
import timeImg from '../../../../assets/icons/time.svg';
import briefcaseImg from '../../../../assets/icons/briefcase.svg';
import feeImg from '../../../../assets/icons/fee.svg';
import tripleImg from '../../../../assets/icons/user-triple.svg';
import { useTranslation } from 'react-i18next';
import GoogleMapReact from 'google-map-react';

export const PatientDoctorDetail = () => {
	const { id } = useParams();
	const { t } = useTranslation(['common', 'patient']);
	const { data } = useGetDoctorDetailQuery({ id });
	console.log("🚀 ~ PatientDoctorDetail ~ data:", data)

	const docInfo = [
		{ img: hospitalImg, heading: t('hospital'), text: 'asd' },
		{ img: timeImg, heading: t('workingHour', { ns: 'patient' }), text: 'asd' },
		{ img: feeImg, heading: t('consultationFee', { duration: 30, ns: 'patient' }), text: 'asd' },
		{ img: briefcaseImg, heading: t('experience'), text: 'asd' },
		{ img: tripleImg, heading: t('treatedPatient', { ns: 'patient' }), text: 'asd' },
	];

	return (
		<main>
			<DoctorMainCard />
			<section className="mt-6 bg-white rounded-2xl border border-border-1 py-10 md:px-8 px-4">
				<div className="grid grid-cols-3 gap-8">
					{docInfo.map(({ img, heading, text }, index) => (
						<div className="col-span-1 flex flex-col gap-1" key={index}>
							<div className="flex-items-center gap-1">
								<img src={img} />
								<p className="text-typography-500 font-medium">{heading}</p>
							</div>
							<p>{text}</p>
						</div>
					))}
					<div className="col-span-3">
						<h5>{t('biography')}</h5>
						<p className="text-typography-500 mt-1">
							Dr. Patricia Ahoy specialist in Ear, Nose & Throat, and work in RS. Hermina Malang. It
							is a long established fact that a reader will be distracted by the readable content.
						</p>
					</div>

					<div className="col-span-3">
						<h5>{t('workLocation', { ns: 'patient' })}</h5>
						<p className="text-typography-500 mt-1">West Bank Alshifa Hospital</p>
						<div className="h-80 mt-5">
							<GoogleMapReact
								bootstrapURLKeys={{ key: '' }}
								defaultCenter={{
									lat: 10.99835602,
									lng: 77.01502627,
								}}
								defaultZoom={11}
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};
