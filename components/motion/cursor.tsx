"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getEnabledSnapshot = () => {
  if (typeof window === "undefined") return false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(pointer: coarse)").matches;
  return !reduced && !touch;
};
const getEnabledServerSnapshot = () => false;

export function Cursor() {
  const x = useSpring(useMotionValue(0), { stiffness: 400, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 400, damping: 30 });
  const enabled = useSyncExternalStore(subscribe, getEnabledSnapshot, getEnabledServerSnapshot);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 12);
      y.set(e.clientY - 12);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor=hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, scale: hover ? 2.4 : 1 }}
      className="pointer-events-none fixed left-0 top-0 z-[100] h-6 w-6 rounded-full mix-blend-difference bg-white transition-[scale] duration-200"
    />
  );
}
