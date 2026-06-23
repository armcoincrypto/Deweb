import { CinematicHome } from "@/components/cinematic/CinematicHome";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { getPinnedHomeSlides } from "@/lib/i18n/content";
import type { Locale } from "@/i18n/routing";

export const revalidate = 60;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizedPageMetadata(locale, "home", "/");
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const seo = await getLocalizedPageSeo(loc, "home");
  const pinnedSlides = await getPinnedHomeSlides(loc);

  return (
    <>
      <PageSchemas
        locale={loc}
        path="/"
        title={seo.title}
        description={seo.description}
        breadcrumbs={[{ name: "Home", path: "/" }]}
      />
      <CinematicHome pinnedSlides={pinnedSlides} />
    </>
  );
}
