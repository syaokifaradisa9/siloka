import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <div className="relative min-h-screen overflow-hidden bg-[#FDF8EE]">
                {/* Background Illustrations */}
                <div className="absolute top-1/4 left-1/4 -z-10 h-32 w-32 rounded-full bg-blue-100 opacity-70"></div>
                <div className="absolute right-1/4 bottom-1/3 -z-10 h-40 w-40 rounded-lg bg-green-100 opacity-70"></div>
                <div className="absolute top-1/2 left-1/2 -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-100 opacity-70"></div>
                <div className="absolute top-1/3 right-1/3 -z-10 h-36 w-36 rounded-lg bg-red-100 opacity-70"></div>
                <div className="absolute bottom-1/4 left-1/3 -z-10 h-28 w-28 rounded-full bg-purple-100 opacity-70"></div>
                <App {...props} />
            </div>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
