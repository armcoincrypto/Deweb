import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { getProject, isProjectSlug, PROJECT_SLUGS } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/schema";

export const dynamicParams = false;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!isProjectSlug(slug)) notFound();
  const project = getProject(slug);
  return localizedPageMetadata(locale, project.seoKey, project.path);
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isProjectSlug(slug)) notFound();

  const project = getProject(slug);
  const path = project.path;
  const url = absoluteUrl(locale, path);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.breadcrumbCurrent, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          creativeWorkSchema({
            name: project.title,
            description: project.summary,
            url,
            keywords: project.tags,
          }),
          breadcrumbSchema(breadcrumbs, locale),
        ]}
      />
      <ProjectDetailView project={project} />
    </>
  );
}
