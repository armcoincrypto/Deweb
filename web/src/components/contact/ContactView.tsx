"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/layout/PageHeader";
import { SocialLinks } from "@/components/contact/SocialLinks";
import { dewebApi } from "@/lib/api";
import { getBlogAttribution } from "@/lib/blog/tracking";

export function ContactView() {
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

      {/* Service quick links */}
      <section className="container-narrow px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: "Shopify", href: "/services/shopify-development" },
            { label: "AI Automation", href: "/services/ai-business-automation" },
            { label: "SaaS", href: "/services/saas-development" },
            { label: "Marketplace", href: "/services/marketplace-development" },
            { label: "Web Apps", href: "/services/web-application-development" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition-colors hover:border-deweb-cyan/40 hover:text-deweb-cyan"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <div className="container-narrow px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-white/45">
          {t("followUs")}
        </p>
        <SocialLinks size="lg" className="mt-8" />

        <form
          onSubmit={handleSubmit}
          className="glass-panel-glow mx-auto mt-14 max-w-2xl space-y-4 p-8"
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
            Phone / Telegram / WhatsApp
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
