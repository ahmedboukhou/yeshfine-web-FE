import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router';
import { useChangeLanguageMutation } from '../../../apis/auth';
import {
	CloseIcon,
	LanguageIcon,
	NavToggleIcon,
	NotificationIcon,
	ProfileIcon,
	SignOutIcon,
} from '../../../assets/icons';
import logo from '../../../assets/logo.svg';
import { supportedLanguages } from '../../../constants/mappedData';
import i18n from '../../../i18n';
import {
	APPOINTMENTS_ROUTE,
	DOCTORS_ROUTE,
	HOME_ROUTE,
	LABS_ROUTE,
	PHARMACIES_ROUTE,
	PROFILE_ROUTE,
} from '../../../routes';
import useAuthStore from '../../../store/auth';
import { Dropdown } from '../../ui/actions/Dropdown';
import { useCurrentUserStore } from '../../../store/user';

export const Navbar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { logout } = useAuthStore((state) => state);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { currentUser } = useCurrentUserStore((state) => state);
	const { name, image } = currentUser || {};

	const patientHeaderOptions = [
		{ title: 'home', to: HOME_ROUTE },
		{ title: 'doctors', to: DOCTORS_ROUTE },
		{ title: 'labs', to: LABS_ROUTE },
		{ title: 'pharmacies', to: PHARMACIES_ROUTE },
		{ title: 'appointments', to: APPOINTMENTS_ROUTE },
	];

	const profileOptions = [
		{ label: t('profile'), icon: <ProfileIcon />, onClick: () => navigate(PROFILE_ROUTE) },
		{ label: t('signOut'), icon: <SignOutIcon />, onClick: () => logout() },
	];
	const { mutateAsync: updateLanguage } = useChangeLanguageMutation();
	const handleNavLinkClick = () => {
		setIsMobileMenuOpen(false); // close on link click
	};

	const handleChange = useCallback(
		async (value: string) => {
			i18n.changeLanguage(value);
			updateLanguage({ language: value });
		},

		[i18n]
	);

	return (
		<header className="flex flex-wrap md:justify-start md:flex-nowrap w-full bg-white text-sm py-4 card-box-shadow">
			<nav className="wrapper-container w-full mx-auto px-4 flex-items-center basis-full flex-between-center">
				<Link to={HOME_ROUTE} className="md:order-1 flex-none cursor-pointer">
					<img src={logo} width={80} alt="yeshfine-logo" />
				</Link>

				<div className="md:order-3 flex-items-center gap-x-4">
					<Dropdown
						button={<LanguageIcon />}
						menu={
							<div className="p-2 space-y-1">
								{supportedLanguages.map(({ title, flag, value }) => (
									<button
										onClick={() => handleChange(value)}
										disabled={i18n.language === value}
										className={`${
											i18n.language === value
												? 'bg-primary text-white'
												: 'text-typography-700 hover:bg-primary-light-hover'
										} flex-between-center gap-3 py-2 px-3 rounded-lg w-full`}
										key={value}
									>
										<img src={flag} alt={title} width={30} />

										<p className="text-sm">{title}</p>
									</button>
								))}
							</div>
						}
					/>
					<button>
						<NotificationIcon />
					</button>

					<Dropdown
						button={
							<div className=" flex-items-center gap-x-2 cursor-pointer">
								<img
									className="inline-block size-10 rounded-full cursor-pointer"
									src={
										image ??
										'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s'
									}
									alt={name}
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
							<div className="space-y-0.5 p-1">
								{profileOptions.map(({ label, onClick, icon }) => (
									<div
										onClick={onClick}
										key={label}
										className="py-2 px-3 flex-items-center rounded-lg gap-1 hover:bg-primary-light-hover focus:outline-hidden cursor-pointer"
									>
										{icon}
										<p className=" text-sm text-typography-700">{label}</p>
									</div>
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
				<div className="fixed inset-0 bg-primary-light z-50 flex-col flex-items-center justify-center md:hidden block transition-all duration-300">
					{/* Close button */}
					<button
						className="absolute top-4 right-4 text-xl cursor-pointer bg-white p-1 rounded-full"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						<CloseIcon />
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
									{t(title)}
								</Link>
							);
						})}
					</div>
				</div>
			)}
		</header>
	);
};
