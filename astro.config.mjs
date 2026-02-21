// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';
import { rehypeMdxDefaultLayout } from './src/lib/rehype-mdx-default-layout.mjs';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? 'username';
const site = process.env.SITE_URL ?? `https://${owner}.github.io`;

export default defineConfig({
  site,
  base: '/',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    mdx({
      rehypePlugins: [rehypeMdxDefaultLayout()],
    }),
    sitemap(),
  ],
});
