"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import type { Product } from "@/lib/api";

type SupplierCardProps = {
  product: Product;
  index?: number;
};

export function SupplierCard({ product, index = 0 }: SupplierCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-panel group flex flex-col p-6 transition-all hover:border-deweb-cyan/30"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-deweb-cyan/25 to-purple-500/20 text-lg font-bold text-white">
          {(product.sellerName || product.title || "?")[0]}
        </div>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-400">
          Verified
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-white group-hover:text-deweb-cyan transition-colors">
        {product.title}
      </h3>
      <p className="mt-1 text-sm text-deweb-cyan">{product.category || "IT Services"}</p>
      {product.description && (
        <p className="mt-3 line-clamp-2 flex-1 text-sm text-white/50">{product.description}</p>
      )}
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <p className="text-xs text-white/40">Starting at</p>
          <p className="text-xl font-bold text-deweb-cyan">
            {Number(product.price || 0).toLocaleString()} DEWEB
          </p>
        </div>
        {product.rating != null && (
          <span className="text-sm text-amber-400">★ {product.rating}</span>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <Link
          href="/signup"
          className="flex-1 rounded-full border border-deweb-cyan/40 py-2.5 text-center text-xs font-bold text-deweb-cyan hover:bg-deweb-cyan/10"
        >
          Request bid
        </Link>
        <button
          type="button"
          className="rounded-full border border-white/15 px-4 py-2.5 text-xs font-bold text-white/70 hover:border-white/30"
        >
          Compare
        </button>
      </div>
    </motion.div>
  );
}
