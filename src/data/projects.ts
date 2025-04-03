/**
 * Project data type definition
 * This interface defines the structure of project data displayed in the portfolio
 * 
 * @property title - Project name displayed in headings
 * @property description - Detailed project explanation
 * @property githubUrl - Optional link to GitHub repository
 * @property liveUrl - Optional link to deployed project
 * @property technologies - Array of languages, frameworks, libraries used
 * @property image - Optional path to project screenshot or demo GIF
 */
export interface DevProject {
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  image?: string;
}

/**
 * Sample project data
 * Replace with your own projects for production use
 * 
 * For optimal display:
 * - Keep descriptions between 100-200 characters
 * - Use consistent image dimensions for all projects
 * - List 3-5 key technologies per project
 * - Include GitHub and live links when available
 */
export const projects: DevProject[] = [
  {
    title: "Project 1",
    description: "Aliquam ornare vehicula lorem eget condimentum. Mauris eu lobortis magna. Donec faucibus risus id turpis posuere, sed tincidunt orci rhoncus. Fusce vel tortor et justo ullamcorper consequat nec non mi.",
    githubUrl: "https://github.com/yourusername/your-repo",
    technologies: ["Languages", "Libraries", "Technologies"],
    image: "assets/videos/idlemon_web_demo1.gif" // Replace with your gif path
  },
  {
    title: "Project 2",
    description: "Integer posuere, dui non tristique posuere, lectus mi rutrum risus, in pretium ante velit ac erat. Nam aliquet diam quis neque malesuada vulputate.",
    githubUrl: "https://github.com/yourusername/your-repo-2",
    technologies: ["Languages", "Libraries", "Technologies"],
    image: "assets/videos/suprsafe_web_demo1.gif" // Replace with your gif path
  },
  {
    title: "Project 3",
    description: "Curabitur nec auctor ante, in imperdiet neque. Phasellus tristique enim justo. Aenean libero felis, ornare at purus a, semper porta arcu. Etiam ipsum quam, tempus in elit at, posuere consequat sem.",
    githubUrl: "https://github.com/yourusername/your-repo-3",
    technologies: ["Languages", "Libraries", "Technologies"],
    image: "/assets/videos/truefa-demo.gif" // Replace with your gif path
  }
]; 