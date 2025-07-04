import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from '../../../assets/icons';
import logo from '../../../assets/logo.svg';

export const Footer = () => {
	const footerOptions = [
		{ title: 'Home', href: '/about' },
		{ title: 'About Us', href: '/contact' },
		{ title: 'Services', href: '/privacy' },
		{ title: 'Contact Us', href: '/terms' },
	];
	const socialLinks = [
		{ href: '#', icon: <XIcon /> },
		{ href: '#', icon: <InstagramIcon /> },
		{ href: '#', icon: <LinkedInIcon /> },
		{ href: '#', icon: <FacebookIcon /> },
	];

	return (
		<footer>
			<div className="bg-white py-12">
				<div className="wrapper-container flex-between md:items-center flex-col md:flex-row gap-6">
					<img src={logo} width={80} className="cursor-pointer" alt="yeshfine-logo"/>
					<div className="flex gap-4 sm:gap-8 flex-col md:flex-row">
						{footerOptions.map(({ title, href }) => (
							<a
								key={title}
								href={href}
								className="text-typography-700 font-medium hover:text-black transition-colors duration-200"
							>
								{title}
							</a>
						))}
					</div>
					<div className="flex gap-6">
						{socialLinks.map(({ href, icon }, index) => (
							<a className="cursor-pointer" href={href} key={index}>
								{icon}
							</a>
						))}
					</div>
				</div>
			</div>

			<div className="bg-black text-white text-sm py-5">
				<div className="flex-between flex-col md:flex-row wrapper-container">
					<p className="cursor-pointer">
						© {new Date().getFullYear()} Yeshfine. All rights reserved.
					</p>
					<div className="flex gap-4">
						<a>Terms & Conditions</a>
						<a>Privacy Policies</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
