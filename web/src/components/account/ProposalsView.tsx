"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { dewebApi, type ProjectOrder } from "@/lib/api";

export function ProposalsView() {
  const t = useTranslations("account");
  const [open, setOpen] = useState<ProjectOrder[]>([]);
  const [selected, setSelected] = useState<ProjectOrder | null>(null);
  const [price, setPrice] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dewebApi.orders.open().then((d) => setOpen(d.orders || [])).catch(() => setOpen([]));
  }, []);

  async function submitProposal(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setError("");
    try {
      await dewebApi.bids.submit(selected.id, {
        price: Number(price),
        timeline,
        message,
      });
      setMsg(t("proposalSent"));
      setPrice("");
      setTimeline("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("error"));
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">{t("proposals")}</h1>
      <p className="mt-2 text-white/50">{t("proposalsSubtitle")}</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase text-white/40">{t("openProjects")}</h3>
          {open.length === 0 && <p className="text-white/45">{t("noOpenProjects")}</p>}
          {open.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setSelected(o)}
              className={`w-full text-left glass-panel p-5 hover:border-deweb-cyan/30 ${
                selected?.id === o.id ? "border-deweb-cyan/40" : ""
              }`}
            >
              <h4 className="font-bold text-white">{o.service || t("untitled")}</h4>
              <p className="mt-1 text-sm text-deweb-cyan">{o.budget}</p>
              <p className="mt-2 line-clamp-2 text-xs text-white/50">{o.details}</p>
            </button>
          ))}
        </div>

        <div className="glass-panel-glow p-6">
          {!selected ? (
            <p className="text-white/45">{t("selectToBid")}</p>
          ) : (
            <form onSubmit={submitProposal} className="space-y-4">
              <h3 className="font-bold text-white">{t("submitProposal")}</h3>
              <p className="text-sm text-white/50">{selected.service}</p>
              <input
                type="number"
                min={1}
                required
                placeholder={t("yourPrice")}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
              />
              <input
                placeholder={t("timeline")}
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
              />
              <textarea
                placeholder={t("proposalMessage")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
              />
              {msg && <p className="text-sm text-emerald-400">{msg}</p>}
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-full bg-deweb-cyan py-3 font-bold text-deweb-bg"
              >
                {t("sendProposal")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
