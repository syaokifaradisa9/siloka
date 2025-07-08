import React from 'react';

interface PageHeaderProps {
    title: string | React.ReactNode;
    description?: string;
    rightContent?: React.ReactNode;
}

export default function PageHeader({ title, description, rightContent }: PageHeaderProps) {
    return (
        <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center space-x-2">
                {typeof title === 'string' ? (
                    <div>
                        <h1 className="text-[16pt] font-bold text-gray-900 dark:text-gray-300">{title}</h1>
                        {description && <p className="text-[11pt] font-thin text-gray-700 dark:text-gray-400">{description}</p>}
                    </div>
                ) : (
                    title
                )}
            </div>
            {rightContent && <div>{rightContent}</div>}
        </div>
    );
}
