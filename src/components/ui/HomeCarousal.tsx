import AliceCarousel from 'react-alice-carousel';
import { useTranslation } from 'react-i18next';
import carousalBg from '../../assets/images/home-carousal-bg.jpg';
import docImg from '../../assets/images/home-carousal-doc.png';

export const HomeCarousal = () => {
	const { t } = useTranslation(['patient']);

	const slides = [
		{
			heading: 'specialistDoctors',
			description: 'scheduleWithTopDoctors',
			image: carousalBg,
		},
		{
			heading: 'specialistDoctors',
			description: 'scheduleWithTopDoctors',
			image: carousalBg,
		},
		{
			heading: 'specialistDoctors',
			description: 'scheduleWithTopDoctors',
			image: carousalBg,
		},
		{
			heading: 'specialistDoctors',
			description: 'scheduleWithTopDoctors',
			image: carousalBg,
		},
	];

	const items = slides.map((slide, index) => (
		<div
			key={index}
			className="relative h-[310px] overflow-hidden rounded-2xl"
			onDragStart={(e) => e.preventDefault()}
		>
			<img src={slide.image} alt={slide.heading} className="w-full h-full object-cover" />

			<div className="absolute top-15 left-8 text-white z-10 max-w-[60%]">
				<h1>{t('lookingFor')}</h1>
				<h1>{t(slide.heading)}?</h1>
				<h4 className="mt-3">{t(slide.description)}</h4>
				<button className="secondary-btn mt-6">{t('bookNow')}</button>
			</div>

			<div className="absolute top-0 right-0 md:right-10 h-full">
				<img src={docImg} alt="Doctor image" className="h-full object-contain" />
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
				animationDuration={1000}
				animationType="fadeout"
			/>
			{/* Move dots inside image */}
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
