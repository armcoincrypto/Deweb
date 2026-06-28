import { JsonLd } from "@/components/seo/JsonLd";
import { PageSchemas } from "@/components/seo/PageSchemas";
import { ProjectsIndexView } from "@/components/projects/ProjectsIndexView";
import { getLocalizedPageSeo } from "@/lib/i18n/locale-seo";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { getAllProjects } from "@/lib/projects";
import { portfolioCollectionPageSchema, portfolioItemListSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizedPageMetadata(locale, "portfolio", "/projects");
}

export default async function ProjectsIndexPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const seo = await getLocalizedPageSeo(loc, "portfolio");
  const projects = getAllProjects();
  const pageUrl = absoluteUrl(loc, "/projects");

  const projectItems = projects.map((project) => ({
    name: project.title,
    url: absoluteUrl(loc, project.path),
    description: project.summary,
  }));
  const projectUrls = projectItems.map((item) => item.url);

  return (
    <>
      <PageSchemas
        locale={loc}
        path="/projects"
        title={seo.title}
        description={seo.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ]}
      />
      <JsonLd
        data={[
          portfolioCollectionPageSchema({
            name: "DEWEB Projects",
            url: pageUrl,
            description: seo.description,
            projectUrls,
          }),
          portfolioItemListSchema({
            name: seo.title,
            url: pageUrl,
            items: projectItems,
          }),
        ]}
      />
      <ProjectsIndexView projects={projects} />
    </>
  );
}
