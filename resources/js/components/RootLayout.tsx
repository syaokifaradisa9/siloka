import React, { useState } from 'react';
import ContentBody from './ContentBody';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface RootLayoutProps {
    children?: React.ReactNode;
    title?: string;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, title }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    React.useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className={`flex flex-1 flex-col overflow-hidden transition-all duration-300`}>
                <Topbar title={title} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-content-background">
                    <ContentBody>{children}</ContentBody>
                </main>
            </div>
        </div>
    );
};

export default RootLayout;
