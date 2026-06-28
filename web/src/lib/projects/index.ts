import type { ProjectPage, ProjectSlug } from "./types";
import { changetext } from "./pages/changetext";
import { dexKobbex } from "./pages/dex-kobbex";
import { exswaping } from "./pages/exswaping";
import { kobbopay } from "./pages/kobbopay";
import { PROJECT_SLUGS, getProjectPaths } from "./slugs";

const PROJECT_REGISTRY: Record<ProjectSlug, ProjectPage> = {
  kobbopay,
  exswaping,
  changetext,
  "dex-kobbex": dexKobbex,
};

export function getProject(slug: ProjectSlug): ProjectPage {
  return PROJECT_REGISTRY[slug];
}

export function getAllProjects(): ProjectPage[] {
  return PROJECT_SLUGS.map((slug) => PROJECT_REGISTRY[slug]);
}

export function isProjectSlug(slug: string): slug is ProjectSlug {
  return (PROJECT_SLUGS as readonly string[]).includes(slug);
}

export type { ProjectPage, ProjectSlug } from "./types";
export { PROJECT_SLUGS, getProjectPaths };
