"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/layout/PageHeader";
import { SupplierCard } from "@/components/marketplace/SupplierCard";
import { dewebApi, type Product } from "@/lib/api";
import { categories } from "@/lib/data";

export function MarketplaceView() {
  const t = useTranslations("marketplace");
  const tc = useTranslations("common");
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dewebApi.products
      .list()
      .then((d) => setProducts(d.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      p.title?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q);
    const matchCat =
      category === "all" || p.category?.toLowerCase().includes(category.toLowerCase());
    return matchQ && matchCat;
  });

  const demoProducts: Product[] =
    filtered.length > 0
      ? filtered
      : [
          { id: "1", title: "Full-Stack Web App", price: 4500, category: "Web Development", description: "React + Node delivery with milestones.", rating: 4.9, sellerName: "Nexus Labs" },
          { id: "2", title: "AI Chatbot Integration", price: 2800, category: "AI & Automation", description: "Custom GPT workflows for support.", rating: 4.8, sellerName: "CloudForge" },
          { id: "3", title: "Mobile Banking UI", price: 6200, category: "UI/UX Design", description: "Figma to production-ready UI.", rating: 5.0, sellerName: "PixelStack" },
          { id: "4", title: "E-commerce Store", price: 8900, category: "E-commerce", description: "Shopify + custom checkout.", rating: 4.7, sellerName: "DevMint" },
          { id: "5", title: "Telegram Sales Bot", price: 1200, category: "Bots & SaaS", description: "Lead capture and auto-replies.", rating: 4.6, sellerName: "AutoStack" },
          { id: "6", title: "SEO Growth Package", price: 900, category: "SEO", description: "Technical audit + content plan.", rating: 4.5, sellerName: "RankFlow" },
        ];

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="container-narrow px-4 py-10 sm:px-6 lg:px-8">
        <div className="glass-panel mb-8 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search")}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-deweb-cyan/50 focus:outline-none sm:max-w-md"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-deweb-cyan/50 focus:outline-none"
          >
            <option value="all">{t("filterAll")}</option>
            {categories.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            248 {t("suppliersOnline")}
          </div>
        </div>

        {loading && (
          <p className="text-center text-white/50">{tc("loading")}</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demoProducts.map((p, i) => (
            <SupplierCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="glass-panel-glow p-6">
            <h3 className="font-bold text-white">{t("liveActivity")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>☆ Marcus bid $6,850 on E-commerce API — <span className="text-emerald-400">2m ago</span></li>
              <li>☆ Elena won SaaS Landing — <span className="text-deweb-cyan">12m ago</span></li>
              <li>☆ James posted DevOps Pipeline — <span className="text-white/40">18m ago</span></li>
            </ul>
          </div>
          <div className="glass-panel p-6">
            <h3 className="font-bold text-white">{t("openProjects")}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/80">Custom AI CRM</span>
                <span className="font-bold text-deweb-cyan">$5k–$10k</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/80">Mobile Banking UI</span>
                <span className="font-bold text-deweb-cyan">$4k–$8k</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/80">Marketplace MVP</span>
                <span className="font-bold text-deweb-cyan">$12k–$25k</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
