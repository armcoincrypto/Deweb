/** Build FAQ pairs for hire-intent marketplace pages from next-intl keys. */
export function buildHireWebDevelopersFaqs(
  t: (key: string) => string
): { question: string; answer: string }[] {
  return [1, 2, 3, 4, 5, 6, 7].map((i) => ({
    question: t(`faq${i}q`),
    answer: t(`faq${i}a`),
  }));
}
