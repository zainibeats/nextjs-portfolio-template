"use client";

import React, { useState } from 'react';
import { Download } from 'lucide-react';

/**
 * About component - Personal information and resume section
 * 
 * Features:
 * - Personal bio and professional summary
 * - Resume download functionality
 * - Alternative download option via popup
 * - Modal image viewer (when applicable)
 * - Smooth animations for visual appeal
 */
export default function About() {
  // State for controlling popup visibility
  const [showPopup, setShowPopup] = useState(false);
  
  // Base64 encoded URL - Replace with your actual encoded resume URL
  const encodedUrl = "BASE64 ENCODED URL";
  
  // State for handling image viewing in modal (if applicable)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  /**
   * Handles resume download button click
   * Shows popup with alternative download option
   * Opens the resume in a new tab using decoded URL
   */
  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 10000); // Auto-hide popup after 10 seconds
    
    // Decode and open the resume URL
    const decodedUrl = atob(encodedUrl);
    window.open(decodedUrl, '_blank', 'noopener,noreferrer');
  };

  // Render the About section with project bubbles and resume download button
  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            About Me
          </h2>
          
          {/* Bio paragraphs - Replace with your actual information */}
          <div className="max-w-3xl mx-auto text-mid space-y-4">
            <p className="text-lg text-gray-600 dark:text-gray-300">
            Vestibulum aliquet luctus velit a ultrices. Suspendisse scelerisque mauris sed tellus cursus posuere. Ut aliquam massa tempor luctus malesuada. 
            Nullam suscipit, magna eu molestie vestibulum, lacus tellus mollis nunc, in mollis enim nisi id justo. Morbi ultrices condimentum sagittis. 
            Phasellus rutrum pellentesque massa, et sollicitudin nisl consectetur in. Sed sem nunc, suscipit vel nunc vel, semper tincidunt massa. 
            Ut consequat, ante non rhoncus ullamcorper, est urna tempus mi, ac porttitor justo nisl et purus. Vivamus massa lacus, viverra eget tellus vitae, porta aliquam elit. 
            Fusce tortor mauris, efficitur eu ipsum ut, scelerisque sollicitudin elit. Maecenas viverra convallis lectus vel dictum. Donec at quam commodo, tincidunt mi sit amet, luctus nisi.
            Donec metus magna, blandit eu porta vitae, scelerisque vitae odio. Vivamus in interdum est, sit amet elementum purus.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 italic">
              "Suspendisse ac suscipit lectus. Nullam ut turpis scelerisque libero tempor viverra."
            </p>
          </div>
        </div>

        {/* Resume download section with animation */}
        <div className="text-center animate-fade-in-up relative" style={{ animationDelay: '800ms' }}>
          <a
            href="#"
            onClick={handleResumeClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>

          {/* Alternative download popup */}
          {showPopup && (
            <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-sm animate-fade-in-up z-50">
              <p className="text-gray-800 dark:text-gray-200 mb-3">
                Having trouble with CLOUD DRIVE? Click below for a direct download:
              </p>
              <a
                href="/assets/files/Public_Resume.pdf"
                download
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download directly
              </a>
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl font-bold"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Image modal viewer - only appears when an image is selected */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-2xl">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-auto rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 