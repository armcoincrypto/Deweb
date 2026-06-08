import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import type { LegalSection } from "@/lib/legal-content";
import { LEGAL_LAST_UPDATED } from "@/lib/legal-content";

type LegalPageViewProps = {
  title: string;
  subtitle: string;
  sections: LegalSection[];
  relatedLinks?: { href: string; label: string }[];
};

export function LegalPageView({ title, subtitle, sections, relatedLinks = [] }: LegalPageViewProps) {
  return (
    <>
      <PageHeader kicker="Legal" title={title} subtitle={subtitle} />

      <div className="container-narrow px-4 pb-20 sm:px-6 lg:px-8">
        <p className="mb-8 text-sm text-white/45">Last updated: {LEGAL_LAST_UPDATED} · DEWEB (dewebam.com)</p>

        {relatedLinks.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 hover:border-deweb-cyan/40 hover:text-deweb-cyan"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id || section.title} id={section.id}>
              <GlassCard className="p-6 sm:p-8">
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-sm leading-relaxed text-white/65">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/65">
                  {section.list.map((item) => (
                    <li key={item.slice(0, 50)}>{item}</li>
                  ))}
                </ul>
              )}
              </GlassCard>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-white/45">
          <Link href="/" className="text-deweb-cyan hover:underline">
            ← Back to DEWEB
          </Link>
        </p>
      </div>
    </>
  );
}
