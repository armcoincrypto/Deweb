export type ProjectSlug = "kobbopay" | "exswaping" | "changetext" | "dex-kobbex";

export type ProjectSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type ProjectLink = {
  href: string;
  label: string;
};

export type ProjectTrustMeta = {
  projectType: string;
  industry: string;
  technology: string;
  deploymentModel: string;
};

export type ProjectFlowStep = {
  label: string;
  description?: string;
};

export type ProjectComponentCard = {
  title: string;
  description: string;
};

export type ProjectPage = {
  slug: ProjectSlug;
  path: string;
  seoKey: string;
  kicker: string;
  title: string;
  headline: string;
  summary: string;
  projectType: string;
  accent: string;
  tags: string[];
  sections: ProjectSection[];
  relatedServices: ProjectLink[];
  cta: {
    title: string;
    description: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
  breadcrumbCurrent: string;
  schemaAbout?: string;
  trust?: ProjectTrustMeta;
  architectureFlow?: { title: string; steps: ProjectFlowStep[] };
  networks?: string[];
  capabilities?: string[];
  securityHighlights?: { title: string; items: string[] };
  techStackGrid?: string[];
  exchangeWorkflow?: { title: string; steps: ProjectFlowStep[] };
  platformComponentCards?: ProjectComponentCard[];
  seoEngineeringDetail?: { title: string; items: string[] };
  operationsDetail?: { title: string; paragraphs?: string[]; items?: string[] };
  challengesSolved?: string[];
  engineeringLessons?: string[];
  /** Relative path under the DEWEB GitHub repo (e.g. docs/projects/kobbopay-architecture.md) */
  githubDocPath?: string;
};
