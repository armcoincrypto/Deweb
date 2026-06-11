"use client";

import { useState } from "react";
import { dewebApi, type LeadSubmissionType } from "@/lib/api";
import { getBlogAttribution } from "@/lib/blog/tracking";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  type: LeadSubmissionType;
  productName?: string;
  askingPrice?: number;
  title?: string;
};

const TYPE_LABELS: Record<LeadSubmissionType, string> = {
  contact: "Contact Us",
  price_offer: "Offer Your Price",
  request_details: "Request Details",
  user_offer: "Submit Your Offer",
};

export function LeadFormModal({ open, onClose, type, productName, askingPrice, title }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    offeredPrice: "",
    message: "",
    category: "",
    offerTitle: title || "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    try {
      const res = await dewebApi.leads.create({
        submissionType: type,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        productName: productName || form.offerTitle,
        title: form.offerTitle,
        category: form.category,
        offeredPrice: form.offeredPrice ? Number(form.offeredPrice) : undefined,
        askingPrice: askingPrice,
        ...getBlogAttribution(),
      });
      setStatus("success");
      setFeedback(res.message);
      setForm({ name: "", email: "", phone: "", offeredPrice: "", message: "", category: "", offerTitle: title || "" });
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="glass-panel-glow max-h-[90vh] w-full max-w-lg overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">{TYPE_LABELS[type]}</h2>
            {productName && <p className="mt-1 text-sm text-white/50">{productName}</p>}
            {askingPrice != null && askingPrice > 0 && (
              <p className="mt-1 text-sm font-semibold text-deweb-cyan">Listed price: ${askingPrice.toLocaleString()}</p>
            )}
          </div>
          <button type="button" onClick={onClose} className="text-white/40 hover:text-white">✕</button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {type === "user_offer" && (
            <>
              <Field label="Title *" value={form.offerTitle} onChange={(v) => setForm((f) => ({ ...f, offerTitle: v }))} required />
              <Field label="Category" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} />
            </>
          )}
          <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
          <Field label="Email *" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} required />
          <Field label="Phone / Telegram / WhatsApp" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
          {(type === "price_offer" || type === "user_offer") && (
            <Field
              label={type === "user_offer" ? "Asking / Offered Price (USD)" : "Your Offered Price (USD)"}
              type="number"
              value={form.offeredPrice}
              onChange={(v) => setForm((f) => ({ ...f, offeredPrice: v }))}
            />
          )}
          <label className="block text-xs font-bold uppercase text-white/40">
            {type === "request_details" ? "What would you like to know? *" : "Message / Details *"}
            <textarea
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
            />
          </label>
          {feedback && (
            <p className={cn("text-sm", status === "success" ? "text-emerald-400" : "text-red-400")}>{feedback}</p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-deweb-cyan py-3.5 font-bold text-deweb-bg disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-xs font-bold uppercase text-white/40">
      {label}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none"
      />
    </label>
  );
}
