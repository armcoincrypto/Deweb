import { notFound } from "next/navigation";
import { BlogListingView } from "@/components/blog/BlogListingView";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getCategory } from "@/lib/blog";
import { blogCategories } from "@/lib/blog/categories";
import { fetchCmsCategories } from "@/lib/blog/cms";
import { getAllArticlesMerged } from "@/lib/blog/server";
import { metadataFromEntry } from "@/lib/seo";
import { getBlogCategorySeo } from "@/lib/seo-metadata";

export const dynamicParams = true;
export const revalidate = 60;

type Props = { params: Promise<{ locale: string; category: string }> };

export function generateStaticParams() {
  return blogCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, category } = await params;
  const cat = getCategory(category);
  if (cat) {
    return metadataFromEntry(getBlogCategorySeo(category), `/blog/category/${category}`, locale);
  }
  const cmsCats = await fetchCmsCategories();
  const cmsCat = cmsCats.find((c) => c.slug === category);
  if (!cmsCat) return {};
  return metadataFromEntry(
    { title: `${cmsCat.name} | DEWEB Blog`, description: cmsCat.description },
    `/blog/category/${category}`,
    locale
  );
}

export default async function BlogCategoryPage({ params }: Props) {
  const { locale, category } = await params;
  const staticCat = getCategory(category);
  const cmsCats = await fetchCmsCategories();
  const cmsCat = cmsCats.find((c) => c.slug === category);
  const cat = staticCat ?? (cmsCat ? { slug: cmsCat.slug, name: cmsCat.name, description: cmsCat.description } : null);
  if (!cat) notFound();

  const articles = await getAllArticlesMerged();
  const seo = staticCat
    ? getBlogCategorySeo(category)
    : { title: `${cat.name} | DEWEB Blog`, description: cat.description };
  const path = `/blog/category/${category}`;

  return (
    <>
      <PageSchemas
        locale={locale}
        path={path}
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: cat.name, path },
        ]}
      />
      <BlogListingView
        categorySlug={category}
        articles={articles}
        extraCategories={cmsCats.map((c) => ({
          slug: c.slug,
          name: c.name,
          description: c.description,
        }))}
      />
    </>
  );
}
