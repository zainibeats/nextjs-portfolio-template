"use client";

import React, { useState } from 'react';
import {Code, Gamepad2, Palette, Network, Wrench } from 'lucide-react';
import Image from 'next/image';

// Define the GalleryItem interface for type safety
interface GalleryItem {
  src: string;
  alt: string;
  type: 'image' | 'video';
  posterSrc?: string; // Optional poster image for videos
}

// List of gallery items with their details
const galleryItems: GalleryItem[] = [
  { src: '/assets/images/project1.jpg', alt: 'Project Screenshot 1', type: 'image' },
  { 
    src: '/assets/videos/water_sim.mp4', 
    alt: 'Project Video 2', 
    type: 'video',
    posterSrc: '/assets/images/videoframe_3349.png' // Using the screenshot provided by the user
  },
  { src: '/assets/images/3drender.jpg', alt: 'Project Screenshot 3', type: 'image' },
  { src: '/assets/images/blender.jpg', alt: 'Project Screenshot 4', type: 'image' },
  { src: '/assets/images/firewall.jpg', alt: 'Project Screenshot 5', type: 'image' },
  { src: '/assets/images/homelab.jpg', alt: 'Code Screenshot 6', type: 'image' },
  { src: '/assets/images/codebase.jpg', alt: 'Code Screenshot 7', type: 'image' },
  { src: '/assets/images/project-collage.jpg', alt: 'Project Screenshot 8', type: 'image' },
  { src: '/assets/images/project1.jpg', alt: 'Album Cover Screenshot 9', type: 'image' },
];

// Define an array of skill categories, each with an icon and a list of relevant skills
const skills = [
  {
    category: "Development",
    icon: <Code className="w-6 h-6" />,
    items: ["Python", "Git", "Docker"]
  },
  {
    category: "Tools",
    icon: <Wrench className="w-6 h-6" />,
    items: ["Linux", "VMWare", "AI Prompt Engineering", "SSH"]
  },
  {
    category: "Networking",
    icon: <Network className="w-6 h-6" />,
    items: ["Firewalls", "Router Configuration", "DNS", "VPN"]
  },
  {
    category: "Game Development",
    icon: <Gamepad2 className="w-6 h-6" />,
    items: ["Godot & Unreal Engine", "Game & Level Design", "UI/UX"]
  },
];

// Main Skills component function
export default function Skills() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Skills & Talents
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skills.map((skillSet, index) => (
            <div 
              key={skillSet.category} 
              className="group bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up order-1 md:order-none"
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="text-blue-600 dark:text-blue-400 transition-colors duration-300 group-hover:scale-110 transform">
                  {skillSet.icon}
                </div>
                <h3 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {skillSet.category}
                </h3>
              </div>
              <ul className="space-y-2">
                {skillSet.items.map((skill) => (
                  <li 
                    key={skill} 
                    className="text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Gallery Card */}
          <div className="group bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up order-last md:order-none md:col-start-2 md:row-start-2">
            <div className="grid grid-cols-3 gap-2">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-md cursor-pointer"
                  onClick={() => setSelectedImage(item.src)}
                >
                  {item.type === 'image' ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transform transition-transform duration-300 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={item.src}
                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                        muted
                        playsInline
                        poster={item.posterSrc}
                        preload="metadata"
                        loop
                        controlsList="nodownload"
                        disablePictureInPicture
                        onMouseOver={(e) => {
                          // Only run on non-touch devices
                          if (window.matchMedia('(hover: hover)').matches) {
                            const video = e.currentTarget;
                            if (video.paused) {
                              video.play().catch(err => console.log('Playback failed:', err));
                            }
                          }
                        }}
                        onMouseOut={(e) => {
                          // Only run on non-touch devices
                          if (window.matchMedia('(hover: hover)').matches) {
                            const video = e.currentTarget;
                            if (!video.paused) {
                              video.pause();
                              video.currentTime = 0;
                            }
                          }
                        }}
                        onTouchStart={(e) => {
                          // Special handling for touch devices
                          const video = e.currentTarget;
                          if (video.paused) {
                            video.play().catch(err => console.log('Playback failed:', err));
                          } else {
                            video.pause();
                            video.currentTime = 0;
                          }
                        }}
                        onLoadedMetadata={(e) => {
                          // Ensure poster is displayed correctly
                          const video = e.currentTarget;
                          video.currentTime = 0;
                        }}
                      />
                      {/* Show play indicator on mobile */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:hidden">
                        <div className="w-12 h-12 bg-blue-500 bg-opacity-70 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Creative Card */}
          <div 
            className="group bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up order-2 md:order-none"
            style={{ animationDelay: '1000ms' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="text-blue-600 dark:text-blue-400 transition-colors duration-300 group-hover:scale-110 transform">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Creative
              </h3>
            </div>
            <ul className="space-y-2">
              {["Sound Design", "Music Production", "Photoshop", "After Effects", "Blender"].map((skill) => (
                <li 
                  key={skill} 
                  className="text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

  
      </div>

      {/* Image/Video Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-2xl">
            {selectedImage.endsWith('.mp4') ? (
              <video
                src={selectedImage}
                controls
                autoPlay
                playsInline
                preload="metadata"
                controlsList="nodownload"
                disablePictureInPicture
                className="w-full h-full rounded-lg"
              />
            ) : (
              <Image
                src={selectedImage}
                alt="Enlarged view"
                width={800}
                height={600}
                className="object-contain w-full h-full rounded-lg"
              />
            )}
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
    </section>
  );
} 