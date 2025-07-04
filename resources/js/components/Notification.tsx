import { Bell } from 'lucide-react';
import React, { useRef, useState } from 'react';
import NotificationPanel from './NotificationPanel';

const Notification: React.FC = () => {
    const [showPanel, setShowPanel] = useState(false);
    const bellRef = useRef<SVGSVGElement>(null);

    const togglePanel = () => {
        setShowPanel((prev) => !prev);
    };

    const closePanel = () => {
        setShowPanel(false);
    };

    return (
        <div className="relative">
            <Bell ref={bellRef} className="h-5 w-5 cursor-pointer text-gray-600 dark:text-gray-400" onClick={togglePanel} />
            {/* Placeholder for notification count/dropdown */}
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-[8px] text-white"></span>

            {showPanel && <NotificationPanel onClose={closePanel} toggleButtonRef={bellRef} />}
        </div>
    );
};

export default Notification;
