"use client";

import { useState, useRef, useEffect } from 'react';
import { Menu, X, Github, Mail, Home } from 'lucide-react';
import { FaSpotify, FaSoundcloud, FaInstagram, FaYoutube } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import React from 'react';

// Define navigation and social links
const navigation = [
  { name: 'Development', href: '#development' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Music', href: '#music' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' }
];

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
    name: 'Instagram',
    href: 'https://instagram.com/yourusername',
    icon: <FaInstagram className="h-5 w-5" />,
  },
  {
    name: 'Email',
    href: 'mailto:john@doe.com',
    icon: <Mail className="w-5 h-5" />,
  },
];

// Main Header component function
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Function to handle smooth scrolling
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

  // Effect to handle clicks outside the menu
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

  // Effect to handle the Escape key for closing the menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Function to toggle the theme
  const handleThemeToggle = () => {
    const newDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  // Function to scroll to the top of the page
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Effect to lock scrolling when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Only lock body scrolling without affecting padding
      document.body.style.overflow = 'hidden';
      
      // No need to add padding-right as we've fixed the scrollbar in globals.css
    } else {
      // Restore scrolling when menu is closed
      document.body.style.overflow = '';
    }

    return () => {
      // Cleanup
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Render the header with navigation and social links
  return (
    <>
      <header className="fixed w-screen left-0 bg-white/95 dark:bg-gray-900/95 z-50 h-16 border-b border-gray-200 dark:border-gray-700">
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
        
        {/* Mobile menu */}
        <div className="xl:hidden">
          {/* Backdrop with blur effect - covers entire page except header/menu */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              style={{ zIndex: 40 }}
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
                shadow-md"
              style={{ zIndex: 50 }}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
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
      </header>
    </>
  );
}