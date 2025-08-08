import React, { useState } from 'react';

type Tab = {
	label: string;
	content: React.ReactNode;
};

interface TabsProps {
	tabs: Tab[];
	disabled?: boolean;
	defaultIndex?: number;
	center?: boolean;
	onChange?: (index: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({
	tabs,
	defaultIndex = 0,
	onChange,
	disabled,
	center,
}) => {
	const [activeIndex, setActiveIndex] = useState(defaultIndex);

	const handleTabClick = (index: number) => {
		setActiveIndex(index);
		onChange?.(index);
	};

	return (
		<div className="w-full">
			{/* Tab Headers */}
			<div className={`flex ${center ? 'justify-center' : ''}`}>
				{tabs.map((tab, index) => (
					<button
						key={index}
						disabled={disabled}
						onClick={() => handleTabClick(index)}
						className={`relative px-6 py-2 font-medium transition-colors duration-200 whitespace-nowrap
							${
								activeIndex === index
									? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary'
									: 'text-typography-600 hover:text-primary border-b border-border-1'
							}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Tab Content */}
			<div className="py-4">{tabs[activeIndex]?.content}</div>
		</div>
	);
};
