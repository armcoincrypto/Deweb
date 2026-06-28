import { routing, type Locale } from "@/i18n/routing";

/** Build `{ locale, slug }` pairs for nested `[locale]/…/[slug]` routes. */
export function buildLocaleSlugParams(slugs: readonly string[]) {
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale: locale as Locale, slug }))
  );
}
