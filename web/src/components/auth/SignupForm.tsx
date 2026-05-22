"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { dewebApi } from "@/lib/api";
import { AuthField } from "./LoginForm";

export function SignupForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "supplier">("customer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await dewebApi.auth.register({
        username: username.trim(),
        email: email.trim(),
        password,
        accountMode: role === "supplier" ? "seller" : "customer",
      });
      router.push(`/account/login?registered=1&email=${encodeURIComponent(email)}`);
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

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`rounded-xl border py-3 text-sm font-bold transition-all ${
              role === "customer"
                ? "border-deweb-cyan bg-deweb-cyan/15 text-deweb-cyan"
                : "border-white/10 text-white/50"
            }`}
          >
            {t("roleCustomer")}
          </button>
          <button
            type="button"
            onClick={() => setRole("supplier")}
            className={`rounded-xl border py-3 text-sm font-bold transition-all ${
              role === "supplier"
                ? "border-deweb-cyan bg-deweb-cyan/15 text-deweb-cyan"
                : "border-white/10 text-white/50"
            }`}
          >
            {t("roleSupplier")}
          </button>
        </div>

        <AuthField label={t("nickname")} value={username} onChange={setUsername} required />
        <AuthField label={t("email")} type="email" value={email} onChange={setEmail} required />
        <AuthField
          label={t("password")}
          type="password"
          value={password}
          onChange={setPassword}
          required
        />
        <p className="text-xs text-white/35">{t("passwordRules")}</p>
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
