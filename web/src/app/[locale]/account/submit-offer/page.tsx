"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AccountShell } from "@/components/account/AccountShell";
import { useAuth } from "@/lib/auth-context";
import { dewebApi } from "@/lib/api";
import { Link } from "@/i18n/routing";

export default function SubmitOfferPage() {
  const t = useTranslations("account");
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    category: "",
    askingPrice: "",
    description: "",
    phone: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.email) return;
    setLoading(true);
    setError("");
    setMsg("");
    try {
      const res = await dewebApi.leads.create({
        submissionType: "user_offer",
        title: form.title,
        category: form.category,
        askingPrice: form.askingPrice ? Number(form.askingPrice) : undefined,
        message: form.description,
        phone: form.phone,
        email: user.email,
        name: user.name || user.username || "",
      });
      setMsg(res.message);
      setForm({ title: "", category: "", askingPrice: "", description: "", phone: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : t("error"));
    } finally {
      setLoading(false);
    }
  }

  if (user && !user.emailVerified) {
    return (
      <AccountShell role="customer">
        <h1 className="text-2xl font-bold text-white">{t("submitOfferTitle")}</h1>
        <p className="mt-4 text-amber-400">Please verify your email before submitting offers.</p>
        <Link href="/account/profile" className="mt-4 inline-block font-bold text-deweb-cyan">
          Go to Profile →
        </Link>
      </AccountShell>
    );
  }

  return (
    <AccountShell role="customer">
      <h1 className="text-2xl font-bold text-white">{t("submitOfferTitle")}</h1>
      <p className="mt-2 text-white/50">Tell us what you offer or what you need. We will contact you to negotiate.</p>
      <form onSubmit={submit} className="mt-8 max-w-xl space-y-4">
        {[
          { key: "title", label: "Title *", required: true },
          { key: "category", label: "Category" },
          { key: "askingPrice", label: "Asking / Offered Price (USD)", type: "number" },
          { key: "phone", label: "Phone / Telegram / WhatsApp" },
        ].map((f) => (
          <label key={f.key} className="block text-xs font-bold uppercase text-white/40">
            {f.label}
            <input
              required={f.required}
              type={f.type || "text"}
              value={form[f.key as keyof typeof form]}
              onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
            />
          </label>
        ))}
        <label className="block text-xs font-bold uppercase text-white/40">
          Description *
          <textarea
            rows={5}
            required
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
          />
        </label>
        {msg && <p className="text-sm text-emerald-400">{msg}</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-deweb-cyan px-8 py-3 font-bold text-deweb-bg disabled:opacity-60"
        >
          {loading ? t("loading") : "Submit"}
        </button>
      </form>
    </AccountShell>
  );
}
