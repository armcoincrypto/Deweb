/** Build FAQ pairs for hire-intent marketplace pages from next-intl keys. */
export function buildHireFaqs(
  t: (key: string) => string,
  count = 7
): { question: string; answer: string }[] {
  return Array.from({ length: count }, (_, i) => ({
    question: t(`faq${i + 1}q`),
    answer: t(`faq${i + 1}a`),
  }));
}

/** @deprecated Use buildHireFaqs */
export function buildHireWebDevelopersFaqs(
  t: (key: string) => string
): { question: string; answer: string }[] {
  return buildHireFaqs(t);
}
