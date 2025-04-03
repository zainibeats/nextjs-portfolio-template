'use client';

import { useEffect, useState } from 'react';

/**
 * Client-side layout wrapper that handles theme initialization
 * 
 * Responsibilities:
 * 1. Detects and applies saved theme preference from localStorage
 * 2. Falls back to system preference if no saved theme exists
 * 3. Prevents theme flash on initial load with mounted state check
 * 4. Adds smooth transitions for theme changes
 * 
 * This component is critical for proper dark mode implementation
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Track if component has mounted on the client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply dark theme if explicitly saved as dark or if user prefers dark and no saved preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
    
    // Add smooth transition for theme changes, but only after initial load
    // This prevents flash of incorrect theme during page load
    setTimeout(() => {
      document.documentElement.classList.add('transition-colors');
      document.documentElement.classList.add('duration-300');
    }, 100);
    
    setMounted(true);
  }, []);

  // Avoid theme flash by rendering only after mounted on client
  // Shows a minimal placeholder during SSR and initial client load
  if (!mounted) {
    return <div className="min-h-screen bg-blue-100 dark:bg-gray-900"></div>;
  }

  return <>{children}</>;
} 