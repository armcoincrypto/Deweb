"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { dewebApi } from "@/lib/api";
import { getBlogAttribution } from "@/lib/blog/tracking";
import { trackHomeCta } from "@/lib/cta-tracking";

type ContactFormProps = {
  className?: string;
  compact?: boolean;
};

export function ContactForm({ className, compact = false }: ContactFormProps) {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    try {
      const res = await dewebApi.contact.send({
        name,
        email,
        phone,
        message,
        ...getBlogAttribution(),
      });
      setStatus("success");
      setFeedback(res.message || t("success"));
      trackHomeCta("contact_click", {
        placement: "contact_form",
        label: "form_submit",
        href: "#contact",
      });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : t("error"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {compact ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-xs font-bold uppercase text-white/40">
            {t("name")}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
            />
          </label>
          <label className="block text-xs font-bold uppercase text-white/40">
            Phone / Telegram
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
            />
          </label>
        </div>
      ) : (
        <>
          <label className="block text-xs font-bold uppercase text-white/40">
            {t("name")}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
            />
          </label>
          <label className="block text-xs font-bold uppercase text-white/40">
            Phone / Telegram / WhatsApp
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
            />
          </label>
        </>
      )}
      <label className={`block text-xs font-bold uppercase text-white/40 ${compact ? "mt-4" : ""}`}>
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
          rows={compact ? 4 : 5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your Shopify store, AI chatbot, SaaS idea, or website project…"
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 focus:border-deweb-cyan/50 focus:outline-none"
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
        className="w-full rounded-full bg-deweb-cyan py-3.5 font-bold text-deweb-bg shadow-glow transition-all hover:shadow-glow-lg disabled:opacity-60"
      >
        {status === "loading" ? t("sending") : t("send")}
      </button>
    </form>
  );
}
