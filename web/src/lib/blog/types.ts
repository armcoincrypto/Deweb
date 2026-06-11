export type BlogAuthor = {
  id: string;
  name: string;
  role: string;
  bio: string;
};

export type BlogCategory = {
  slug: string;
  name: string;
  description: string;
};

export type BlogArticle = {
  postId?: string;
  slug: string;
  title: string;
  excerpt: string;
  seoTitle?: string;
  metaDescription?: string;
  category: string;
  categorySlug: string;
  date: string;
  readTime: string;
  image: string;
  authorId: string;
  tags: string[];
  intro: string[];
  sections: { title: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
  internalLinks: { href: string; label: string }[];
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
};

export function articleWordCount(article: BlogArticle): number {
  const text = [
    article.title,
    article.excerpt,
    ...article.intro,
    ...article.sections.flatMap((s) => [s.title, ...s.paragraphs]),
    ...article.faqs.map((f) => `${f.question} ${f.answer}`),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
