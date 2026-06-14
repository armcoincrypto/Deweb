"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { dewebApi } from "@/lib/api";
import { getBlogAttribution } from "@/lib/blog/tracking";
import { trackHomeCta } from "@/lib/cta-tracking";
import {
  budgetOptions,
  contactServiceOptions,
  deadlineOptions,
} from "@/lib/conversion-data";

type ContactFormProps = {
  className?: string;
  compact?: boolean;
  submitLabel?: string;
};

const selectClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none";
const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none";

export function ContactForm({ className, compact = false, submitLabel }: ContactFormProps) {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
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
        service,
        budget,
        deadline,
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
      setService("");
      setBudget("");
      setDeadline("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : t("error"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={`grid gap-4 ${compact ? "sm:grid-cols-2" : ""}`}>
        <label className="block text-xs font-bold uppercase text-white/40">
          {t("name")}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className={inputClass}
          />
        </label>
        <label className="block text-xs font-bold uppercase text-white/40">
          {t("phone")}
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="WhatsApp or Telegram"
            className={inputClass}
          />
        </label>
      </div>

      <label className={`block text-xs font-bold uppercase text-white/40 ${compact ? "mt-4" : "mt-4"}`}>
        {t("email")}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={inputClass}
        />
      </label>

      <div className={`grid gap-4 ${compact ? "mt-4 sm:grid-cols-2" : "mt-4"}`}>
        <label className="block text-xs font-bold uppercase text-white/40">
          {t("service")}
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={selectClass}
          >
            <option value="">Select a service</option>
            {contactServiceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-bold uppercase text-white/40">
          {t("budget")}
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={selectClass}
          >
            <option value="">Select budget range</option>
            {budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block text-xs font-bold uppercase text-white/40">
        {t("deadline")}
        <select
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className={selectClass}
        >
          <option value="">Select deadline</option>
          {deadlineOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block text-xs font-bold uppercase text-white/40">
        {t("message")}
        <textarea
          rows={compact ? 4 : 5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your project, goals, and any important details…"
          className={inputClass}
        />
      </label>

      {feedback && (
        <p
          className={`mt-4 text-sm ${status === "success" ? "text-emerald-400" : "text-red-400"}`}
          role="status"
        >
          {feedback}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-full rounded-full bg-deweb-cyan py-3.5 font-bold text-deweb-bg shadow-glow transition-all hover:shadow-glow-lg disabled:opacity-60"
      >
        {status === "loading" ? t("sending") : submitLabel || t("send")}
      </button>
    </form>
  );
}
