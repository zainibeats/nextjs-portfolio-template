"use client";

import { Code2, Server, Pencil, Globe } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { projects as devProjects } from '@/data/projects';
import Matter from 'matter-js';

// Define interfaces to ensure type safety for project data
interface GameProject {
  title: string;
  description: string;
  youtubeId?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
}

interface BubbleProject {
  title: string;
  description: string;
  color: string;
}

// Define interactive bubble projects for physics animation
const bubbleProjects: BubbleProject[] = [
  { title: "Frontend", description: "React & Next.js", color: "#3B82F6" },
  { title: "Backend", description: "Python & Node.js", color: "#10B981" },
  { title: "Tools", description: "Docker & Git", color: "#8B5CF6" },
];

// Showcasing game development project with detailed information
const gameProjects: GameProject[] = [
  {
    title: "PROJECT TITLE",
    description: "Morbi maximus justo non finibus malesuada. Vestibulum in velit commodo, aliquet lorem sit amet, pretium felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus",
    youtubeId: "nNsO1Ge7mPs",
    liveUrl: "https://link-to-live-demo",
    githubUrl: "https://github.com/yourusername/your-repo",
    tags: ["Engine", "Tool", "Technologies", "Style"]
  }
];

export default function Development() {
  // Using refs to manage the physics engine and animation state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const projectBubblesRef = useRef<Matter.Body[]>([]);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  // Calculate optimal grid columns based on project count
  const getGridClasses = (projectCount: number): string => {
    // For 3 projects: 1 column on small, 2 on medium, 3 on large screens
    if (projectCount === 3) return "grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16";
    
    // For 1 project: center it with max-width
    if (projectCount === 1) return "grid gap-8 mb-16 max-w-lg mx-auto";
    
    // For 2 projects: 1 column on small, 2 on medium+ screens
    if (projectCount === 2) return "grid gap-8 grid-cols-1 md:grid-cols-2 mb-16";
    
    // For 4+ projects: adaptive grid that fills available space
    return "grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16";
  };

  // Set up a resize observer to handle responsive layout changes
  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current.parentElement;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      initPhysics(width, height);
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Initialize the physics engine with custom parameters for smooth animations
  const initPhysics = (width: number, height: number) => {
    if (!canvasRef.current) return;
    const container = canvasRef.current.parentElement;
    if (!container) return;

    // Clean up existing engine
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
    }

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;

    // Create engine with zero gravity
    const engine = Engine.create({
      gravity: { x: 0, y: 0, scale: 0 }
    });
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: Math.min(window.devicePixelRatio, 2)
      }
    });

    // Calculate positions
    const centerX = width / 2;
    const spacing = height / (bubbleProjects.length + 1);
    const maxOffset = Math.min(100, width * 0.12);

    // Create bubbles in their final positions
    const bubbles = bubbleProjects.map((_, index) => {
      const y = spacing * (index + 1);
      const xOffset = index % 2 === 0 ? -maxOffset : maxOffset;
      
      const bubble = Bodies.circle(centerX + xOffset, y, 40, {
        restitution: 0.2,
        friction: 0.01,
        density: 0.02,
        frictionAir: 0.01,
        render: { fillStyle: 'transparent' },
        isStatic: true // Start static
      });

      // Set exact position
      Matter.Body.setPosition(bubble, {
        x: centerX + xOffset,
        y: y
      });

      return bubble;
    });
    projectBubblesRef.current = bubbles;

    // Add bubbles to world
    World.add(engine.world, bubbles);

    // Start engine and renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Make bubbles dynamic after a short delay
    setTimeout(() => {
      bubbles.forEach(bubble => {
        Matter.Body.setStatic(bubble, false);
      });
      setIsInitialized(true);
    }, 100);

    // Add gentle forces for movement
    const applyForces = () => {
      if (!isInitialized) return;
      bubbles.forEach((bubble, index) => {
        const force = 0.002;
        const angle = (Date.now() * 0.001) + (index * Math.PI / 2);
        
        Matter.Body.applyForce(bubble, bubble.position, {
          x: Math.cos(angle) * force,
          y: Math.sin(angle) * force
        });
      });
      requestAnimationFrame(applyForces);
    };
    applyForces();

    // Animation loop for updating positions
    const updateElements = () => {
      bubbleRefs.current.forEach((el, index) => {
        const body = projectBubblesRef.current[index];
        if (el && body) {
          el.style.transform = `translate(
            ${body.position.x - el.offsetWidth/2}px, 
            ${body.position.y - el.offsetHeight/2}px
          )`;
        }
      });
      animationFrameRef.current = requestAnimationFrame(updateElements);
    };
    updateElements();

    // Handle window resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const newSpacing = newHeight / (bubbleProjects.length + 1);
      const newMaxOffset = Math.min(100, newWidth * 0.12);
      const newCenterX = newWidth / 2;

      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      render.options.width = newWidth;
      render.options.height = newHeight;

      // Update bubble positions
      bubbles.forEach((bubble, index) => {
        const newY = newSpacing * (index + 1);
        const newX = newCenterX + (index % 2 === 0 ? -newMaxOffset : newMaxOffset);
        
        Matter.Body.setPosition(bubble, {
          x: newX,
          y: newY
        });
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (runner) {
        Matter.Runner.stop(runner);
      }
      if (render) {
        Matter.Render.stop(render);
      }
      if (engine.world) {
        Matter.World.clear(engine.world, false);
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
      engineRef.current = undefined;
    };
  };

  // Add useEffect to set the URL after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setYoutubeUrl(`https://www.youtube.com/embed/${gameProjects[0].youtubeId}?autoplay=0&rel=0&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}&widget_referrer=${encodeURIComponent(window.location.href)}`);
    }
  }, []);

  return (
    <section id="development" className="py-24 bg-gray-50 dark:bg-gray-800">
      {/* Structure development section with a clear hierarchy */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Use a centered header to introduce my development work */}
        <div className="text-center animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 flex items-center justify-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            Development Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Here are some of my recent development projects and contributions
          </p>
  
        </div>

        {/* Showcase game development project with a video demo */}
        <div className="grid gap-8 mb-16">
          {gameProjects.map((project, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 will-change-transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Download
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View Source
                      </a>
                    )}
                  </div>
                </div>
                {project.youtubeId && (
                  <div className="relative aspect-video md:aspect-auto">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={youtubeUrl || `https://www.youtube.com/embed/${project.youtubeId}?autoplay=0&rel=0`}
                      title={project.title}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Display development projects in a responsive grid */}
        <div className={getGridClasses(devProjects.length)}>
          {devProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 will-change-transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              {project.image && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Network-style layout for additional projects */}
        <div className="mt-16 relative">
          <h3 className="text-2xl text-center font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
            More Projects & Skills
          </h3>
          
          <div className="relative max-w-4xl mx-auto min-h-[600px] px-0 sm:px-12 overflow-hidden group/cards pointer-events-none">
            {/* Network connecting lines with animated energy beams */}
            <div className="absolute inset-0 opacity-40 dark:opacity-30 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  {/* Create linear gradients for the beams */}
                  <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
                  </linearGradient>
                  
                  {/* Create a filter for the glow effect */}
                  <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  
                  {/* Define paths for the animateMotion elements to follow */}
                  <path id="path-top-to-right" d="M20,20 L80,50" />
                  <path id="path-right-to-bottom" d="M80,50 L20,80" />
                  <path id="path-mobile-top-to-middle" d="M45,15 L55,45" />
                  <path id="path-mobile-middle-to-bottom" d="M55,45 L45,85" />
                </defs>
                
                {/* Desktop lines with animations */}
                <g className="hidden sm:block">
                  {/* Line 1: Top left to right */}
                  <line 
                    x1="20" y1="20" x2="80" y2="50" 
                    stroke="url(#beam-gradient)" 
                    strokeWidth="1.5" 
                    filter="url(#glow-effect)"
                    strokeDasharray="4 2"
                    className="energy-beam beam-1"
                  />
                  
                  {/* Line 2: Right to bottom left */}
                  <line 
                    x1="80" y1="50" x2="20" y2="80" 
                    stroke="url(#beam-gradient)" 
                    strokeWidth="1.5" 
                    filter="url(#glow-effect)"
                    strokeDasharray="4 2"
                    className="energy-beam beam-2"
                  />
                  
                  {/* Data packets using animateMotion to follow paths exactly */}
                  <circle r="2" fill="#3B82F6" filter="url(#glow-effect)" className="data-packet">
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      calcMode="linear"
                      keyPoints="0;1;0"
                      keyTimes="0;0.73;1"
                    >
                      <mpath xlinkHref="#path-top-to-right" />
                    </animateMotion>
                    <animate
                      attributeName="fill"
                      values="#3B82F6;#3B82F6;#4ADE80;#4ADE80"
                      keyTimes="0;0.73;0.75;1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0.8;0.5;0.2;0"
                      keyTimes="0;0.15;0.5;0.73;0.85;0.95;1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="r"
                      values="2;2;2;2.5;2;1.5;1"
                      keyTimes="0;0.15;0.5;0.73;0.85;0.95;1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  <circle r="2" fill="#3B82F6" filter="url(#glow-effect)" className="data-packet">
                    <animateMotion
                      dur="3.5s"
                      begin="1s"
                      repeatCount="indefinite"
                      calcMode="linear"
                      keyPoints="0;1;0"
                      keyTimes="0;0.73;1"
                    >
                      <mpath xlinkHref="#path-right-to-bottom" />
                    </animateMotion>
                    <animate
                      attributeName="fill"
                      values="#3B82F6;#3B82F6;#4ADE80;#4ADE80"
                      keyTimes="0;0.73;0.75;1"
                      dur="3.5s"
                      repeatCount="indefinite"
                      begin="1s"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0.8;0.5;0.2;0"
                      keyTimes="0;0.15;0.5;0.73;0.85;0.95;1"
                      dur="3.5s"
                      repeatCount="indefinite"
                      begin="1s"
                    />
                    <animate
                      attributeName="r"
                      values="2;2;2;2.5;2;1.5;1"
                      keyTimes="0;0.15;0.5;0.73;0.85;0.95;1"
                      dur="3.5s"
                      repeatCount="indefinite"
                      begin="1s"
                    />
                  </circle>
                </g>
                
                {/* Mobile lines with animations */}
                <g className="sm:hidden">
                  {/* Line 1: Top to middle */}
                  <line 
                    x1="45" y1="15" x2="55" y2="45" 
                    stroke="url(#beam-gradient)" 
                    strokeWidth="1.5" 
                    filter="url(#glow-effect)"
                    strokeDasharray="4 2"
                    className="energy-beam beam-1"
                  />
                  
                  {/* Line 2: Middle to bottom */}
                  <line 
                    x1="55" y1="45" x2="45" y2="85" 
                    stroke="url(#beam-gradient)" 
                    strokeWidth="1.5" 
                    filter="url(#glow-effect)"
                    strokeDasharray="4 2"
                    className="energy-beam beam-2"
                  />
                  
                  {/* Data packets using animateMotion to follow paths exactly */}
                  <circle r="2" fill="#3B82F6" filter="url(#glow-effect)" className="data-packet">
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      calcMode="linear"
                      keyPoints="0;1;0"
                      keyTimes="0;0.73;1"
                    >
                      <mpath xlinkHref="#path-mobile-top-to-middle" />
                    </animateMotion>
                    <animate
                      attributeName="fill"
                      values="#3B82F6;#3B82F6;#4ADE80;#4ADE80"
                      keyTimes="0;0.73;0.75;1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0.8;0.5;0.2;0"
                      keyTimes="0;0.15;0.5;0.73;0.85;0.95;1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="r"
                      values="2;2;2;2.5;2;1.5;1"
                      keyTimes="0;0.15;0.5;0.73;0.85;0.95;1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  <circle r="2" fill="#3B82F6" filter="url(#glow-effect)" className="data-packet">
                    <animateMotion
                      dur="3.5s"
                      begin="1s"
                      repeatCount="indefinite"
                      calcMode="linear"
                      keyPoints="0;1;0"
                      keyTimes="0;0.73;1"
                    >
                      <mpath xlinkHref="#path-mobile-middle-to-bottom" />
                    </animateMotion>
                    <animate
                      attributeName="fill"
                      values="#3B82F6;#3B82F6;#4ADE80;#4ADE80"
                      keyTimes="0;0.73;0.75;1"
                      dur="3.5s"
                      repeatCount="indefinite"
                      begin="1s"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0.8;0.5;0.2;0"
                      keyTimes="0;0.15;0.5;0.73;0.85;0.95;1"
                      dur="3.5s"
                      repeatCount="indefinite"
                      begin="1s"
                    />
                    <animate
                      attributeName="r"
                      values="2;2;2;2.5;2;1.5;1"
                      keyTimes="0;0.15;0.5;0.73;0.85;0.95;1"
                      dur="3.5s"
                      repeatCount="indefinite"
                      begin="1s"
                    />
                  </circle>
                </g>
              </svg>
            </div>
          
            {/* Simplified styles for energy beams - packet animations now handled by SVG */}
            <style jsx>{`
              .energy-beam {
                opacity: 0.7;
              }
              
              .beam-1 {
                animation: dashOffset 3s linear infinite;
              }
              
              .beam-2 {
                animation: dashOffset 4s linear infinite;
              }
              
              .data-packet {
                opacity: 0.8;
              }
              
              @keyframes dashOffset {
                0% {
                  stroke-dashoffset: 30;
                }
                100% {
                  stroke-dashoffset: 0;
                }
              }
            `}</style>

            {/* API Integration - Top */}
            <div 
              className="absolute left-0 xs:left-[5%] sm:left-[20%] top-[5%] transform -translate-x-0 xs:-translate-x-1/2 sm:-translate-x-1/2 
                w-[min(260px,85vw)] xs:w-[min(240px,75vw)] sm:w-[280px] 
                bg-white dark:bg-gray-900 p-3 xs:p-4 pb-6 rounded-lg shadow-lg z-[11]
                transition-all duration-300 ease-in-out hover:z-30 hover:shadow-xl
                hover:scale-105 hover:-translate-y-1 hover:!opacity-100 hover:!blur-none
                group-hover/cards:opacity-50 group-hover/cards:blur-[2px] hover:!opacity-100 hover:!blur-none
                pointer-events-auto"
            >
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">EXTRA PROJECT 1</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Nullam aliquam feugiat scelerisque. In aliquet eleifend turpis eget dictum.
              </p>
            </div>

            {/* Home Media Server - Middle */}
            <div 
              className="absolute right-[5%] xs:right-[5%] sm:right-[20%] top-[40%] transform translate-x-0 xs:translate-x-1/2 sm:translate-x-1/2 
                w-[min(260px,85vw)] xs:w-[min(240px,75vw)] sm:w-[280px] 
                bg-white dark:bg-gray-900 p-3 xs:p-4 pb-6 rounded-lg shadow-lg z-[12]
                transition-all duration-300 ease-in-out hover:z-30 hover:shadow-xl
                hover:scale-105 hover:-translate-y-1 hover:!opacity-100 hover:!blur-none
                group-hover/cards:opacity-50 group-hover/cards:blur-[2px] hover:!opacity-100 hover:!blur-none
                pointer-events-auto"
            >
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">EXTRA PROJECT 2</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Suspendisse sed pellentesque ex. In sollicitudin urna nibh, eget dapibus tortor mollis ac.
              </p>
            </div>

            {/* CompTIA A+ - Bottom */}
            <div 
              className="absolute left-[5%] xs:left-[5%] sm:left-[20%] bottom-[5%] transform -translate-x-0 xs:-translate-x-1/2 sm:-translate-x-1/2 
                w-[min(260px,85vw)] xs:w-[min(240px,75vw)] sm:w-[280px] 
                bg-white dark:bg-gray-900 p-3 xs:p-4 pb-6 rounded-lg shadow-lg z-[13]
                transition-all duration-300 ease-in-out hover:z-30 hover:shadow-xl
                hover:scale-105 hover:-translate-y-1 hover:!opacity-100 hover:!blur-none
                group-hover/cards:opacity-50 group-hover/cards:blur-[2px] hover:!opacity-100 hover:!blur-none
                pointer-events-auto"
            >
              <div className="flex items-center gap-2 mb-2">
                <Pencil className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">EXTRA PROJECT 3</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Etiam tempor consectetur velit, a ultrices libero volutpat non.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 