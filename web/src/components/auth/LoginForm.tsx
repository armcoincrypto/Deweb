"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { dewebApi, setToken } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { AuthField } from "./PasswordField";
import { PasswordField } from "./PasswordField";

export function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const search = useSearchParams();
  const { refresh } = useAuth();
  const registered = search.get("registered") === "1";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fromRegister = search.get("email");
    setEmail(registered && fromRegister ? fromRegister : "");
    setPassword("");
  }, [registered, search]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await dewebApi.auth.login({ email, password });
      setToken(data.token);
      await refresh();
      if (data.user?.isAdmin) {
        router.push("/admin");
        return;
      }
      const mode = data.user?.accountMode || data.user?.account_mode;
      router.push(mode === "seller" ? "/account/proposals" : "/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("loginFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white">{t("loginTitle")}</h1>
      <p className="mt-2 text-sm text-white/50">{t("loginSubtitle")}</p>

      {registered && (
        <p className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {t("registeredSuccess")}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4" autoComplete="off">
        <input type="text" name="prevent_autofill" className="hidden" tabIndex={-1} aria-hidden="true" />
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
          autoComplete="current-password"
        />
        <div className="text-right">
          <Link href="/account/forgot-password" className="text-xs font-bold text-deweb-cyan hover:underline">
            {t("forgotPassword")}
          </Link>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-deweb-cyan py-3.5 text-sm font-bold text-deweb-bg shadow-glow disabled:opacity-50"
        >
          {loading ? t("loading") : t("loginBtn")}
        </button>
      </form>
    </>
  );
}
