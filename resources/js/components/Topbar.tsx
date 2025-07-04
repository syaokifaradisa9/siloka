import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
import LightDarkModeToggle from './LightDarkModeToggle';
import Notification from './Notification';
import ProfilePanel from './ProfilePanel';

interface TopbarProps {
    title?: string;
}

const Topbar: React.FC<TopbarProps> = () => {
    const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
    const profileButtonRef = useRef<HTMLDivElement | null>(null);
    const { props } = usePage<SharedData>();
    const user = props.auth.user;

    return (
        <div className="flex w-full items-center justify-end rounded-none border-b border-gray-300 bg-gray-200 px-10 py-5 dark:border-gray-700 dark:bg-[#141B26]">
            <div className="flex items-center space-x-4">
                <Notification />
                <LightDarkModeToggle />
                <div className="relative ml-3">
                    <div
                        ref={profileButtonRef}
                        className="flex cursor-pointer items-center"
                        onClick={() => setIsProfilePanelOpen(!isProfilePanelOpen)}
                    >
                        <p className="text-[11pt] font-medium text-gray-800 dark:text-gray-100">{user.name}</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 h-4 w-4 text-gray-500 dark:text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    {isProfilePanelOpen && <ProfilePanel onClose={() => setIsProfilePanelOpen(false)} toggleButtonRef={profileButtonRef} />}
                </div>
            </div>
        </div>
    );
};

export default Topbar;
