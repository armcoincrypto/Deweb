"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/data";
import { GlowButton } from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/[0.06] bg-deweb-bg/80 py-3 backdrop-blur-2xl"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-narrow flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-deweb-cyan to-deweb-cyan-dim text-lg font-black text-deweb-bg shadow-glow-sm">
            D
          </span>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-deweb-cyan transition-colors">
            DEWEB
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-deweb-cyan"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <GlowButton href="#marketplace" variant="secondary" className="!px-5 !py-2.5 !text-xs">
            Get Offers
          </GlowButton>
          <GlowButton href="#hero" variant="primary" className="!px-5 !py-2.5 !text-xs">
            Post a Project
          </GlowButton>
          <a
            href={process.env.NEXT_PUBLIC_LEGACY_URL ? `${process.env.NEXT_PUBLIC_LEGACY_URL}/account.html` : "https://dewebam.com/account.html"}
            className="ml-2 text-sm font-semibold text-white/80 hover:text-white"
          >
            Account →
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span className="text-xl">{mobileOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-white/10 bg-deweb-bg/95 px-4 py-4 backdrop-blur-xl lg:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-white/80"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <GlowButton href="#hero" variant="primary">
              Post a Project
            </GlowButton>
            <a
              href={process.env.NEXT_PUBLIC_LEGACY_URL ? `${process.env.NEXT_PUBLIC_LEGACY_URL}/account.html` : "https://dewebam.com/account.html"}
              className="block rounded-full border border-white/15 py-3 text-center text-white/80"
            >
              Account
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
