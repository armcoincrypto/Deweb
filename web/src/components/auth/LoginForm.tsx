"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { dewebApi, setToken } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const search = useSearchParams();
  const { refresh } = useAuth();
  const [email, setEmail] = useState(search.get("email") || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const registered = search.get("registered") === "1";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await dewebApi.auth.login({ email, password });
      setToken(data.token);
      await refresh();
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

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <AuthField label={t("email")} type="email" value={email} onChange={setEmail} required />
        <AuthField
          label={t("password")}
          type="password"
          value={password}
          onChange={setPassword}
          required
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

export function AuthField({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block text-xs font-bold uppercase tracking-wider text-white/40">
      {label}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/25 focus:border-deweb-cyan/50 focus:outline-none focus:ring-1 focus:ring-deweb-cyan/30"
      />
    </label>
  );
}
