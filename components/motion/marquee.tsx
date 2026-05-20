"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = { children: ReactNode; duration?: number; reverse?: boolean; className?: string };

export function Marquee({ children, duration = 30, reverse = false, className }: Props) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex w-max gap-12"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        <div className="flex gap-12">{children}</div>
        <div className="flex gap-12" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
