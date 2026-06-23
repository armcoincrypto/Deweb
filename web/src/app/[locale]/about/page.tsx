import { AboutView } from "@/components/about/AboutView";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { getAboutContent } from "@/lib/i18n/content";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizedPageMetadata(locale, "about", "/about");
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const seo = await getLocalizedPageSeo(loc, "about");
  const aboutContent = await getAboutContent(loc);

  return (
    <>
      <PageSchemas
        locale={loc}
        path="/about"
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutView content={aboutContent} />
    </>
  );
}
