import React, { useState } from 'react';
import ContentBody from './ContentBody';
import PageHeader from './PageHeader';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface RootLayoutProps {
    children?: React.ReactNode;
    title?: string;
    description?: string;
    pageHeaderRightContent?: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, title, description, pageHeaderRightContent }) => {
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
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className={`flex flex-1 flex-col overflow-hidden transition-all duration-300`}>
                <Topbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6 dark:bg-[#141B26]">
                    {title && description && <PageHeader title={title} description={description} rightContent={pageHeaderRightContent} />}
                    <ContentBody>{children}</ContentBody>
                </main>
            </div>
        </div>
    );
};

export default RootLayout;
