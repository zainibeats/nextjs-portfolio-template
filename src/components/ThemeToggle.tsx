"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

/**
 * Dynamically import icons with SSR disabled to prevent hydration mismatch
 * This improves performance and avoids client/server rendering differences
 * Loading placeholders maintain layout stability during loading
 */
const Sun = dynamic(
  () => import('lucide-react').then(mod => mod.Sun),
  { ssr: false, loading: () => <div className="w-5 h-5" /> }
);

const Moon = dynamic(
  () => import('lucide-react').then(mod => mod.Moon),
  { ssr: false, loading: () => <div className="w-5 h-5" /> }
);

/**
 * Props for the ThemeToggle component
 * @property asChild - When true, renders as a span instead of a button (for embedding in other UI components)
 */
interface ThemeToggleProps {
  asChild?: boolean;
}

/**
 * Theme toggle component with dark/light mode switching
 * 
 * Features:
 * - Persists theme preference in localStorage
 * - Syncs theme across browser tabs
 * - Defaults to system preference on first visit
 * - Avoids hydration mismatch with SSR-safe implementation
 * - Can be used as standalone button or embedded in other components
 * 
 * @param asChild - When true, renders as a span instead of a button
 */
export default function ThemeToggle({ asChild = false }: ThemeToggleProps) {
  // Track if component has mounted to prevent hydration issues
  const [mounted, setMounted] = useState(false);
  
  // Initialize theme state based on localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved 
        ? saved === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false; // Default for SSR
  });

  // Set mounted state after initial render
  useEffect(() => setMounted(true), []);

  // Apply theme changes to document and localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Sync theme preference across browser tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        setIsDark(e.newValue === 'dark');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Return placeholder during SSR and initial mount to prevent flash
  if (!mounted) {
    return <div className="w-5 h-5" />;
  }

  // Render as child component (no button wrapper)
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

  // Render as standalone button
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