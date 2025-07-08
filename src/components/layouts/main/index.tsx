import { Outlet } from 'react-router';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { useGetDoctorSpecialtiesQuery } from '../../../apis/patient/doctors';
import { useDoctorSpecialtiesStore } from '../../../store/doctorSpecialties';
import { useEffect } from 'react';

export const MainLayout = () => {
	const { data, isSuccess } = useGetDoctorSpecialtiesQuery();
	const doctorSpecialties = data?.data?.doctorCategories || [];
	const { setSpecialties } = useDoctorSpecialtiesStore((state) => state);
	useEffect(() => {
		isSuccess && setSpecialties(doctorSpecialties);
	}, [doctorSpecialties, isSuccess]);

	return (
		<main className="min-h-screen bg-primary-light flex flex-col">
			<Navbar />
			<section className="flex-1 wrapper-container wrapper">
				<Outlet />
			</section>
			<Footer />
		</main>
	);
};
