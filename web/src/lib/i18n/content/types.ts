import type { LegalSection } from "@/lib/legal-content";
import type { ServiceCategory as HomeServiceCategory } from "@/lib/home-services-data";
import type { ServiceBanner } from "@/lib/service-banners-data";
import type { ServiceCategory as DetailServiceCategory } from "@/lib/services-data";
import type { AboutService } from "@/lib/about-data";
import type { ServiceLandingPage, ServiceLandingSlug } from "@/lib/service-landing/types";

export type LegalContentPack = {
  privacyPolicySections: LegalSection[];
  cookiePolicySections: LegalSection[];
  termsOfUseSections: LegalSection[];
};

export type HomeServiceTexts = Pick<
  HomeServiceCategory,
  "title" | "what" | "who" | "result" | "startingPrice"
>;

export type ServiceBannerTexts = Pick<
  ServiceBanner,
  "title" | "deliverables" | "pricing" | "timeline" | "benefits"
>;

export type DetailServiceTexts = Pick<
  DetailServiceCategory,
  | "title"
  | "desc"
  | "timeline"
  | "price"
  | "overview"
  | "offering"
  | "meaning"
  | "includes"
  | "deliverables"
>;

export type AboutStatTexts = { label: string };
export type AboutProcessTexts = { title: string; desc: string };
export type LabeledText = { label: string };

export type AboutContentPack = {
  stats: AboutStatTexts[];
  services: Pick<AboutService, "id" | "title" | "desc" | "bullets">[];
  process: AboutProcessTexts[];
  platformModules: LabeledText[];
  heroFloatIcons: LabeledText[];
};

export type LandingTexts = Omit<ServiceLandingPage, "slug" | "path">;

export type LocaleContentModule = {
  legal: LegalContentPack;
  homeServices: Record<string, HomeServiceTexts>;
  banners: Record<string, ServiceBannerTexts>;
  services: Record<string, DetailServiceTexts>;
  about: AboutContentPack;
  landings: Partial<Record<ServiceLandingSlug, LandingTexts>>;
};
