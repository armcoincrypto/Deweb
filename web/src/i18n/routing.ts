import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "es", "ru", "am"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "always",
  alternateLinks: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
