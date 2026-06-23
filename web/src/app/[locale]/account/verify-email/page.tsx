"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useAuth } from "@/lib/auth-context";
import { dewebApi } from "@/lib/api";

function VerifyEmailInner() {
  const t = useTranslations("account");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refresh } = useAuth();
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [resendMsg, setResendMsg] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage(t("verifyTokenMissing"));
      return;
    }

    dewebApi.auth
      .verifyEmail(token)
      .then(async (data) => {
        setStatus("ok");
        setMessage(data.message || t("emailVerified"));
        await refresh();
        setTimeout(() => router.replace("/account"), 2000);
      })
      .catch((e) => {
        setStatus("error");
        setMessage(e instanceof Error ? e.message : t("verifyFailed"));
      });
  }, [searchParams, t, refresh, router]);

  async function handleResend(e: React.FormEvent) {
    e.preventDefault();
    setResending(true);
    setResendMsg("");
    try {
      const res = await dewebApi.auth.resendVerificationEmail(resendEmail.trim(), locale);
      setResendMsg(res.message || t("verifyResent"));
    } catch (err) {
      setResendMsg(err instanceof Error ? err.message : t("error"));
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      {status === "loading" && <p className="text-white/50">{t("loading")}</p>}
      {status === "ok" && <p className="text-emerald-400">{message}</p>}
      {status === "error" && (
        <div className="space-y-6">
          <p className="text-red-400">{message}</p>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left">
            <p className="text-sm text-white/70">{t("verifyResendPrompt")}</p>
            <form onSubmit={handleResend} className="mt-4 space-y-3">
              <input
                type="email"
                required
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/10 bg-deweb-bg px-3 py-2.5 text-sm text-white"
              />
              <button
                type="submit"
                disabled={resending}
                className="w-full rounded-full bg-deweb-cyan py-2.5 text-sm font-bold text-deweb-bg disabled:opacity-50"
              >
                {resending ? t("loading") : t("verifyResendBtn")}
              </button>
            </form>
            {resendMsg && <p className="mt-3 text-sm text-emerald-400">{resendMsg}</p>}
          </div>
        </div>
      )}
      <Link href="/account/login" className="mt-8 inline-block font-bold text-deweb-cyan">
        {t("signIn")} →
      </Link>
    </div>
  );
}

export default function VerifyEmailPage() {
  const t = useTranslations("account");
  return (
    <Suspense fallback={<p className="py-32 text-center text-white/50">{t("loading")}</p>}>
      <h1 className="text-center text-2xl font-bold text-white">{t("verifyEmailTitle")}</h1>
      <VerifyEmailInner />
    </Suspense>
  );
}
