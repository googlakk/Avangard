'use client';

import { useState, ReactNode } from 'react';

interface Tab {
    id: string;
    label: string;
    icon?: string;
    content: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultTab?: string;
}

export default function Tabs({ tabs, defaultTab }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="border-b border-gray-200 mb-8">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                relative px-6 py-4 font-heading font-medium text-base whitespace-nowrap
                                transition-all duration-300 
                                ${activeTab === tab.id
                                    ? 'text-navy-900'
                                    : 'text-gray-500 hover:text-gray-700'
                                }
                            `}
                        >
                            {/* Icon */}
                            {tab.icon && (
                                <span className="inline-block mr-2 text-xl">
                                    {tab.icon}
                                </span>
                            )}

                            {/* Label */}
                            <span>{tab.label}</span>

                            {/* Active indicator */}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-900 animate-[scaleIn_0.3s_ease-out]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="animate-[fadeIn_0.4s_ease-out]">
                {activeTabContent}
            </div>
        </div>
    );
}
