"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FilmRoll } from "./film-roll";

const EASE = [0.22, 1, 0.36, 1] as const;
const NAME = "VINOD SUTHAR";
const REVEAL_AT_MS = 4000;
const FONTS_CAP_MS = 200;
const BAR_STEPS = 30;

const STATUS_LINES = [
  "> initializing portfolio...",
  "> loading modules...",
  "> connecting systems...",
  "> ready.",
];

type Props = { onReveal: () => void; onDone: () => void };

export function Preloader({ onReveal, onDone }: Props) {
  const [nameGo, setNameGo] = useState(false);
  const [wipe, setWipe] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    let active = true;
    const cap = new Promise<void>((r) => setTimeout(r, FONTS_CAP_MS));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fonts, cap]).then(() => {
      if (active) setNameGo(true);
    });

    // Progress bar ticks every ~40ms to reach 100% just before reveal
    const tickMs = (REVEAL_AT_MS * 0.85) / 100;
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 1, 100);
        // Cycle status lines at 25% intervals
        setStatusIdx(Math.min(Math.floor(next / 26), STATUS_LINES.length - 1));
        return next;
      });
    }, tickMs);

    const reveal = setTimeout(() => {
      if (!active) return;
      onReveal();
      setWipe(true);
    }, REVEAL_AT_MS);

    return () => {
      active = false;
      clearInterval(progressInterval);
      clearTimeout(reveal);
    };
  }, [onReveal]);

  const chars = Array.from(NAME);
  const filled = Math.round((progress / 100) * BAR_STEPS);
  const bar = "█".repeat(filled) + "░".repeat(BAR_STEPS - filled);

  return (
    <motion.div
      data-testid="intro-preloader"
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden text-ink"
      style={{ background: "var(--bg)" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: wipe ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (wipe) onDone();
      }}
    >
      <div className="pointer-events-none absolute inset-0 p-[5vw]">
        <span className="absolute left-[5vw] top-[5vw] font-mono text-xs uppercase tracking-widest text-ink-dim">
          Portfolio &apos;26
        </span>
        <span className="absolute right-[5vw] top-[5vw] font-mono text-xs uppercase tracking-widest text-ink-dim">
          Ahmedabad, India
        </span>
      </div>

      <FilmRoll running={!wipe} />

      {/* Centered content */}
      <div className="relative flex flex-col items-center text-center">
        {/* Name */}
        <h2 className="font-display font-black leading-[0.9] tracking-[-0.04em] text-[clamp(40px,10vw,160px)]">
          {chars.map((c, i) => (
            <motion.span
              key={`char-${i}`}
              className="inline-block whitespace-pre"
              initial={{ y: "110%", opacity: 0 }}
              animate={nameGo ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.025, ease: EASE }}
            >
              {c}
            </motion.span>
          ))}
        </h2>

        {/* Terminal progress block */}
        <motion.div
          className="mt-10 w-[clamp(260px,38vw,480px)] font-mono text-[clamp(10px,1.1vw,13px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: nameGo ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <p className="mb-2 text-left text-ink-dim">{STATUS_LINES[statusIdx]}</p>
          <div className="flex items-center gap-3">
            <span className="text-accent">[{bar}]</span>
            <span className="text-ink-dim tabular-nums">{progress}%</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
