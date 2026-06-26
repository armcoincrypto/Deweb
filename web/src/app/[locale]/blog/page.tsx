import { BlogListingView } from "@/components/blog/BlogListingView";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { fetchCmsCategories } from "@/lib/blog/cms";
import { getAllArticlesMerged } from "@/lib/blog/server";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { getLocalizedBlogCategories } from "@/lib/i18n/blog-categories";
import type { Locale } from "@/i18n/routing";

export const revalidate = 60;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizedPageMetadata(locale, "blog", "/blog");
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const seo = await getLocalizedPageSeo(loc, "blog");
  const [articles, cmsCategories, blogCategories] = await Promise.all([
    getAllArticlesMerged(loc),
    fetchCmsCategories(),
    getLocalizedBlogCategories(loc),
  ]);

  return (
    <>
      <PageSchemas
        locale={locale}
        path="/blog"
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <BlogListingView
        articles={articles}
        categories={blogCategories}
        extraCategories={cmsCategories.map((c) => ({
          slug: c.slug,
          name: c.name,
          description: c.description,
        }))}
        pageHeading={seo.title.replace(/\s*\|\s*DEWEB Blog.*/, "")}
      />
    </>
  );
}
