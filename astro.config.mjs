// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? 'username';
const site = process.env.SITE_URL ?? `https://${owner}.github.io`;

export default defineConfig({
  site,
  base: '/',
});
