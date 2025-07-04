import { ChevronLeft, ChevronRight, LayoutDashboard, Users } from 'lucide-react';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
    return (
        <div
            className={`relative flex h-screen ${isCollapsed ? 'w-20' : 'w-64'} flex-col border-r border-gray-200 bg-white px-4 py-4 text-gray-900 shadow-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100`}
        >
            <div className="mb-8 flex items-center justify-center">
                <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
                {/* {!isCollapsed && <h1 className="ml-2 text-xl font-bold">Siloka</h1>} */}
            </div>
            {/* Navigation */}
            <ul className="flex-1">
                <li className="relative mb-2 flex items-center rounded-lg bg-gray-100 px-3 py-2 font-semibold text-gray-900 dark:bg-gray-700 dark:text-gray-100">
                    <LayoutDashboard className={`${isCollapsed ? 'mr-0' : 'mr-3'} h-5 w-5`} />
                    {!isCollapsed && <span className="text-sm">Dashboard</span>}
                    {!isCollapsed && <span className="absolute top-1/2 right-0 h-6 w-1 -translate-y-1/2 transform rounded-full bg-orange-500"></span>}
                </li>
                <li className="mb-2 flex cursor-pointer items-center rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Users className={`${isCollapsed ? 'mr-0' : 'mr-3'} h-5 w-5 text-gray-600 dark:text-gray-400`} />
                    {!isCollapsed && <span className="text-sm">User</span>}
                </li>
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
