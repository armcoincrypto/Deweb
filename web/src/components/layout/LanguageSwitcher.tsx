"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = { en: "EN", am: "AM", ru: "RU" };

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 backdrop-blur-md",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-bold transition-all",
            locale === l
              ? "bg-deweb-cyan text-deweb-bg shadow-glow-sm"
              : "text-white/50 hover:text-white"
          )}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
