import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <div className="min-h-screen bg-[#FDF8EE] relative overflow-hidden">
                {/* Background Illustrations */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-70 -z-10"></div>
                <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-green-100 rounded-lg opacity-70 -z-10"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-100 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-70 -z-10"></div>
                <div className="absolute top-1/3 right-1/3 w-36 h-36 bg-red-100 rounded-lg opacity-70 -z-10"></div>
                <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-purple-100 rounded-full opacity-70 -z-10"></div>
                <App {...props} />
            </div>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
