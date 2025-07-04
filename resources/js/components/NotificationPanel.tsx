import React, { useRef, useEffect } from 'react';

interface NotificationPanelProps {
    onClose: () => void;
    toggleButtonRef: React.RefObject<SVGSVGElement | null>;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose, toggleButtonRef }) => {
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
            className="ring-opacity-5 absolute right-0 z-50 mt-2 w-96 rounded-lg bg-white shadow-xl ring-1 ring-black focus:outline-none dark:bg-gray-800"
        >
            <div className="flex items-center justify-between border-b border-gray-50 px-4 py-3 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">Today</span>
            </div>
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <div className="block px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">No new notifications.</div>
                {/* Add more notification items here */}
            </div>
            <div className="border-t border-gray-200 px-4 py-3 text-right dark:border-gray-700">
                <button
                    onClick={onClose}
                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default NotificationPanel;
