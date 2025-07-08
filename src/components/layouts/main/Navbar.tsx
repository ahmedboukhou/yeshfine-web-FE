import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';
import { NavToggleIcon, NotificationIcon } from '../../../assets/icons';
import logo from '../../../assets/logo.svg';
import {
	APPOINTMENTS_ROUTE,
	DOCTORS_ROUTE,
	HOME_ROUTE,
	LABS_ROUTE,
	PHARMACIES_ROUTE,
} from '../../../routes';
import useAuthStore from '../../../store/auth';
import { Dropdown } from '../../common/actions/Dropdown';

export const Navbar = () => {
	const location = useLocation();
	const { t } = useTranslation();
	const { logout } = useAuthStore((state) => state);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const patientHeaderOptions = [
		{ title: 'home', to: HOME_ROUTE },
		{ title: 'doctors', to: DOCTORS_ROUTE },
		{ title: 'labs', to: LABS_ROUTE },
		{ title: 'pharmacies', to: PHARMACIES_ROUTE },
		{ title: 'appointments', to: APPOINTMENTS_ROUTE },
	];

	const navbarOptions = [{ label: 'Logout', onClick: () => logout() }];

	const handleNavLinkClick = () => {
		setIsMobileMenuOpen(false); // close on link click
	};

	return (
		<header className="flex flex-wrap md:justify-start md:flex-nowrap w-full bg-white text-sm py-4 card-box-shadow">
			<nav className="wrapper-container w-full mx-auto px-4 flex-items-center basis-full flex-between-center">
				<Link to={HOME_ROUTE} className="md:order-1 flex-none cursor-pointer">
					<img src={logo} width={80} alt="yeshfine-logo" />
				</Link>

				<div className="md:order-3 flex-items-center gap-x-4">
					<div className="cursor-pointer">
						<NotificationIcon />
					</div>

					<Dropdown
						button={
							<div className=" flex-items-center gap-x-2 cursor-pointer">
								<img
									className="inline-block size-10 rounded-full cursor-pointer"
									src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
									alt="Avatar"
								/>
								<svg
									className="hs-dropdown-open:rotate-180 size-4"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="m6 9 6 6 6-6" />
								</svg>
							</div>
						}
						menu={
							<div className="p-1 space-y-0.5">
								{navbarOptions.map(({ label, onClick }) => (
									<p
										key={label}
										className="py-2 px-3 rounded-lg text-sm text-typography-700 hover:bg-primary-light-hover focus:outline-hidden cursor-pointer"
										onClick={onClick}
									>
										{label}
									</p>
								))}
							</div>
						}
					/>

					{/* Mobile Toggle Button */}
					<button
						type="button"
						className="flex justify-center items-center relative size-9 gap-x-2 rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none cursor-pointer md:hidden"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						<NavToggleIcon />
						<span className="sr-only">Toggle</span>
					</button>
				</div>

				{/* Desktop Nav Links */}
				<div className="hidden md:block md:order-2">
					<div className="flex flex-col gap-5 mt-5 md:flex-row md:items-center md:mt-0 md:ps-5">
						{patientHeaderOptions.map(({ title, to }) => {
							const isActive = location.pathname.startsWith(to);
							return (
								<Link
									className={`font-medium transition-colors duration-200 px-2 pb-1 ${
										isActive ? 'text-primary border-b-2' : 'text-typography-700 hover:text-black'
									}`}
									to={to}
									key={title}
								>
									{t(title)}
								</Link>
							);
						})}
					</div>
				</div>
			</nav>

			{isMobileMenuOpen && (
				<div className="fixed inset-0 bg-white z-50 flex-col flex-items-center justify-center md:hidden block transition-all duration-300">
					{/* Close button */}
					<button
						className="absolute top-4 right-4 text-xl cursor-pointer"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						&times;
					</button>

					<div className="flex flex-col gap-6 text-lg">
						{patientHeaderOptions.map(({ title, to }) => {
							const isActive = location.pathname.startsWith(to);
							return (
								<Link
									key={title}
									to={to}
									onClick={handleNavLinkClick}
									className={`text-center font-medium text-xl ${
										isActive ? 'text-primary' : 'text-gray-700'
									}`}
								>
									{title}
								</Link>
							);
						})}
					</div>
				</div>
			)}
		</header>
	);
};
