"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import icons with SSR disabled
const Sun = dynamic(
  () => import('lucide-react').then(mod => mod.Sun),
  { ssr: false, loading: () => <div className="w-5 h-5" /> }
);

const Moon = dynamic(
  () => import('lucide-react').then(mod => mod.Moon),
  { ssr: false, loading: () => <div className="w-5 h-5" /> }
);

interface ThemeToggleProps {
  asChild?: boolean;
}

export default function ThemeToggle({ asChild = false }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved 
        ? saved === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false; // Default for SSR
  });

  // Handle mounting
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Add storage event listener for cross-tab sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        setIsDark(e.newValue === 'dark');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Return placeholder during SSR and initial mount
  if (!mounted) {
    return <div className="w-5 h-5" />;
  }

  if (asChild) {
    return (
      <span className="inline-block">
        {isDark ? (
          <Moon className="w-5 h-5" width={20} height={20} />
        ) : (
          <Sun className="w-5 h-5" width={20} height={20} />
        )}
      </span>
    );
  }

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="w-5 h-5" width={20} height={20} />
      ) : (
        <Sun className="w-5 h-5" width={20} height={20} />
      )}
    </button>
  );
}