import { BlogListingView } from "@/components/blog/BlogListingView";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { fetchCmsCategories } from "@/lib/blog/cms";
import { getAllArticlesMerged } from "@/lib/blog/server";
import { metadataFromEntry } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-metadata";

export const revalidate = 60;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return metadataFromEntry(getPageSeo("blog"), "/blog", locale);
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const seo = getPageSeo("blog");
  const [articles, cmsCategories] = await Promise.all([
    getAllArticlesMerged(),
    fetchCmsCategories(),
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
        extraCategories={cmsCategories.map((c) => ({
          slug: c.slug,
          name: c.name,
          description: c.description,
        }))}
      />
    </>
  );
}
