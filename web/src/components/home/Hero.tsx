"use client";

import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { LiveDashboard } from "./LiveDashboard";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 sm:pt-32 lg:pt-36">
      <div className="container-narrow px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-deweb-cyan/25 bg-deweb-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-deweb-cyan">
            <span className="h-2 w-2 animate-pulse rounded-full bg-deweb-cyan" />
            IT marketplace · competitive bidding
          </span>

          <h1 className="mt-8 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Suppliers Compete.{" "}
            <span className="bg-gradient-to-r from-white via-deweb-cyan to-white bg-clip-text text-transparent">
              You Win.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            Clients post IT projects and receive multiple competitive offers from verified
            suppliers. Compare pricing, timelines, and portfolios — then launch with confidence.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <GlowButton href="#how-it-works" variant="primary">
              Post a Project & Get Bids
            </GlowButton>
            <GlowButton href="#marketplace" variant="ghost">
              Explore Marketplace
            </GlowButton>
          </motion.div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <span className="font-bold text-white">4.5</span> avg bids / project
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-2">
              <span className="font-bold text-emerald-400">98%</span> success rate
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>AI automation · escrow · DEWEB coins</span>
          </div>
        </motion.div>

        <LiveDashboard />
      </div>
    </section>
  );
}
