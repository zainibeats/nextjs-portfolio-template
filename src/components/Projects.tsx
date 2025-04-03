import { Gamepad2 } from 'lucide-react';
import React from 'react';

interface Project {
  title: string;
  description: string;
  youtubeId?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "PROJECT TITLE",
    description: "Fusce facilisis viverra nisi in posuere. Donec mollis a dolor ac ullamcorper " +
      "Donec vulputate pellentesque nisl, eu laoreet purus iaculis et. Phasellus laoreet mauris elementum, pellentesque est vitae, tincidunt erat." +
      "In sollicitudin urna nibh, eget dapibus tortor mollis ac.",
    youtubeId: "nNsO1Ge7mPs",
    liveUrl: "https://link-to-live-demo",
    githubUrl: "https://github.com/yourusername/your-repo",
    tags: ["Engine", "Tool", "Technologies", "Style"]
  },
  // TODO: Add more projects as needed
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 flex items-center justify-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            <Gamepad2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            Interactive Games
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Here are some of my featured projects and work
          </p>
        </div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 will-change-transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 flex flex-col h-full">
                  <div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-auto">
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
                          View Demo
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
                </div>
                {project.youtubeId && (
                  <div className="relative aspect-video md:aspect-auto">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=0&rel=0`}
                      title={project.title}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 