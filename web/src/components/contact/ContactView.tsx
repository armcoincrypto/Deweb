"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/layout/PageHeader";
import { api } from "@/lib/api";

export function ContactView() {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    try {
      const res = await api<{ message?: string }>("/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
      });
      setStatus("success");
      setFeedback(res.message || t("success"));
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : t("error"));
    }
  }

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="container-narrow px-4 pb-16 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="glass-panel-glow mx-auto max-w-2xl space-y-4 p-8"
        >
          <label className="block text-xs font-bold uppercase text-white/40">
            {t("name")}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
            />
          </label>
          <label className="block text-xs font-bold uppercase text-white/40">
            {t("email")}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
            />
          </label>
          <label className="block text-xs font-bold uppercase text-white/40">
            {t("message")}
            <textarea
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
            />
          </label>
          {feedback && (
            <p
              className={`text-sm ${status === "success" ? "text-emerald-400" : "text-red-400"}`}
              role="status"
            >
              {feedback}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-deweb-cyan py-3.5 font-bold text-deweb-bg transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? t("sending") : t("send")}
          </button>
        </form>
      </div>
    </>
  );
}
