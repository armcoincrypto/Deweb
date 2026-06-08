import { metadataFromEntry } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-metadata";

export function dashboardPageMetadata(key: string, path: string, locale: string) {
  return metadataFromEntry(getPageSeo(key), path, locale, { noIndex: true });
}
