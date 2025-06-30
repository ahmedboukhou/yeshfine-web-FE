import { useEffect, useRef, type ReactNode } from 'react';

interface AvatarDropdownProps {
	items: {
		label: string;
		onClick: () => void;
	}[];
	title: ReactNode;
}

export const Dropdown = ({ items, title }: AvatarDropdownProps) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (window.HSStaticMethods && window.HSStaticMethods.autoInit) {
			window.HSStaticMethods.autoInit();
		}
	}, []);

	return (
		<div ref={dropdownRef} className="hs-dropdown relative inline-flex">
			<button
				id="hs-dropdown-default"
				type="button"
				className="hs-dropdown-toggle flex items-center gap-x-2 cursor-pointer"
				aria-haspopup="menu"
				aria-expanded="false"
				aria-label="Dropdown"
			>
				{title}
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
			</button>

			<div
				className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-30 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="hs-dropdown-default"
			>
				<div className="p-1 space-y-0.5">
					{items.map(({ label, onClick }) => (
						<p
							key={label}
							className="py-2 px-3 rounded-lg text-sm text-typography-700 hover:bg-primary-light-hover focus:outline-hidden cursor-pointer"
							onClick={onClick}
						>
							{label}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};
