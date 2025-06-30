import { Outlet } from 'react-router';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const MainLayout = () => {
	return (
		<main className="min-h-screen bg-primary-light flex flex-col">
			<Navbar />
			<section className="flex-1 wrapper-container">
				<Outlet />
			</section>
			<Footer />
		</main>
	);
};
