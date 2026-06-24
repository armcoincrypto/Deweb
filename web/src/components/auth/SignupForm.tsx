"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { dewebApi } from "@/lib/api";
import { AuthField, PasswordField } from "./PasswordField";

export function SignupForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!acceptedTerms) {
      setError(t("termsRequired"));
      return;
    }
    setLoading(true);
    try {
      await dewebApi.auth.register({
        username: username.trim(),
        email: email.trim(),
        password,
        accountMode: "customer",
        locale,
      });
      router.push(`/account/login?registered=1&email=${encodeURIComponent(email.trim())}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("signupFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white">{t("signupTitle")}</h1>
      <p className="mt-2 text-sm text-white/50">{t("signupSubtitle")}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4" autoComplete="off">
        <AuthField label={t("nickname")} value={username} onChange={setUsername} required autoComplete="username" />
        <AuthField
          label={t("email")}
          type="email"
          value={email}
          onChange={setEmail}
          required
          autoComplete="email"
          placeholder="you@example.com"
        />
        <PasswordField
          label={t("password")}
          value={password}
          onChange={setPassword}
          required
          autoComplete="new-password"
        />
        <p className="text-xs text-white/35">{t("passwordRules")}</p>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-white/55">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent accent-deweb-cyan"
          />
          <span>
            {t("termsAgreePrefix")}{" "}
            <Link href="/terms" className="text-deweb-cyan hover:underline">
              {t("termsLink")}
            </Link>{" "}
            {t("termsAgreeAnd")}{" "}
            <Link href="/privacy-policy" className="text-deweb-cyan hover:underline">
              {t("privacyLink")}
            </Link>
          </span>
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-deweb-cyan py-3.5 text-sm font-bold text-deweb-bg shadow-glow disabled:opacity-50"
        >
          {loading ? t("loading") : t("signupBtn")}
        </button>
      </form>
    </>
  );
}
