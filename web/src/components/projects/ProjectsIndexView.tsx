import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";
import { GlowButton } from "@/components/ui/GlowButton";
import type { ProjectPage } from "@/lib/projects/types";

type ProjectsIndexViewProps = {
  projects: ProjectPage[];
};

export async function ProjectsIndexView({ projects }: ProjectsIndexViewProps) {
  const t = await getTranslations("projects");

  return (
    <>
      <div className="container-narrow relative z-10 px-4 pt-[var(--navbar-offset)] sm:px-6 lg:px-8 lg:pt-8">
        <nav aria-label="Breadcrumb" className="pb-2 text-sm text-white/45">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-deweb-cyan">
                {t("breadcrumbHome")}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white/70">{t("breadcrumbProjects")}</li>
          </ol>
        </nav>
      </div>

      <PageHeader kicker={t("indexKicker")} title={t("indexTitle")} subtitle={t("indexSubtitle")} />

      <section className="container-narrow border-b border-white/[0.06] px-4 py-12 sm:px-6 lg:px-8">
        <div className="content-panel mb-10 rounded-2xl p-6 sm:p-8">
          <p className="max-w-3xl text-base leading-relaxed text-white/65">{t("indexIntro")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="content-panel flex h-full flex-col overflow-hidden rounded-2xl"
            >
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
              />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: project.accent }}
                >
                  {project.projectType}
                </span>
                <h2 className="mt-3 text-xl font-bold text-white">{project.title}</h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href={project.path}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white transition-colors hover:border-deweb-cyan/40 hover:text-deweb-cyan"
                  >
                    {t("viewCaseStudy")}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
          <h2 className="text-xl font-bold text-white">{t("indexLinksTitle")}</h2>
          <ul className="mt-4 flex flex-wrap gap-4 text-sm">
            <li>
              <Link href="/services" className="font-semibold text-deweb-cyan hover:underline">
                {t("servicesLink")}
              </Link>
            </li>
            <li>
              <Link href="/marketplace" className="font-semibold text-deweb-cyan hover:underline">
                {t("marketplaceLink")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="font-semibold text-deweb-cyan hover:underline">
                {t("contactLink")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-10 text-center">
          <GlowButton href="/contact" variant="primary">
            {t("ctaContact")}
          </GlowButton>
        </div>
      </section>
    </>
  );
}
