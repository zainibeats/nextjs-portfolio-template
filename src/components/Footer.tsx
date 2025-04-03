import { Github, Mail, Home } from 'lucide-react';
import React from 'react';
import { FaSpotify, FaSoundcloud, FaYoutube, FaLinkedin } from 'react-icons/fa';

/**
 * Footer component for the portfolio website
 * 
 * Features:
 * - Contact information and branding
 * - Quick navigation links to page sections
 * - Social media links with icons
 * - Copyright information
 * - Smooth scrolling functionality
 */
export default function Footer() {
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
    }
  };

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

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Footer content grid with responsive layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Branding and title section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">John Doe</h3>
            <p className="text-gray-600 dark:text-gray-300">
              TITLE 1 | TITLE 2 | TITLE 3
            </p>
          </div>
          
          {/* Quick navigation links section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Development', 'Skills', 'Experience', 'Music', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleSmoothScroll(e, `#${item.toLowerCase()}`)}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className="flex flex-col items-start pt-1">
                <a
                  href="https://yourwebsite.com" // Replace with homepage URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 w-fit text-gray-600 dark:text-gray-300 hover:opacity-80 transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span className="overflow-hidden transition-all duration-300 ease-out max-w-0 group-hover:max-w-[100px] opacity-0 group-hover:opacity-100">
                    Homepage
                  </span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social media links section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  aria-label={`${link.name} Profile`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Copyright section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 