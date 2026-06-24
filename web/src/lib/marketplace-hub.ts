/** Build FAQ pairs for marketplace hub schema from next-intl marketplace namespace. */
export function buildMarketplaceFaqs(
  t: (key: string) => string
): { question: string; answer: string }[] {
  return [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
    question: t(`hub.faq${i}q`),
    answer: t(`hub.faq${i}a`),
  }));
}
