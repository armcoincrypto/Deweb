"use client";

import { useState } from "react";
import { siteFaqs } from "@/lib/conversion-data";
import { GlassCard } from "@/components/ui/GlassCard";

type Props = {
  className?: string;
  limit?: number;
};

export function SiteFaqSection({ className = "", limit }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = limit ? siteFaqs.slice(0, limit) : siteFaqs;

  return (
    <section className={className} aria-labelledby="site-faq-heading">
      <h2 id="site-faq-heading" className="text-2xl font-bold text-white sm:text-3xl">
        Frequently asked questions
      </h2>
      <div className="mt-6 space-y-3">
        {faqs.map((faq, i) => (
          <GlassCard key={faq.question} className="overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
              aria-expanded={openFaq === i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <h3 className="text-sm font-semibold text-white sm:text-base">{faq.question}</h3>
              <span className="shrink-0 text-xl text-deweb-cyan" aria-hidden="true">
                {openFaq === i ? "−" : "+"}
              </span>
            </button>
            {openFaq === i && (
              <p className="border-t border-white/[0.06] px-5 pb-5 pt-4 text-sm leading-relaxed text-white/60 sm:px-6 sm:pb-6">
                {faq.answer}
              </p>
            )}
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
