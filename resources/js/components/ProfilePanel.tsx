import { Link, usePage } from '@inertiajs/react';
import { LogOut, Settings, User } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ProfilePanelProps {
    onClose: () => void;
    toggleButtonRef: React.RefObject<HTMLDivElement>;
}

export default function ProfilePanel({ onClose, toggleButtonRef }: ProfilePanelProps) {
    const { props } = usePage();
    const user = props.auth.user;

    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node) &&
                toggleButtonRef.current && !toggleButtonRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose, toggleButtonRef]);

    return (
        <div
            ref={panelRef}
            className="ring-opacity-5 absolute right-0 z-50 mt-2 w-72 rounded-lg border border-gray-200 bg-white shadow-xl ring-1 ring-black focus:outline-none dark:border-gray-700 dark:bg-gray-800"
        >
            <div className="flex items-center p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-gray-600">
                    {user.name.charAt(0)}
                </div>
                <div className="ml-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
                <Link
                    href="/profile"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                    <User className="mr-3 h-5 w-5" />
                    Profile
                </Link>
                <Link
                    href="/settings"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                </Link>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="flex w-full items-center px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </Link>
            </div>
        </div>
    );
}
