import { Github, Mail, Home } from 'lucide-react';
import React from 'react';
import { FaSpotify, FaSoundcloud, FaInstagram, FaYoutube } from 'react-icons/fa';

// Main Footer component function
export default function Footer() {
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
    }
  };

  // Define social links
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

  // Render the footer with quick links and social connections
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">John Doe</h3>
            <p className="text-gray-600 dark:text-gray-300">
              TITLE 1 | TITLE 2 | TITLE 3
            </p>
          </div>
          
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
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 