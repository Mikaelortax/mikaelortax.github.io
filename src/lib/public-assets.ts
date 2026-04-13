import { existsSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = fileURLToPath(new URL('../../public/', import.meta.url));

const candidateExtensions = ['.png', '.jpg', '.jpeg', '.webp'];

export const resolveExistingPublicAsset = (assetPath?: string): string | undefined => {
  if (!assetPath || !assetPath.startsWith('/')) return undefined;

  const normalized = assetPath.replace(/\\/g, '/');
  const extension = extname(normalized);
  const candidates = new Set<string>([normalized]);

  if (extension) {
    for (const candidateExtension of candidateExtensions) {
      if (candidateExtension !== extension) {
        candidates.add(normalized.slice(0, -extension.length) + candidateExtension);
      }
    }
  }

  for (const candidate of candidates) {
    const absolutePath = join(publicDir, candidate.slice(1));
    if (existsSync(absolutePath)) {
      return candidate;
    }
  }

  return undefined;
};
