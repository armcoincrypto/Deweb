"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { dewebApi } from "@/lib/api";
import { AuthField } from "./LoginForm";

export function ForgotPasswordForm() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [resetUrl, setResetUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await dewebApi.auth.forgotPassword(email);
      setSent(true);
      if (data.resetUrl) setResetUrl(data.resetUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white">{t("forgotTitle")}</h1>
      <p className="mt-2 text-sm text-white/50">{t("forgotSubtitle")}</p>

      {sent ? (
        <div className="mt-8 space-y-4">
          <p className="rounded-xl border border-deweb-cyan/30 bg-deweb-cyan/10 px-4 py-3 text-sm text-white/80">
            {t("forgotSent")}
          </p>
          {resetUrl && (
            <p className="text-xs text-white/45 break-all">
              Demo reset link:{" "}
              <Link href={resetUrl.replace(/^https?:\/\/[^/]+/, "")} className="text-deweb-cyan">
                {t("resetLink")}
              </Link>
            </p>
          )}
          <Link
            href="/account/login"
            className="block text-center text-sm font-bold text-deweb-cyan hover:underline"
          >
            {t("backToLogin")}
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <AuthField label={t("email")} type="email" value={email} onChange={setEmail} required />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-deweb-cyan py-3.5 text-sm font-bold text-deweb-bg shadow-glow"
          >
            {loading ? t("loading") : t("sendReset")}
          </button>
          <Link
            href="/account/login"
            className="block text-center text-sm text-white/50 hover:text-deweb-cyan"
          >
            {t("backToLogin")}
          </Link>
        </form>
      )}
    </>
  );
}
