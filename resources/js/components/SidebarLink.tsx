import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface SidebarLinkProps {
    icon: LucideIcon;
    text: string;
    isCollapsed: boolean;
    href: string;
    isActive?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon: Icon, text, isCollapsed, href, isActive }) => {
    return (
        <li>
            <Link
                href={href}
                className={`relative mb-2 flex items-center rounded-lg px-3 py-2 ${
                    isActive
                        ? 'bg-gray-100 font-semibold text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                        : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
                <Icon className={`${isCollapsed ? 'mr-0' : 'mr-3'} h-5 w-5 ${isActive ? '' : 'text-gray-600 dark:text-gray-400'}`} />
                {!isCollapsed && <span className="text-sm">{text}</span>}
                {isActive && !isCollapsed && (
                    <span className="absolute top-1/2 right-0 h-6 w-1 -translate-y-1/2 transform rounded-full bg-orange-500"></span>
                )}
            </Link>
        </li>
    );
};

export default SidebarLink;
