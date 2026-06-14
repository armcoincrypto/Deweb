"use client";

import { CinematicSection } from "@/components/cinematic/CinematicSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/contact/SocialLinks";
import { SiteFaqSection } from "@/components/conversion/SiteFaqSection";
import { TrustSignalsSection } from "@/components/conversion/TrustSignalsSection";
import { PRICING_NOTE, SERVICE_OFFERS } from "@/lib/conversion-data";

export function HomeContact() {
  return (
    <CinematicSection id="contact" fullScreen={false} className="section-padding pb-28">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Contact"
          title="Ready to grow your business?"
          subtitle="Tell us what you need — a website, Shopify store, AI chatbot, or automation system. We reply within 24 hours."
          id="contact-heading"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_OFFERS.map((offer) => (
            <div key={offer.slug} className="content-panel rounded-xl p-4">
              <p className="text-sm font-bold text-white">{offer.title}</p>
              <p className="mt-1 text-sm font-semibold text-deweb-cyan">{offer.startingPrice}</p>
              <p className="mt-1 text-xs text-white/50">{offer.timeline}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-white/45">{PRICING_NOTE}</p>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="hero-glass-panel rounded-2xl p-7 sm:p-9">
            <h3 className="text-xl font-bold text-white sm:text-2xl">Start your project today</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
              Fill out the form and we&apos;ll get back to you with a clear plan, timeline, and price.
            </p>
            <ContactForm className="mt-6 space-y-4" compact />
          </div>

          <div className="space-y-6">
            <div className="content-panel rounded-2xl p-7">
              <h3 className="text-lg font-bold text-white">What you get</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex gap-2">
                  <span className="font-bold text-deweb-cyan">✓</span> Free consultation
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-deweb-cyan">✓</span> Clear timeline and starting price
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-deweb-cyan">✓</span> Mobile-friendly, SEO-ready delivery
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-deweb-cyan">✓</span> Support after launch
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">Follow DeWeb</p>
              <SocialLinks size="lg" className="mt-3 justify-start" />
            </div>
          </div>
        </div>

        <TrustSignalsSection showProcess={false} className="mt-16" />
        <SiteFaqSection className="mt-16" limit={5} />
      </div>
    </CinematicSection>
  );
}
