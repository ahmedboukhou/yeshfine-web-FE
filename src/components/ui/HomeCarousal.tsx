import AliceCarousel from 'react-alice-carousel';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import carousalBg from '../../assets/images/home-carousal-bg.jpg';
import patientCarousalImg1 from '../../assets/images/patient-carousal-1.png';
import patientCarousalImg2 from '../../assets/images/patient-carousal-2.png';
import patientCarousalImg3 from '../../assets/images/patient-carousal-3.png';
import { DOCTORS_ROUTE, LABS_ROUTE, PHARMACIES_ROUTE } from '../../routes';

export const HomeCarousal = () => {
	const { t } = useTranslation(['patient', 'common']);
	const navigate = useNavigate();
	const slides = [
		{
			heading: 'specialistDoctors',
			description: 'scheduleWithTopDoctors',
			image: patientCarousalImg1,
			link: DOCTORS_ROUTE,
		},
		{
			heading: 'bookLabTest',
			description: 'bookLabTestDescription',
			image: patientCarousalImg2,
			link: LABS_ROUTE,
		},
		{
			heading: 'findMedicines',
			description: 'findMedicinesDescription',
			image: patientCarousalImg3,
			link: PHARMACIES_ROUTE,
		},
	];

	const items = slides.map(({ description, heading, image, link }, index) => (
		<div
			key={index}
			className="relative h-[310px] overflow-hidden rounded-2xl"
			onDragStart={(e) => e.preventDefault()}
		>
			<img src={carousalBg} alt={heading} className="w-full h-full object-cover" />

			<div className="absolute top-15 left-8 text-white z-10 max-w-[60%]">
				<h1>{t(heading)}</h1>
				<p className="mt-3">{t(description)}</p>
				<button onClick={() => navigate(link)} className="secondary-btn mt-6">
					{t(index === 2 ? 'buyNow' : 'bookNow', { ns: 'common' })}
				</button>
			</div>

			<div className="absolute top-0 h-full max-w-[300px] sm:max-w-[350px] sm:right-10 right-2">
				<img src={image} alt={heading} className="h-full w-full object-contain" />
			</div>
		</div>
	));
	return (
		<div className="bg-white border border-border-1 p-4 sm:p-6 sm:pb-2 rounded-2xl">
			<AliceCarousel
				items={items}
				autoPlay
				infinite
				disableButtonsControls
				autoPlayInterval={3000}
				animationDuration={200}
				animationType="fadeout"
			/>
			<style>{`
            .alice-carousel__dots {
              position: ;
              bottom: 80px;
              left:50px;
              display:flex;
              justify-content: center;
              align-items: center;
              z-index: 10;
              margin-top:10px;
            }
  
            .alice-carousel__dots-item {
              background-color: white;
              opacity: 0.7;
              margin: 0 0px;
              transition: opacity 0.3s;
            }
  
            .alice-carousel__dots-item.__active {
              opacity: 1;
              background-color: #4caf50 !important;
              width:30px;
              border-radius:10px;
            }
              .alice-carousel__dots-item:not(.__custom):not(:last-child){
              margin-right:6px}
          `}</style>
		</div>
	);
};
