"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useAuth } from "@/lib/auth-context";

function VerifyEmailInner() {
  const t = useTranslations("account");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refresh } = useAuth();
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage(t("verifyTokenMissing"));
      return;
    }
    const base =
      typeof window !== "undefined"
        ? process.env.NEXT_PUBLIC_API_URL ||
          (window.location.hostname === "localhost" ? "http://localhost:3000/api" : "/api")
        : "/api";
    fetch(`${base}/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");
        setStatus("ok");
        setMessage(data.message || t("emailVerified"));
        await refresh();
        setTimeout(() => router.replace("/account"), 2000);
      })
      .catch((e) => {
        setStatus("error");
        setMessage(e instanceof Error ? e.message : t("error"));
      });
  }, [searchParams, t, refresh, router]);

  return (
    <div className="mx-auto max-w-md px-4 py-32 text-center">
      {status === "loading" && <p className="text-white/50">{t("loading")}</p>}
      {status === "ok" && <p className="text-emerald-400">{message}</p>}
      {status === "error" && <p className="text-red-400">{message}</p>}
      <Link href="/account" className="mt-8 inline-block font-bold text-deweb-cyan">
        {t("overview")} →
      </Link>
    </div>
  );
}

export default function VerifyEmailPage() {
  const t = useTranslations("account");
  return (
    <Suspense fallback={<p className="py-32 text-center text-white/50">{t("loading")}</p>}>
      <h1 className="text-2xl font-bold text-white">{t("verifyEmailTitle")}</h1>
      <VerifyEmailInner />
    </Suspense>
  );
}
