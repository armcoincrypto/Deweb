"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/layout/PageHeader";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <div className="container-narrow max-w-lg px-4 py-12 sm:px-6 lg:px-8">
        <form className="glass-panel-glow space-y-4 p-8">
          <label className="block text-xs font-bold uppercase text-white/40">
            {t("name")}
            <input className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none" />
          </label>
          <label className="block text-xs font-bold uppercase text-white/40">
            {t("email")}
            <input type="email" className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none" />
          </label>
          <label className="block text-xs font-bold uppercase text-white/40">
            {t("message")}
            <textarea rows={5} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-deweb-cyan/50 focus:outline-none" />
          </label>
          <button type="button" className="w-full rounded-full bg-deweb-cyan py-3.5 font-bold text-deweb-bg">
            {t("send")}
          </button>
        </form>
      </div>
    </>
  );
}
