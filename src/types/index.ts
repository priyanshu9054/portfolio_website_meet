
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  skills: string[];
  image: string;
  link?: string;
  github?: string;
}

export interface SkillCard {
  id: string;
  title: string;
  summary: string;
  details: string;
  projects: string[];
  tools: string[];
}

export interface TimelineItem {
  id: string;
  institution: string;
  role: string;
  duration: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  skills: string[];
  content: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link: string;
  logo: string;
}
