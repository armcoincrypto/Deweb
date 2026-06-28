import type { ProjectSlug } from "./types";

export const PROJECT_SLUGS: readonly ProjectSlug[] = [
  "kobbopay",
  "exswaping",
  "changetext",
  "dex-kobbex",
] as const;

export function getProjectPaths(): string[] {
  return ["/projects", ...PROJECT_SLUGS.map((slug) => `/projects/${slug}`)];
}
