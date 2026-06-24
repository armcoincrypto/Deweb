"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "@/i18n/routing";
import { PAGE_TRANSITION } from "@/lib/animations/config";
import { useMotionSafe } from "@/lib/animations/hooks";

type PageTransitionProps = {
  children: React.ReactNode;
};

/** Route-level fade — SEO-safe, no content unmount delay */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const { reduceMotion } = useMotionSafe();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={PAGE_TRANSITION}
        className="min-h-0 will-change-[opacity,transform]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
