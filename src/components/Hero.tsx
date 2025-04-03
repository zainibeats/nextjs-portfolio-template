import { ArrowDown } from 'lucide-react';
import React from 'react';

/**
 * Personal information configuration
 * Replace these values with your own information before deployment
 * 
 * @property name - Your full name displayed in the hero section
 * @property title - Your professional titles/roles (comma separated)
 * @property description - Brief personal bio or professional summary
 * @property profileImage - Path to your profile image (recommended: square, 500x500px)
 */
const personalInfo = {
  name: "John Doe",
  title: "Title 1, Title 2, Title 3",
  description: "Vestibulum aliquet luctus velit a ultrices. Suspendisse scelerisque mauris sed tellus cursus posuere. Ut aliquam massa tempor luctus malesuada. Nullam suscipit, magna eu molestie vestibulum, lacus tellus mollis nunc, in mollis enim nisi id justo. Morbi ultrices condimentum sagittis.",
  profileImage: "assets/images/headshot-placeholder.jpg",
};

/**
 * Hero component - The landing section of the portfolio
 * 
 * Features:
 * - Prominent display of name and profile image
 * - Professional titles and brief bio
 * - Call-to-action buttons for navigation
 * - Animated elements for visual appeal
 * - Responsive design for all screen sizes
 * - Subtle background patterns and gradients
 */
export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* Background pattern overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 text-center">
        {/* Profile image with styling */}
        <img
          src={personalInfo.profileImage}
          alt={`${personalInfo.name}'s Profile`}
          className="mx-auto h-48 w-48 rounded-full object-cover mb-8 ring-4 ring-white dark:ring-gray-800 shadow-lg"
        />
        
        {/* Name with gradient text effect */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8 !leading-[1.1] pb-1 
            bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 
            dark:from-blue-400 dark:to-indigo-400 animate-fade-in-up">
          {personalInfo.name}
        </h1>
        
        {/* Professional titles with delayed animation */}
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up animation-delay-200">
          {personalInfo.title}
        </p>
        
        {/* Bio/description with delayed animation */}
        <p className="max-w-xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-12 animate-fade-in-up animation-delay-400">
          {personalInfo.description}
        </p>
        
        {/* Call-to-action buttons with delayed animation */}
        <div className="flex justify-center gap-4 animate-fade-in-up animation-delay-600">
          <a
            href="#development"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-300"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
        
        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ArrowDown className="w-6 h-6 text-gray-600 dark:text-gray-300 animate-bounce" />
        </div>
      </div>
    </div>
  );
}

// Render the Hero section with a welcoming message and call to action