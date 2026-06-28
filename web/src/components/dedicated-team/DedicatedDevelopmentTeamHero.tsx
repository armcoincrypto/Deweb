import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";

export async function DedicatedDevelopmentTeamHero() {
  const t = await getTranslations("dedicatedTeam");

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
            <li className="text-white/70">{t("breadcrumbCurrent")}</li>
          </ol>
        </nav>
      </div>
      <PageHeader kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />
    </>
  );
}
