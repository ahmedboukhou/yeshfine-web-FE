import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Outlet } from 'react-router';
import authImg1 from '../../assets/images/auth-image-1.jpg';
import authImg2 from '../../assets/images/auth-image-2.jpg';
import authImg3 from '../../assets/images/auth-image-3.jpg';
import authImg4 from '../../assets/images/auth-image-4.jpg';

const slides = [
	{
		heading: 'Book Lab Tests and Receive Results',
		description:
			'From finding doctors to getting prescriptions and lab results—Yeshfine brings it all together for you.',
		image: authImg1,
	},
	{
		heading: 'Find Medicines and Pharmacies',
		description: 'Search by medicine name and see where it’s available in stock.',
		image: authImg2,
	},
	{
		heading: 'Your Health. One App.',
		description:
			'From finding doctors to getting prescriptions and lab results—Yeshfine brings it all together for you.',
		image: authImg3,
	},
	{
		heading: 'Find Trusted Doctors Near You',
		description:
			'Search by specialty, location, or availability—and book your appointment in seconds.',
		image: authImg4,
	},
];

const items = slides.map((slide, index) => (
	<div key={index} className="relative h-screen pl-5 py-5" onDragStart={(e) => e.preventDefault()}>
		<img
			src={slide.image}
			alt={slide.heading}
			className="w-full object-cover object-top h-full rounded-2xl"
		/>
		<div className="absolute bottom-5 rounded-b-2xl p-8 h-48 text-white backdrop-blur-lg w-[calc(100%-20px)] bg-black/40">
			<h2 className="text-2xl font-bold">{slide.heading}</h2>
			<p className="text-sm">{slide.description}</p>
		</div>
	</div>
));

export const AuthLayout = () => {
	return (
		<main className="grid grid-cols-2 h-screen bg-primary-light">
			<div className="hidden lg:block relative">
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
              position: absolute;
              bottom: 80px;
              left:50px;
              display:flex;
              z-index: 10;
              margin:0px;
            }
  
            .alice-carousel__dots-item {
              background-color: white;
              opacity: 0.7;
              margin: 0 0px;
              border-radius: 0%;
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

			<div className="col-span-2 lg:col-span-1 flex-center px-5">
				<Outlet />
			</div>
		</main>
	);
};
