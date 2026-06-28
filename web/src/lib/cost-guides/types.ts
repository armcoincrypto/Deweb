export type CostGuideSlug =
  | "cost-to-build-marketplace-website"
  | "shopify-vs-custom-ecommerce"
  | "webflow-vs-nextjs"
  | "landing-page-cost"
  | "saas-development-cost";

export type ComparisonTable = {
  headers: string[];
  rows: string[][];
};

export type CostRange = {
  label: string;
  range: string;
  note?: string;
};

export type WhenToChoose = {
  title: string;
  bullets: string[];
};

export type CostGuideSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type CostGuideLink = {
  href: string;
  label: string;
};

export type CostGuidePage = {
  slug: CostGuideSlug;
  path: string;
  seoKey: string;
  kicker: string;
  h1: string;
  intro: string[];
  costRanges: CostRange[];
  comparisonTable?: ComparisonTable;
  sections: CostGuideSection[];
  whenToChoose: WhenToChoose[];
  relatedServices: CostGuideLink[];
  faqs: { question: string; answer: string }[];
  cta: {
    title: string;
    description: string;
  };
  breadcrumbCurrent: string;
};
