/**
 * Project interface - defines structure for project display cards
 * Used in portfolio showcases and project galleries
 * 
 * @property id - Unique identifier for the project
 * @property title - Project name displayed in headings
 * @property description - Brief overview of the project purpose
 * @property thumbnail - Path to project thumbnail image
 * @property technologies - Array of technologies used in the project
 * @property demoUrl - Optional link to live demo/deployment
 * @property githubUrl - Optional link to source code repository
 * @property videoUrl - Optional link to video demonstration
 * @property category - Project type for filtering functionality
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  category: 'game' | 'web' | 'mobile' | 'all';
}

/**
 * Experience interface - defines structure for work history entries
 * Used in resume/experience timeline sections
 * 
 * @property id - Unique identifier for the experience entry
 * @property role - Job title or position held
 * @property company - Organization or company name
 * @property period - Time period of employment (e.g., "2020-2022")
 * @property description - Brief overview of responsibilities
 * @property achievements - List of key accomplishments or contributions
 */
export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

/**
 * Testimonial interface - defines structure for client/colleague testimonials
 * Used in testimonial or recommendation sections
 * 
 * @property id - Unique identifier for the testimonial
 * @property name - Name of the person giving the testimonial
 * @property role - Job title of the testimonial provider
 * @property company - Organization name of the testimonial provider
 * @property avatar - Path to profile image of the testimonial provider
 * @property content - The actual testimonial text
 */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}