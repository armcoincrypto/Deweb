"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { dewebApi } from "@/lib/api";
import { AuthField } from "./LoginForm";

export function ResetPasswordForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const token = useSearchParams().get("token") || "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      setError(t("invalidToken"));
      return;
    }
    setError("");
    setLoading(true);
    try {
      await dewebApi.auth.resetPassword(token, password);
      setDone(true);
      setTimeout(() => router.push("/account/login"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white">{t("resetTitle")}</h1>
      <p className="mt-2 text-sm text-white/50">{t("resetSubtitle")}</p>

      {done ? (
        <p className="mt-8 text-sm text-emerald-400">{t("resetSuccess")}</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <AuthField
            label={t("newPassword")}
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
          <p className="text-xs text-white/35">{t("passwordRules")}</p>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full rounded-full bg-deweb-cyan py-3.5 text-sm font-bold text-deweb-bg shadow-glow disabled:opacity-50"
          >
            {loading ? t("loading") : t("resetBtn")}
          </button>
        </form>
      )}
      <Link
        href="/account/login"
        className="mt-6 block text-center text-sm text-deweb-cyan hover:underline"
      >
        {t("backToLogin")}
      </Link>
    </>
  );
}
