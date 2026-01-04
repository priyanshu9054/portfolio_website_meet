
export interface FrontMatter {
  [key: string]: any;
}

export interface ParsedContent {
  frontmatter: FrontMatter;
  content: string;
}

export const parseMarkdown = (markdown: string): ParsedContent => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: markdown };
  }

  const frontmatterBlock = match[1];
  const content = match[2];

  const frontmatter: FrontMatter = {};
  frontmatterBlock.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts) {
      let value = valueParts.join(':').trim();
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      // Handle arrays (simple bracket removal for now, can be improved)
      if (value.startsWith('[') && value.endsWith(']')) {
         value = JSON.parse(value); // This might fail if not strict JSON, but good enough for now
      }
      frontmatter[key.trim()] = value;
    }
  });

  return { frontmatter, content: content.trim() };
};
