import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";
import {
  breadcrumbSchema,
  type BreadcrumbItem,
  webPageSchema,
  serviceSchema,
  articleSchema,
  faqPageSchema,
} from "@/lib/schema";

type PageSchemasProps = {
  locale: string;
  path: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  type?: "webpage" | "service" | "article";
  priceRange?: string;
  image?: string;
  datePublished?: string;
  faqs?: { question: string; answer: string }[];
};

export function PageSchemas({
  locale,
  path,
  title,
  description,
  breadcrumbs,
  type = "webpage",
  priceRange,
  image,
  datePublished,
  faqs,
}: PageSchemasProps) {
  const url = absoluteUrl(locale, path);
  const schemas: Record<string, unknown>[] = [
    webPageSchema({ name: title, description, url }),
    breadcrumbSchema(breadcrumbs, locale),
  ];

  if (type === "service") {
    schemas.push(serviceSchema({ name: title, description, url, priceRange }));
  }

  if (type === "article" && datePublished) {
    schemas.push(
      articleSchema({
        headline: title,
        description,
        url,
        image,
        datePublished,
      })
    );
  }

  if (faqs?.length) {
    const faq = faqPageSchema(faqs);
    if (faq) schemas.push(faq);
  }

  return <JsonLd data={schemas} />;
}
