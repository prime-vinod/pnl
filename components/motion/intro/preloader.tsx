"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FilmRoll } from "./film-roll";

const EASE = [0.22, 1, 0.36, 1] as const;
const NAME = "VINOD SUTHAR";
const REVEAL_AT_MS = 1000;
const FONTS_CAP_MS = 200;

type Props = { onReveal: () => void; onDone: () => void };

// Intentionally has no prefers-reduced-motion guard: IntroProvider only mounts
// this when shouldPlayIntro() is true (motion allowed). A null-return here would
// skip onDone() and leave the scroll lock stuck.
export function Preloader({ onReveal, onDone }: Props) {
  const [nameGo, setNameGo] = useState(false);
  const [wipe, setWipe] = useState(false);

  useEffect(() => {
    let active = true;
    const cap = new Promise<void>((r) => setTimeout(r, FONTS_CAP_MS));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fonts, cap]).then(() => {
      if (active) setNameGo(true);
    });
    const reveal = setTimeout(() => {
      if (!active) return;
      onReveal();
      setWipe(true);
    }, REVEAL_AT_MS);
    return () => {
      active = false;
      clearTimeout(reveal);
    };
  }, [onReveal]);

  const chars = Array.from(NAME);

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

      <h2 className="relative font-display font-black leading-[0.9] tracking-[-0.04em] text-[clamp(40px,10vw,160px)]">
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

      <motion.div
        className="relative mt-6 h-1 w-[clamp(120px,18vw,260px)] origin-left bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: nameGo ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
      />
    </motion.div>
  );
}
