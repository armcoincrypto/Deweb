"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";
import { LeadFormModal } from "@/components/leads/LeadFormModal";
import { dewebApi, getToken, type MarketplaceListing, type Product, type LeadSubmissionType } from "@/lib/api";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

type Filter = "customer_request" | "worker_offer" | "products";

export function MarketplaceView() {
  const t = useTranslations("marketplace");
  const [filter, setFilter] = useState<Filter>("customer_request");
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [applyMsg, setApplyMsg] = useState("");
  const [selected, setSelected] = useState<MarketplaceListing | null>(null);
  const [applyForm, setApplyForm] = useState({ message: "", price: "", timeline: "" });
  const [leadModal, setLeadModal] = useState<{
    open: boolean;
    type: LeadSubmissionType;
    product?: Product;
  }>({ open: false, type: "contact" });

  const load = useCallback(() => {
    setLoading(true);
    if (filter === "products") {
      dewebApi.products
        .list()
        .then((d) => setProducts(d.products || []))
        .catch(() => setProducts([]))
        .finally(() => setLoading(false));
    } else {
      dewebApi.listings
        .list(filter)
        .then((d) => setListings(d.listings || []))
        .catch(() => setListings([]))
        .finally(() => setLoading(false));
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const filteredListings = listings.filter((l) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      l.title?.toLowerCase().includes(q) ||
      l.description?.toLowerCase().includes(q) ||
      l.authorName?.toLowerCase().includes(q)
    );
  });

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
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

  function openLead(type: LeadSubmissionType, product?: Product) {
    setLeadModal({ open: true, type, product });
  }

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="container-narrow px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-3">
          {(["customer_request", "worker_offer", "products"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-bold",
                filter === f ? "bg-deweb-cyan text-deweb-bg" : "border border-white/15 text-white/60"
              )}
            >
              {f === "products" ? "Products & Services" : f === "customer_request" ? t("filterCustomer") : t("filterWorker")}
            </button>
          ))}
          <Link
            href="/account/listings"
            className="ml-auto rounded-full border border-deweb-cyan/40 px-5 py-2.5 text-sm font-bold text-deweb-cyan"
          >
            {t("postYours")}
          </Link>
          <Link
            href="/account/submit-offer"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold text-white/70"
          >
            Submit Offer
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

        {filter !== "products" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  setSelected(l);
                  setApplyForm({ message: "", price: String(l.budget || ""), timeline: "" });
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
                    {l.budgetLabel || (l.budget ? `$${l.budget.toLocaleString()}` : "Price on request")}
                  </p>
                  {l.deadline && (
                    <p className="mt-1 text-xs text-white/40">{t("deadline")}: {l.deadline}</p>
                  )}
                  <p className="mt-3 text-xs text-white/35">{l.authorName}</p>
                </GlassCard>
              </button>
            ))}
          </div>
        )}

        {filter === "products" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => (
              <GlassCard key={p.id} className="flex h-full flex-col p-6">
                <span className="text-[10px] font-bold uppercase text-deweb-cyan">{p.category || "Service"}</span>
                <h3 className="mt-2 font-bold text-white">{p.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-white/55">{p.description}</p>
                <p className="mt-4 text-2xl font-bold text-deweb-cyan">
                  ${Number(p.price || 0).toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-white/35">{p.sellerName}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => openLead("contact", p)}
                    className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-bold text-white/80"
                  >
                    Contact Us
                  </button>
                  <button
                    type="button"
                    onClick={() => openLead("price_offer", p)}
                    className="rounded-full bg-deweb-cyan/20 px-3 py-1.5 text-xs font-bold text-deweb-cyan"
                  >
                    Offer Your Price
                  </button>
                  <button
                    type="button"
                    onClick={() => openLead("request_details", p)}
                    className="rounded-full border border-deweb-cyan/30 px-3 py-1.5 text-xs font-bold text-deweb-cyan"
                  >
                    Request Details
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {!loading && filter === "products" && filteredProducts.length === 0 && (
          <p className="text-center text-white/45">No products listed yet.</p>
        )}
        {!loading && filter !== "products" && filteredListings.length === 0 && (
          <p className="text-center text-white/45">{t("noListings")}</p>
        )}

        <LeadFormModal
          open={leadModal.open}
          onClose={() => setLeadModal((m) => ({ ...m, open: false }))}
          type={leadModal.type}
          productName={leadModal.product?.title}
          askingPrice={leadModal.product?.price}
        />

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <GlassCard className="max-w-lg w-full p-6">
              <h3 className="text-xl font-bold text-white">{selected.title}</h3>
              <p className="mt-2 text-sm text-white/60">{selected.description}</p>
              <p className="mt-3 font-bold text-deweb-cyan">
                {selected.budgetLabel || (selected.budget ? `$${selected.budget}` : "Negotiable")}
              </p>
              {!getToken() ? (
                <p className="mt-4">
                  <Link href="/account/login" className="font-bold text-deweb-cyan">{t("loginToApply")}</Link>
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  <textarea
                    value={applyForm.message}
                    onChange={(e) => setApplyForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={t("yourProposal")}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
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
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => openLead("contact")} className="text-sm text-deweb-cyan">
                  Contact Us
                </button>
                <button type="button" onClick={() => openLead("price_offer")} className="text-sm text-deweb-cyan">
                  Offer Your Price
                </button>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="mt-4 text-sm text-white/45">
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
