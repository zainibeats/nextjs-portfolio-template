export interface DevProject {
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  image?: string;
}

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
    description: "Integer posuere, dui non tristique posuere, lectus mi rutrum risus, in pretium ante velit ac erat. Nam aliquet diam quis neque malesuada vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
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