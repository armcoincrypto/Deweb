"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { GlowButton } from "@/components/ui/GlowButton";
import { Link } from "@/i18n/routing";
import { dewebApi, setToken } from "@/lib/api";

type AuthFormProps = { mode: "login" | "signup" };

export function AuthForm({ mode }: AuthFormProps) {
  const t = useTranslations("auth");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"customer" | "supplier">("customer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let data;
      if (mode === "login") {
        data = await dewebApi.auth.login({ email, password });
      } else {
        data = await dewebApi.auth.register({
          email,
          password,
          username: username || email.split("@")[0],
        });
        if (role === "supplier") {
          await dewebApi.users.updateMe({ accountMode: "seller" }).catch(() => null);
        }
      }
      setToken(data.token);
      const isSeller =
        role === "supplier" ||
        data.user?.accountMode === "seller" ||
        data.user?.account_mode === "seller";
      router.push(isSeller ? "/dashboard/supplier" : "/dashboard/customer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="glass-panel-glow glow-border p-8 sm:p-10">
        <h1 className="text-2xl font-bold text-white">
          {mode === "login" ? t("loginTitle") : t("signupTitle")}
        </h1>
        <p className="mt-2 text-sm text-white/50">
          {mode === "login" ? t("loginSubtitle") : t("signupSubtitle")}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {mode === "signup" && (
            <>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole("customer")}
                  className={`flex-1 rounded-xl border py-2.5 text-sm font-bold transition-all ${
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
                  className={`flex-1 rounded-xl border py-2.5 text-sm font-bold transition-all ${
                    role === "supplier"
                      ? "border-deweb-cyan bg-deweb-cyan/15 text-deweb-cyan"
                      : "border-white/10 text-white/50"
                  }`}
                >
                  {t("roleSupplier")}
                </button>
              </div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/40">
                {t("username")}
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
                />
              </label>
            </>
          )}
          <label className="block text-xs font-bold uppercase tracking-wider text-white/40">
            {t("email")}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/40">
            {t("password")}
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
            />
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-deweb-cyan py-3.5 text-sm font-bold text-deweb-bg shadow-glow disabled:opacity-50"
          >
            {loading ? "…" : mode === "login" ? t("loginBtn") : t("signupBtn")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          {mode === "login" ? t("noAccount") : t("hasAccount")}{" "}
          <Link
            href={mode === "login" ? "/signup" : "/login"}
            className="font-bold text-deweb-cyan hover:underline"
          >
            {mode === "login" ? t("signupBtn") : t("loginBtn")}
          </Link>
        </p>
      </div>
    </div>
  );
}
