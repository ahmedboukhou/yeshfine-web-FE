import React, { useState } from "react";

type Tab = {
  label: string;
  content: React.ReactNode;
};

interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultIndex = 0, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);
  };

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`px-6 py-2 w-1/2 font-medium border-b-2 transition-colors duration-200 ${
              activeIndex === index
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">{tabs[activeIndex]?.content}</div>
    </div>
  );
};
