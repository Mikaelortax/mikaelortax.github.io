import { defineCollection, z } from 'astro:content';

const projectSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()),
  stack: z.array(z.string()),
  role: z.string(),
  outcomes: z.array(z.string()),
  featured: z.boolean(),
});

const projects = defineCollection({
  type: 'content',
  schema: projectSchema,
});

const projectsEn = defineCollection({
  type: 'content',
  schema: projectSchema,
});

export const collections = {
  projects,
  'projects-en': projectsEn,
};
