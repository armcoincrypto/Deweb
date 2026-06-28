import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";
import { CostGuideCta } from "@/components/cost-guides/CostGuideCta";
import type { CostGuidePage } from "@/lib/cost-guides/types";

type CostGuideViewProps = {
  guide: CostGuidePage;
};

export async function CostGuideView({ guide }: CostGuideViewProps) {
  const t = await getTranslations("costGuides.shared");

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
            <li className="text-white/70">{guide.breadcrumbCurrent}</li>
          </ol>
        </nav>
      </div>

      <PageHeader kicker={guide.kicker} title={guide.h1} subtitle={guide.intro[0]} />

      <section
        className="container-narrow border-b border-white/[0.06] px-4 py-12 sm:px-6 lg:px-8"
        aria-labelledby="cost-guide-main"
      >
        <div className="space-y-10">
          {guide.intro.slice(1).map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="leading-relaxed text-white/65">
              {paragraph}
            </p>
          ))}

          <div>
            <h2 id="cost-guide-main" className="text-2xl font-bold text-white">
              {t("costRangesTitle")}
            </h2>
            <p className="mt-3 text-sm text-white/45">{t("costDisclaimer")}</p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="px-4 py-3 font-semibold text-white/85">Scope</th>
                    <th className="px-4 py-3 font-semibold text-white/85">Typical range</th>
                    <th className="hidden px-4 py-3 font-semibold text-white/85 sm:table-cell">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {guide.costRanges.map((row) => (
                    <tr key={row.label} className="border-b border-white/[0.06] last:border-0">
                      <td className="px-4 py-3 font-medium text-white/80">{row.label}</td>
                      <td className="px-4 py-3 text-deweb-cyan">{row.range}</td>
                      <td className="hidden px-4 py-3 text-white/55 sm:table-cell">
                        {row.note ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {guide.comparisonTable && (
            <div>
              <h2 className="text-2xl font-bold text-white">{t("comparisonTitle")}</h2>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03]">
                      {guide.comparisonTable.headers.map((header) => (
                        <th key={header} className="px-4 py-3 font-semibold text-white/85">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {guide.comparisonTable.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-white/[0.06] last:border-0">
                        {row.map((cell, i) => (
                          <td
                            key={`${row[0]}-${i}`}
                            className={`px-4 py-3 ${i === 0 ? "font-medium text-white/80" : "text-white/65"}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {guide.sections.map((section) => (
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
            <h2 className="text-2xl font-bold text-white">{t("whenToChooseTitle")}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {guide.whenToChoose.map((block) => (
                <div
                  key={block.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <h3 className="text-lg font-semibold text-white">{block.title}</h3>
                  <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-white/65">
                    {block.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 48)}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">{t("relatedServicesTitle")}</h2>
            <ul className="mt-4 space-y-3 text-white/65">
              {guide.relatedServices.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-semibold text-deweb-cyan hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">{t("faqTitle")}</h2>
            <dl className="mt-6 space-y-6">
              {guide.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold text-white">{faq.question}</dt>
                  <dd className="mt-2 leading-relaxed text-white/65">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>

          <CostGuideCta title={guide.cta.title} description={guide.cta.description} />
        </div>
      </section>
    </>
  );
}
