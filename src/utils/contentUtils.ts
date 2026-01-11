import projectsData from '../../content/data/projects.json';
import skillsDataRaw from '../../content/data/skills.json';
import { parseMarkdown } from './markdown';
import { BlogPost, Project } from '../types';
import { Skill } from '../types/skills';

// Load blogs globally using Vite's glob import
const blogModules = import.meta.glob('../../content/posts/*.md', { query: '?raw', import: 'default', eager: true });

export const getSkillLabel = (id: string): string => {
  const skill = (skillsDataRaw as Skill[]).find(s => s.id === id);
  return skill?.label || id;
};

export const getAllBlogs = (): BlogPost[] => {
  return Object.entries(blogModules).map(([path, content]) => {
    const { frontmatter, content: body } = parseMarkdown(content as string);
    return {
      id: path.split('/').pop()?.replace('.md', '') || '',
      title: frontmatter.title,
      date: frontmatter.date,
      skills: frontmatter.skills || [],
      excerpt: frontmatter.excerpt,
      content: body,
    } as BlogPost;
  });
};

export const getProjectsBySkill = (skillId: string): Project[] => {
  if (!skillId) return [];
  return (projectsData as Project[]).filter(project => 
    project.skills.includes(skillId)
  );
};

export const getBlogsBySkill = (skillId: string): BlogPost[] => {
  if (!skillId) return [];
  const allBlogs = getAllBlogs();
  return allBlogs.filter(blog => 
    blog.skills.includes(skillId)
  );
};
