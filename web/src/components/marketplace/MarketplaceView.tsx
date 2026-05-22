"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";
import { dewebApi, getToken, type MarketplaceListing } from "@/lib/api";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

type Filter = "customer_request" | "worker_offer";

export function MarketplaceView() {
  const t = useTranslations("marketplace");
  const [filter, setFilter] = useState<Filter>("customer_request");
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [applyMsg, setApplyMsg] = useState("");
  const [selected, setSelected] = useState<MarketplaceListing | null>(null);
  const [applyForm, setApplyForm] = useState({ message: "", price: "", timeline: "" });

  function load() {
    setLoading(true);
    dewebApi.listings
      .list(filter)
      .then((d) => setListings(d.listings || []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, [filter]);

  const filtered = listings.filter((l) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      l.title?.toLowerCase().includes(q) ||
      l.description?.toLowerCase().includes(q) ||
      l.authorName?.toLowerCase().includes(q)
    );
  });

  async function submitApply() {
    if (!selected || !getToken()) {
      setApplyMsg(t("loginToApply"));
      return;
    }
    try {
      await dewebApi.listings.apply(selected.id, {
        message: applyForm.message,
        price: Number(applyForm.price) || selected.budget,
        timeline: applyForm.timeline,
      });
      setApplyMsg(t("applicationSent"));
      setSelected(null);
    } catch (e) {
      setApplyMsg(e instanceof Error ? e.message : t("error"));
    }
  }

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="container-narrow px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setFilter("customer_request")}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-bold",
              filter === "customer_request"
                ? "bg-deweb-cyan text-deweb-bg"
                : "border border-white/15 text-white/60"
            )}
          >
            {t("filterCustomer")}
          </button>
          <button
            type="button"
            onClick={() => setFilter("worker_offer")}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-bold",
              filter === "worker_offer"
                ? "bg-deweb-cyan text-deweb-bg"
                : "border border-white/15 text-white/60"
            )}
          >
            {t("filterWorker")}
          </button>
          <Link
            href="/account/listings"
            className="ml-auto rounded-full border border-deweb-cyan/40 px-5 py-2.5 text-sm font-bold text-deweb-cyan"
          >
            {t("postYours")}
          </Link>
        </div>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("search")}
          className="mb-8 w-full max-w-md rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
        />

        {loading && <p className="text-white/50">{t("loading")}</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                setSelected(l);
                setApplyForm({
                  message: "",
                  price: String(l.budget || ""),
                  timeline: "",
                });
                setApplyMsg("");
              }}
              className="text-left"
            >
              <GlassCard className="h-full p-6 hover:border-deweb-cyan/30">
                <span className="text-[10px] font-bold uppercase text-deweb-cyan">
                  {l.listingType === "customer_request" ? t("customerNeed") : t("workerOffer")}
                </span>
                <h3 className="mt-2 font-bold text-white">{l.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-white/55">{l.description}</p>
                <p className="mt-4 font-bold text-deweb-cyan">
                  {l.budgetLabel || (l.budget ? `$${l.budget}` : "—")}
                </p>
                {l.deadline && (
                  <p className="mt-1 text-xs text-white/40">
                    {t("deadline")}: {l.deadline}
                  </p>
                )}
                <p className="mt-3 text-xs text-white/35">{l.authorName}</p>
              </GlassCard>
            </button>
          ))}
        </div>

        {!loading && filtered.length === 0 && (
          <p className="text-center text-white/45">{t("noListings")}</p>
        )}

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <GlassCard className="max-w-lg w-full p-6">
              <h3 className="text-xl font-bold text-white">{selected.title}</h3>
              <p className="mt-2 text-sm text-white/60">{selected.description}</p>
              {!getToken() ? (
                <p className="mt-4">
                  <Link href="/account/login" className="text-deweb-cyan font-bold">
                    {t("loginToApply")}
                  </Link>
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  <textarea
                    value={applyForm.message}
                    onChange={(e) => setApplyForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={t("yourProposal")}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white text-sm"
                  />
                  <input
                    type="number"
                    value={applyForm.price}
                    onChange={(e) => setApplyForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder={t("yourPrice")}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
                  />
                  <input
                    value={applyForm.timeline}
                    onChange={(e) => setApplyForm((f) => ({ ...f, timeline: e.target.value }))}
                    placeholder={t("timeline")}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
                  />
                  <button
                    type="button"
                    onClick={submitApply}
                    className="w-full rounded-full bg-deweb-cyan py-3 font-bold text-deweb-bg"
                  >
                    {t("sendRequest")}
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mt-4 text-sm text-white/45"
              >
                {t("close")}
              </button>
              {applyMsg && <p className="mt-2 text-sm text-emerald-400">{applyMsg}</p>}
            </GlassCard>
          </div>
        )}
      </div>
    </>
  );
}
