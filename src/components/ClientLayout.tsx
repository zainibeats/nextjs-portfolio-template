'use client';

import { useEffect, useState } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
    
    // Add smooth transition for theme changes, but only after initial load
    setTimeout(() => {
      document.documentElement.classList.add('transition-colors');
      document.documentElement.classList.add('duration-300');
    }, 100);
    
    setMounted(true);
  }, []);

  // Avoid theme flash by rendering only after mounted on client
  if (!mounted) {
    return <div className="min-h-screen bg-blue-100 dark:bg-gray-900"></div>;
  }

  return <>{children}</>;
} 