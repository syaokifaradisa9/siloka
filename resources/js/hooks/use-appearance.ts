import { useEffect } from 'react';

export function initializeTheme() {
  // Basic theme initialization for now
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(theme);
  }, []);
}