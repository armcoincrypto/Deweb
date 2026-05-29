"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { dewebApi } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

type ConsultationFormProps = {
  categories?: { id: string; title: string }[];
  className?: string;
};

export function ConsultationForm({ categories = [], className }: ConsultationFormProps) {
  const t = useTranslations("services");
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [estimate, setEstimate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.email) setEmail(user.email);
    if (user?.name) setName(user.name);
  }, [user]);

  const runEstimate = useCallback(async (msg: string, bud: string, cat: string) => {
    if (msg.length < 20) {
      setEstimate(null);
      return;
    }
    try {
      const res = await dewebApi.services.estimate({ message: msg, budget: bud, category: cat });
      setEstimate(res.suggestedTimeline);
    } catch {
      setEstimate(null);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => runEstimate(message, budget, category), 600);
    return () => clearTimeout(timer);
  }, [message, budget, category, runEstimate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await dewebApi.offers.create({ name, email, message, budget, deadline, category });
      setSuccess(true);
      setMessage("");
      setBudget("");
      setDeadline("");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("formError"));
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className={cn("glass-panel-glow p-8 text-center", className)}>
        <span className="text-4xl">✓</span>
        <p className="mt-4 text-lg font-semibold text-deweb-cyan">{t("formSuccess")}</p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm text-white/50 hover:text-white"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("glass-panel-glow p-8", className)}>
      <h3 className="text-xl font-bold text-white">{t("formTitle")}</h3>
      <p className="mt-2 text-sm text-white/55">{t("formSubtitle")}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-white/45">{t("formName")}</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-deweb-cyan/50"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-white/45">{t("formEmail")}</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-deweb-cyan/50"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-white/45">{t("formBudget")}</span>
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="$5k – $15k"
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-deweb-cyan/50"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-white/45">{t("formDeadline")}</span>
          <input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="4–6 weeks"
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-deweb-cyan/50"
          />
        </label>
        {categories.length > 0 && (
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium text-white/45">{t("formCategory")}</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-deweb-cyan/50"
            >
              <option value="">Auto-detect from description</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="block sm:col-span-2">
          <span className="text-xs font-medium text-white/45">{t("formMessage")}</span>
          <textarea
            required
            minLength={20}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-deweb-cyan/50"
          />
          {estimate && (
            <p className="mt-2 text-xs text-deweb-cyan/80">
              {t("estimateHint")}: {estimate}
            </p>
          )}
        </label>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-deweb-cyan px-7 py-3.5 text-sm font-bold text-deweb-bg shadow-glow transition-all hover:brightness-110 disabled:opacity-60"
      >
        {loading ? "Sending…" : t("formSubmit")}
      </button>
    </form>
  );
}
