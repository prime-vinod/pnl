"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <div>{children}</div>;
  // The element type depends only on `reduced` (stable for the page's life), so
  // this never swaps type and never remounts its children. On a first-visit
  // intro load the entrance runs once at hydration *under* the overlay (the page
  // starts fully clipped, finishes well before the wipe) and is never replayed;
  // the overlay owns the visible reveal and the hero's kinetic title (gated on
  // `useIntro().ready`) rises into the wipe. Reading the transient `active` here
  // would flip the wrapper type when the intro ends and replay the entrance.
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
