import { CostGuideView } from "@/components/cost-guides/CostGuideView";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { getCostGuide, type CostGuideSlug } from "./index";

type PageProps = { params: Promise<{ locale: string }> };

export function makeCostGuidePage(slug: CostGuideSlug) {
  const guide = getCostGuide(slug);

  async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    return localizedPageMetadata(locale, guide.seoKey, guide.path);
  }

  async function Page({ params }: PageProps) {
    const { locale } = await params;
    const seo = await getLocalizedPageSeo(locale, guide.seoKey);

    return (
      <>
        <PageSchemas
          locale={locale}
          path={guide.path}
          title={seo.title}
          description={seo.description}
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: guide.breadcrumbCurrent, path: guide.path },
          ]}
          faqs={guide.faqs}
        />
        <CostGuideView guide={guide} />
      </>
    );
  }

  return { generateMetadata, default: Page };
}
