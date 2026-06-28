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
  };
  breadcrumbCurrent: string;
};
