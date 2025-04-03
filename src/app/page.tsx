"use client";

import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

// Dynamically import non-critical components using code splitting
// This improves initial load time by only loading these components when needed
const Development = lazy(() => import('@/components/Development'));
const Skills = lazy(() => import('@/components/Skills'));
const Experience = lazy(() => import('@/components/Experience'));
const Music = lazy(() => import('@/components/Music'));
const About = lazy(() => import('@/components/About'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

// Fallback loading component shown while lazy-loaded components are being fetched
// Uses animation for better user experience during loading states
const LoadingComponent = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-pulse w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full"></div>
  </div>
);

/**
 * Main homepage component that assembles all portfolio sections
 * Uses Suspense boundaries to enable progressive loading of content
 * Critical components (Header, Hero) are loaded immediately
 * Other sections are loaded as needed with loading indicators
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-blue-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<LoadingComponent />}>
          <Development />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <Music />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}