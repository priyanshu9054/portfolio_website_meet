import projectsData from '../../content/data/projects.json';
import { parseMarkdown } from './markdown';
import { BlogPost, Project } from '../types';

// Load blogs globally using Vite's glob import
const blogModules = import.meta.glob('../../content/posts/*.md', { query: '?raw', import: 'default', eager: true });

export const getAllBlogs = (): BlogPost[] => {
  return Object.entries(blogModules).map(([path, content]) => {
    const { frontmatter, content: body } = parseMarkdown(content as string);
    return {
      id: path.split('/').pop()?.replace('.md', '') || '',
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags || [],
      excerpt: frontmatter.excerpt,
      content: body,
    } as BlogPost;
  });
};

export const getProjectsBySkill = (skill: string): Project[] => {
  if (!skill) return [];
  const normalizedSkill = skill.toLowerCase();
  return (projectsData as Project[]).filter(project => 
    project.tags.some(tag => tag.toLowerCase() === normalizedSkill)
  );
};

export const getBlogsBySkill = (skill: string): BlogPost[] => {
  if (!skill) return [];
  const normalizedSkill = skill.toLowerCase();
  const allBlogs = getAllBlogs();
  return allBlogs.filter(blog => 
    blog.tags.some(tag => tag.toLowerCase() === normalizedSkill)
  );
};
