import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ContentBody from './ContentBody';
import PageHeader from './PageHeader';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface RootLayoutProps {
    children?: React.ReactNode;
    title?: string | React.ReactNode;
    description?: string;
    pageHeaderRightContent?: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, title, description, pageHeaderRightContent }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    React.useEffect(() => {
        if (typeof title === 'string') {
            document.title = title;
        }
    }, [title]);

    return (
        <div className="flex h-screen">
            <Toaster />
            <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className={`flex flex-1 flex-col overflow-hidden transition-all duration-300`}>
                <Topbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 px-10 py-9 dark:bg-[#141B26]">
                    {title && <PageHeader title={title} description={description} rightContent={pageHeaderRightContent} />}
                    <ContentBody>{children}</ContentBody>
                </main>
            </div>
        </div>
    );
};

export default RootLayout;
