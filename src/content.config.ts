import { defineCollection, z } from 'astro:content';

const projectSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()),
  stack: z.array(z.string()),
  role: z.string(),
  outcomes: z.array(z.string()),
  featured: z.boolean(),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  caseImage: z.string().optional(),
  projectType: z.string().optional(),
  skills: z.array(z.string()).optional(),
  tracks: z.array(z.string()).optional(),
  purpose: z.string().optional(),
  myRole: z.string().optional(),
  keyParts: z.array(z.string()).optional(),
  methods: z.array(z.string()).optional(),
  demonstrates: z.string().optional(),
  employmentRelevance: z.string().optional(),
  screenshots: z
    .array(
      z.object({
        label: z.string(),
        src: z.string().optional(),
        alt: z.string().optional(),
      }),
    )
    .optional(),
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
