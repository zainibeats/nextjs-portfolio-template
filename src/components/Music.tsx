"use client";

import { Music as MusicIcon } from 'lucide-react';
import React from 'react';
import { useEffect, useState } from 'react';

// Spotify IDs
const SPOTIFY_ARTIST_ID = "1MF873qFvGywvDUQbldyMH"; // Replace with artist ID
const FAVORITE_TRACKS = [
  "1rZGCNPtqk6pXp5UKzV0WO",  // Replace with track-1 ID
  "0aLWxHReYqCjwJqvQQmkSb"  // Replace with track-2 ID
];

// Main Music component function
export default function Music() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check if dark mode is enabled
    const darkModeEnabled = document.documentElement.classList.contains('dark');
    setIsDarkMode(darkModeEnabled);

    // Listen for changes in dark mode
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const getSpotifyUrl = (id: string, type: 'artist' | 'track') => {
    const baseUrl = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`;
    return isDarkMode ? `${baseUrl}&theme=0` : baseUrl;
  };

  // Render the Music section with embedded Spotify and SoundCloud players
  return (
    <section id="music" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 flex items-center justify-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            <MusicIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            My Music
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Check out my tracks, SOUNDCLOUD PLAYLIST, and SPOTIFY SINGLES
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group animate-fade-in-up animation-delay-200">
            <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              Top Tracks
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <iframe
                key={`artist-${isDarkMode}`}
                style={{ borderRadius: '12px' }}
                src={getSpotifyUrl(SPOTIFY_ARTIST_ID, 'artist')}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full"
                sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              />
            </div>
          </div>
          
          <div className="group animate-fade-in-up animation-delay-400">
            <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              SOUNDCLOUD PLAYLIST
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <iframe 
                width="100%" 
                height="352" 
                scrolling="no" 
                frameBorder="no" 
                allow="autoplay" 
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1371809791&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                className="rounded-lg w-full"
              />
              <div className="text-xs text-gray-400 mt-2 font-light px-4 pb-4">
                <a 
                  href="https://soundcloud.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  ARTIST NAME
                </a>
                {' · '}
                <a 
                  href="https://soundcloud.com/cheyenne-zaini/sets/produced-by-zaini" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  PLAYLIST NAME
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 animate-fade-in-up animation-delay-600">
            <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              SPOTIFY SINGLES
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {FAVORITE_TRACKS.map((trackId) => (
                <div 
                  key={`track-${trackId}-${isDarkMode}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <iframe
                    style={{ borderRadius: '12px' }}
                    src={getSpotifyUrl(trackId, 'track')}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 