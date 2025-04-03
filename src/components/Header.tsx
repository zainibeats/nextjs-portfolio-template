"use client";

import { useState, useRef, useEffect } from 'react';
import { Menu, X, Github, Mail, Home } from 'lucide-react';
import { FaSpotify, FaSoundcloud, FaYoutube, FaLinkedin } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import React from 'react';

/**
 * Navigation items for the main menu
 * Each item requires:
 * - name: Display text for the link
 * - href: Target section ID (with # prefix)
 */
const navigation = [
  { name: 'Development', href: '#development' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Music', href: '#music' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' }
];

/**
 * Social media links configuration
 * Each item requires:
 * - name: Platform name for accessibility
 * - href: URL to your social profile
 * - icon: React component for the social icon
 * 
 * Note: Update these links with your actual profiles before deployment
 */
const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: <Github className="h-6 w-6" />,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@yourusername',
    icon: <FaYoutube className="h-5 w-5" />,
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/artist-id',
    icon: <FaSpotify className="h-5 w-5" />,
  },
  {
    name: 'SoundCloud',
    href: 'https://soundcloud.com/yourusername',
    icon: <FaSoundcloud className="h-5 w-5" />,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/profile-id',
    icon: <FaLinkedin className="h-5 w-5" />,
  },
  {
    name: 'Email',
    href: 'mailto:john@doe.com',
    icon: <Mail className="w-5 h-5" />,
  },
];

