import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";
import { GlowButton } from "@/components/ui/GlowButton";
import type { ProjectPage } from "@/lib/projects/types";

type ProjectDetailViewProps = {
  project: ProjectPage;
};

export async function ProjectDetailView({ project }: ProjectDetailViewProps) {
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
            <li>
              <Link href="/projects" className="transition-colors hover:text-deweb-cyan">
                {t("breadcrumbProjects")}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white/70">{project.breadcrumbCurrent}</li>
          </ol>
        </nav>
      </div>

      <PageHeader kicker={project.kicker} title={project.headline} subtitle={project.summary} />

      <section
        className="container-narrow border-b border-white/[0.06] px-4 py-12 sm:px-6 lg:px-8"
        aria-labelledby="project-detail-main"
      >
        <div className="space-y-10">
          <div>
            <h2 id="project-detail-main" className="text-sm font-bold uppercase tracking-wider text-white/45">
              {t("techStack")}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {project.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className="mt-4 leading-relaxed text-white/65">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 list-inside list-disc space-y-2 text-white/65">
                  {section.list.map((item) => (
                    <li key={item.slice(0, 48)}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div>
            <h2 className="text-2xl font-bold text-white">{t("relatedServicesTitle")}</h2>
            <ul className="mt-4 space-y-3 text-white/65">
              {project.relatedServices.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-semibold text-deweb-cyan hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <section className="mt-12 overflow-hidden rounded-2xl border border-deweb-cyan/25 bg-gradient-to-br from-deweb-cyan/15 via-[#0a1628] to-purple-900/20 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{project.cta.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">{project.cta.description}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GlowButton href="/contact" variant="primary">
                {t("ctaContact")}
              </GlowButton>
              <GlowButton href="/marketplace" variant="ghost">
                {t("ctaMarketplace")}
              </GlowButton>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
