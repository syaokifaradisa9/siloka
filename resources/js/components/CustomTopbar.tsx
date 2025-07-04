import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Notification from './Notification';
import ProfilePanel from './ProfilePanel';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import React, { useState, useRef } from 'react';

export default function CustomTopbar() {
    const { props } = usePage<SharedData>();
    const user = props.auth.user;

    const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
    const profileButtonRef = useRef<HTMLDivElement | null>(null);

    return (
        <header className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-gray-700 text-gray-100 border-gray-600 pl-8 placeholder:text-gray-400"
                />
            </div>
            <div className="flex items-center space-x-4">
                <Notification />
                <div className="relative ml-3">
                    <div ref={profileButtonRef} className="flex cursor-pointer items-center" onClick={() => setIsProfilePanelOpen(!isProfilePanelOpen)}>
                        <p className="text-[11pt] font-medium text-gray-100">{user.name}</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 h-4 w-4 text-gray-400"
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
        </header>
    );
}