/**
 * Header component with responsive navigation
 * 
 * Features:
 * - Fixed position header that stays visible while scrolling
 * - Mobile-friendly hamburger menu with animations
 * - Smooth scrolling to page sections
 * - Social media links with proper accessibility
 * - Dark mode toggle integration
 * - Click outside and escape key handlers for menu
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /**
   * Handles smooth scrolling to target sections
   * Prevents default link behavior and uses smooth scrolling API
   */
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setIsMenuOpen(false);
    }
  };

  // Effect to handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Effect to handle Escape key press to close the menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  /**
   * Toggles between light and dark theme
   * Updates both the DOM class and localStorage preference
   */
  const handleThemeToggle = () => {
    const newDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  /**
   * Scrolls back to the top of the page with smooth animation
   */
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Prevents body scrolling when mobile menu is open while avoiding layout shifts
  useEffect(() => {
    if (isMenuOpen) {
      // Store original scroll position
      const scrollY = window.scrollY;
      
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Fix the body in place at its current scroll position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      
      // If there's a scrollbar width difference, add padding to prevent content shift
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Store scroll position for restoration
      document.body.dataset.scrollPosition = String(scrollY);
    } else {
      // Restore all styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
      
      // Restore scroll position
      const scrollY = parseInt(document.body.dataset.scrollPosition || '0');
      window.scrollTo(0, scrollY);
    }

    // Cleanup function
    return () => {
      // If we still have fixed positioning, clean it up and restore scroll
      if (document.body.style.position === 'fixed') {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';
        
        // Restore scroll position
        const scrollY = parseInt(document.body.dataset.scrollPosition || '0');
        window.scrollTo(0, scrollY);
      }
    };
  }, [isMenuOpen]);

  // Prevent all scroll events outside the menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const preventDefaultForScrollKeys = (e: KeyboardEvent) => {
      // Space, Page Up, Page Down, End, Home, Left, Up, Right, Down
      const keys = {32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1};
      
      if (keys[e.keyCode as keyof typeof keys]) {
        // Check if we're inside the menu
        const target = e.target as Node;
        if (menuRef.current && menuRef.current.contains(target)) {
          return; // Allow scrolling inside menu
        }
        e.preventDefault();
        return false;
      }
    };

    // Handle wheel events
    const preventWheel = (e: WheelEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    // Handle touch events
    const preventTouch = (e: TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    // Add all event listeners with passive: false to ensure preventDefault works
    window.addEventListener('wheel', preventWheel, { passive: false });
    window.addEventListener('touchmove', preventTouch, { passive: false });
    window.addEventListener('keydown', preventDefaultForScrollKeys, { passive: false });
    
    // Remove all listeners on cleanup
    return () => {
      window.removeEventListener('wheel', preventWheel);
      window.removeEventListener('touchmove', preventTouch);
      window.removeEventListener('keydown', preventDefaultForScrollKeys);
    };
  }, [isMenuOpen]);

  // Render the header with navigation and social links
  return (
    <>
      <header 
        className={`fixed w-screen left-0 bg-white/95 dark:bg-gray-900/95 z-[40] h-16 border-b border-gray-200 dark:border-gray-700 ${
          isMenuOpen ? 'backdrop-blur-sm' : ''
        }`} 
        style={{ position: 'fixed', top: 0 }}
      >
        <nav className="mx-auto flex h-full items-center justify-between px-4 sm:px-6 xl:px-8" aria-label="Global">
          <div className="flex xl:flex-1 items-center">
            <a 
              href="https://yourwebsite.com" // Replace with homepage URL
              className="flex items-center justify-center h-10 w-10 text-gray-900 dark:text-white hover:opacity-80 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Home className="h-6 w-6" />
            </a>
            <div className="h-6 mx-3 w-px bg-gray-200 dark:bg-gray-700 opacity-50" />
            <a href="#" className="text-xl sm:text-2xl font-bold whitespace-nowrap">
              John Doe
            </a>
          </div>
          <div className="flex xl:hidden">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
            >
              <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-900 dark:text-white" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900 dark:text-white" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hidden xl:flex xl:gap-x-8 px-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="flex items-center h-10 text-sm font-semibold leading-6 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden xl:flex xl:flex-1 xl:justify-end xl:gap-x-5">
            <div className="flex items-center h-10 mr-2">
              <ThemeToggle />
            </div>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-center h-10 w-10 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                aria-label={`Visit ${link.name}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </nav>
      </header>
      
      {/* Mobile menu and backdrop - positioned outside of header for proper z-index stacking */}
      <div className="xl:hidden">
        {/* Backdrop with blur effect - covers entire viewport */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            style={{ 
              zIndex: 50,
              top: '0', // Cover the entire viewport including header
              height: '100vh' // Full viewport height
            }}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Menu panel - positioned directly below header with matching styles */}
        {isMenuOpen && (
          <div 
            ref={menuRef}
            id="mobile-menu"
            className="fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] overflow-y-auto 
              bg-white dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700
              shadow-md touch-auto overscroll-contain"
            style={{ 
              zIndex: 100,
              WebkitOverflowScrolling: 'touch', // Enable momentum scrolling on iOS
              msOverflowStyle: 'none',  // Hide scrollbar in IE and Edge
              touchAction: 'pan-y', // Allow vertical touch scrolling specifically for this element
              position: 'fixed', // Ensure fixed positioning
              overscrollBehavior: 'contain' // Prevent scroll chaining
            }}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            onTouchMove={(e) => {
              // Allow scrolling only within the menu
              e.stopPropagation();
            }}
            onWheel={(e) => {
              // Prevent wheel events from propagating
              e.stopPropagation();
            }}
            onClick={(e) => {
              // Prevent click events from closing the menu when clicking inside it
              e.stopPropagation();
            }}
          >
            {/* Navigation Links */}
            <div className="space-y-2 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Navigation
              </div>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg 
                    text-gray-900 dark:text-white
                    hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="text-sm font-medium">{item.name}</span>
                </a>
              ))}
            </div>

            {/* Theme Toggle and Social Links */}
            <div className="mt-6 space-y-4">
              <button
                onClick={handleThemeToggle}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg 
                  text-gray-900 dark:text-white
                  hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle dark mode"
              >
                <ThemeToggle asChild />
                <span className="text-sm font-semibold">Toggle Theme</span>
              </button>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.name !== 'Email' ? '_blank' : undefined}
                    rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-center h-10 w-10 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full mx-auto"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label={`Visit ${link.name}`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>

              {/* Back to Top Button */}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="#"
                  onClick={handleScrollToTop}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg 
                    text-gray-900 dark:text-white
                    hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Back to top of page"
                >
                  <span className="text-sm font-medium">Back to Top</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}