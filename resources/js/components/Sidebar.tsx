import { ChevronLeft, ChevronRight, LayoutDashboard, Users } from 'lucide-react';
import SidebarLink from './SidebarLink';
import { usePage } from '@inertiajs/react';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
    const { url } = usePage();

    return (
        <div
            className={`relative flex h-screen ${isCollapsed ? 'w-20' : 'w-64'} flex-col border-r border-gray-200 bg-white px-4 py-4 text-gray-900 shadow-sm transition-all duration-300 dark:border-gray-700 dark:bg-[#1E2939] dark:text-gray-100`}
        >
            <div className="mb-8 flex items-center justify-center">
                <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
                {/* {!isCollapsed && <h1 className="ml-2 text-xl font-bold">Siloka</h1>} */}
            </div>
            {/* Navigation */}
            <ul className="flex-1">
                <SidebarLink icon={LayoutDashboard} text="Dashboard" href="/dashboard" isCollapsed={isCollapsed} isActive={url === '/dashboard'} />
                <SidebarLink icon={Users} text="User" href="/users" isCollapsed={isCollapsed} isActive={url === '/users'} />
            </ul>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
                <button
                    onClick={toggleSidebar}
                    className={`flex h-8 cursor-pointer items-center justify-center rounded-full bg-transparent text-gray-600 hover:bg-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 ${isCollapsed ? 'w-8' : 'w-full px-4'}`}
                >
                    {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
            </div>
        </div>
    );
}
