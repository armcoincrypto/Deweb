"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";

const STORAGE_KEY = "deweb_cookie_consent";
type Consent = "required" | "all" | "declined" | null;

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as Consent;
    if (saved === "required" || saved === "all" || saved === "declined") {
      setConsent(saved);
    } else {
      setConsent(null);
    }
  }, []);

  function save(value: Consent) {
    if (!value) return;
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  if (!mounted) return null;

  if (consent === "declined") {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
        <div className="max-w-md rounded-2xl border border-white/10 bg-deweb-bg p-8 text-center shadow-2xl">
          <h2 className="text-xl font-bold text-white">Cookies required</h2>
          <p className="mt-3 text-sm text-white/60">
            DEWEB uses essential cookies and local storage to keep you signed in and protect your
            account. Without accepting required cookies, the site cannot function properly.
          </p>
          <button
            type="button"
            onClick={() => save("required")}
            className="mt-6 rounded-full bg-deweb-cyan px-6 py-3 text-sm font-bold text-deweb-bg"
          >
            Accept required cookies
          </button>
        </div>
      </div>
    );
  }

  if (consent) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[90] border-t border-deweb-cyan/25 bg-[#05070a]/98 p-5 shadow-2xl backdrop-blur-md sm:p-6"
    >
      <div className="container-narrow mx-auto max-w-4xl">
        <h3 className="text-lg font-bold text-deweb-cyan">We value your privacy</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/65">
          DEWEB uses <strong className="text-white">required cookies</strong> for login, security,
          and core features. Optional cookies help us improve the experience. Read our{" "}
          <Link href="/privacy-policy" className="text-deweb-cyan hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookie-policy" className="text-deweb-cyan hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => save("required")}
            className="rounded-xl bg-deweb-cyan px-5 py-2.5 text-sm font-bold text-deweb-bg"
          >
            Accept required cookies
          </button>
          <button
            type="button"
            onClick={() => save("all")}
            className="rounded-xl border border-deweb-cyan/40 bg-deweb-cyan/10 px-5 py-2.5 text-sm font-bold text-deweb-cyan"
          >
            Accept all cookies
          </button>
          <button
            type="button"
            onClick={() => save("declined")}
            className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/55 hover:text-white"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
