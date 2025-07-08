import { useEffect, useRef, type ReactNode } from 'react';

interface AvatarDropdownProps {
	button: ReactNode;
	menu: ReactNode;
}

export const Dropdown = ({ menu, button }: AvatarDropdownProps) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (window.HSStaticMethods && window.HSStaticMethods.autoInit) {
			window.HSStaticMethods.autoInit();
		}
	}, []);

	return (
		<div ref={dropdownRef} className="hs-dropdown relative inline-flex">
			<button type="button" className="hs-dropdown-toggle">
				{button}
			</button>

			<div className="z-50 hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-30 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full">
				{menu}
			</div>
		</div>
	);
};
