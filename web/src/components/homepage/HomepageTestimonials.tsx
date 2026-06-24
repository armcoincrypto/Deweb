"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/animations";
import { TestimonialSlider } from "@/components/premium/TestimonialSlider";
import { clientTestimonials } from "@/lib/social-proof-data";

export function HomepageTestimonials() {
  const t = useTranslations("home");

  return (
    <section id="testimonials" className="border-y border-white/[0.06] bg-white/[0.02] py-20 sm:py-28">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-deweb-cyan/80">
            {t("testimonialsKicker")}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t("testimonialsTitle")}</h2>
          <p className="mt-4 text-base text-white/55">{t("testimonialsSubtitle")}</p>
        </ScrollReveal>
        <TestimonialSlider
          className="mt-12"
          items={clientTestimonials.map((item) => ({
            quote: item.quote,
            author: item.author,
            role: item.role,
            rating: item.rating,
          }))}
        />
      </div>
    </section>
  );
}
