"use client";

import { ScrollReveal3D } from "@/components/ui/ScrollReveal3D";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowButton } from "@/components/ui/GlowButton";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/contact/SocialLinks";
import { motion3DStyle, PERSPECTIVE } from "@/lib/motion-3d";
import { motion, useReducedMotion } from "framer-motion";

export function HomeContact() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="section-padding pb-32" aria-labelledby="contact-heading">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Contact"
          title="Ready to build something exceptional?"
          subtitle="Tell us about your Shopify store, AI chatbot, website, or SaaS project. We respond within 24 hours."
          id="contact-heading"
        />

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <ScrollReveal3D depth="panel">
            <div
              className="glass-panel-glow space-y-6 p-8 sm:p-10"
              style={{ ...motion3DStyle, perspective: PERSPECTIVE }}
            >
              <h3 className="text-2xl font-bold text-white">Start your project</h3>
              <p className="text-white/55">
                Premium agency delivery for businesses that want technology that converts —
                not generic templates.
              </p>
              <ContactForm className="space-y-4" compact />
            </div>
          </ScrollReveal3D>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, rotateY: 12, z: -30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, rotateY: 0, z: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ ...motion3DStyle, perspective: PERSPECTIVE }}
            className="preserve-3d space-y-8"
          >
            <div className="glass-panel p-8">
              <h3 className="text-lg font-bold text-white">What you get</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/60">
                <li className="flex gap-2">
                  <span className="text-deweb-cyan">✓</span> Free consultation & project scope
                </li>
                <li className="flex gap-2">
                  <span className="text-deweb-cyan">✓</span> Transparent timeline & pricing
                </li>
                <li className="flex gap-2">
                  <span className="text-deweb-cyan">✓</span> SEO-ready, mobile-first delivery
                </li>
                <li className="flex gap-2">
                  <span className="text-deweb-cyan">✓</span> Ongoing support after launch
                </li>
              </ul>
              <div className="mt-8">
                <GlowButton href="/services" variant="secondary">
                  View all services
                </GlowButton>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-white/45">Follow DEWEB</p>
              <SocialLinks size="lg" className="mt-4 justify-center lg:justify-start" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
