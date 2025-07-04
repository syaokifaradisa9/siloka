import React from 'react';

interface PageHeaderProps {
    title: string;
    description: string;
    rightContent?: React.ReactNode;
}

export default function PageHeader({ title, description, rightContent }: PageHeaderProps) {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-gray-100">{title}</h1>
                <p className="text-gray-400">{description}</p>
            </div>
            {rightContent && <div>{rightContent}</div>}
        </div>
    );
}
