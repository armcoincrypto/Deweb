import { CinematicHome } from "@/components/cinematic/CinematicHome";
import { HomeBlogSection } from "@/components/home/HomeBlogSection";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { metadataFromEntry } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-metadata";

export const revalidate = 60;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return metadataFromEntry(getPageSeo("home"), "/", locale);
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const seo = getPageSeo("home");

  return (
    <>
      <PageSchemas
        locale={locale}
        path="/"
        title={seo.title}
        description={seo.description}
        breadcrumbs={[{ name: "Home", path: "/" }]}
      />
      <CinematicHome blogSection={<HomeBlogSection />} />
    </>
  );
}
