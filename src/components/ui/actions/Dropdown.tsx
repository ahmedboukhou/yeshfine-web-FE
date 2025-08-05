import { useEffect, useRef, type ReactNode } from 'react';

interface AvatarDropdownProps {
	button: ReactNode;
	menu: ReactNode;
}

export const Dropdown = ({ menu, button }: AvatarDropdownProps) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (window.HSStaticMethods?.autoInit) {
			window.HSStaticMethods.autoInit();
		}
	}, []);

	return (
		<div ref={dropdownRef} className="hs-dropdown [--placement:bottom-right] relative inline-flex">
			<button type="button" className="hs-dropdown-toggle">
				{button}
			</button>

			<div className="z-50 hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-white shadow-md rounded-lg mt-2 absolute top-full right-0 min-w-max">
				{menu}
			</div>
		</div>
	);
};

