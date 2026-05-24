"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
  am: "Հայերեն",
};
const short: Record<Locale, string> = { en: "EN", es: "ES", ru: "RU", am: "AM" };

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white backdrop-blur-md transition-colors hover:border-deweb-cyan/40 hover:bg-white/10"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{short[locale]}</span>
        <svg
          className={cn("h-4 w-4 text-deweb-cyan transition-transform", open && "rotate-180")}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-[100] mt-2 min-w-[140px] overflow-hidden rounded-xl border border-white/10 bg-deweb-surface/95 py-1 shadow-card backdrop-blur-xl"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={locale === l}
                onClick={() => {
                  router.replace(pathname, { locale: l });
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors",
                  locale === l
                    ? "bg-deweb-cyan/15 font-bold text-deweb-cyan"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <span>{labels[l]}</span>
                <span className="text-xs opacity-60">{short[l]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
