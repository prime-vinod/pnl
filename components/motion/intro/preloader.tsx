"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CrtScreen } from "./crt-screen";

const EASE = [0.22, 1, 0.36, 1] as const;
const NAME = "VINOD SUTHAR";
const REVEAL_AT_MS = 4000;
const FONTS_CAP_MS = 200;
const BAR_STEPS = 30;
const COMMAND = "deploy --portfolio --prod";
const TYPE_MS = 34;
const BUILD_HASH = "a1b9f2c";

// The "dependencies" are actually the stack — installing the portfolio installs you.
const DEPS = [
  "typescript",
  "nestjs",
  "mongodb",
  "redis",
  "rabbitmq",
  "rag-llm",
  "ai-agents-mcp",
  "next.js",
  "react",
] as const;

// Braille spinner frames for the currently-installing line.
const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"] as const;

const pad = (n: number) => String(n).padStart(2, "0");

type Props = { onReveal: () => void; onDone: () => void };

export function Preloader({ onReveal, onDone }: Props) {
  const [nameGo, setNameGo] = useState(false);
  const [wipe, setWipe] = useState(false);
  const [progress, setProgress] = useState(0);
  const [spin, setSpin] = useState(0);
  const [typed, setTyped] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [startAt] = useState(() => Date.now());

  useEffect(() => {
    let active = true;
    const cap = new Promise<void>((r) => setTimeout(r, FONTS_CAP_MS));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fonts, cap]).then(() => {
      if (active) setNameGo(true);
    });

    // Spinner frame advances independently of progress for a live terminal feel.
    const spinInterval = setInterval(() => {
      setSpin((s) => (s + 1) % SPINNER.length);
    }, 80);

    // Type the command out, character by character.
    const typeInterval = setInterval(() => {
      setTyped((t) => (t >= COMMAND.length ? t : t + 1));
    }, TYPE_MS);

    // Drives the live HUD clock + uptime readouts.
    const clockInterval = setInterval(() => setNow(Date.now()), 60);

    // Progress bar ticks every ~40ms to reach 100% just before reveal
    const tickMs = (REVEAL_AT_MS * 0.85) / 100;
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100));
    }, tickMs);

    const reveal = setTimeout(() => {
      if (!active) return;
      onReveal();
      setWipe(true);
    }, REVEAL_AT_MS);

    return () => {
      active = false;
      clearInterval(spinInterval);
      clearInterval(typeInterval);
      clearInterval(clockInterval);
      clearInterval(progressInterval);
      clearTimeout(reveal);
    };
  }, [onReveal]);

  const chars = Array.from(NAME);
  const filled = Math.round((progress / 100) * BAR_STEPS);
  const bar = "█".repeat(filled) + "░".repeat(BAR_STEPS - filled);

  // How many deps have finished installing; the next one is mid-install.
  const installed = Math.floor((progress / 100) * DEPS.length);
  const typedDone = typed >= COMMAND.length;
  const deployed = progress >= 100;
  const header = deployed
    ? `> ✓ ${DEPS.length} packages installed`
    : "> installing dependencies…";

  const d = new Date(now);
  const clock = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  const uptime = ((now - startAt) / 1000).toFixed(3);

  return (
    <motion.div
      data-testid="intro-preloader"
      aria-hidden="true"
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden text-ink"
      style={{ background: "var(--bg)" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: wipe ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (wipe) onDone();
      }}
    >
      <CrtScreen running={!wipe} />

      {/* Cinematic letterbox bars */}
      <motion.div
        className="absolute inset-x-0 top-0 z-20 bg-black"
        initial={{ height: 0 }}
        animate={{ height: wipe ? 0 : "8.5vh" }}
        transition={{ duration: 0.6, ease: EASE }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 bg-black"
        initial={{ height: 0 }}
        animate={{ height: wipe ? 0 : "8.5vh" }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      {/* Live system HUD, riding inside the letterbox bars */}
      <motion.div
        className="absolute inset-0 z-30 font-mono text-[10px] uppercase tracking-widest text-ink-dim"
        initial={{ opacity: 0 }}
        animate={{ opacity: wipe ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="absolute left-[5vw] top-[2.6vh] leading-relaxed">
          <div>BUILD {BUILD_HASH}</div>
          <div className="text-accent">NODE v22.13.1</div>
        </div>
        <div className="absolute right-[5vw] top-[2.6vh] text-right leading-relaxed">
          <div>REGION bom1</div>
          <div>Ahmedabad, India</div>
        </div>
        <div className="absolute bottom-[2.6vh] left-[5vw] leading-relaxed tabular-nums">
          <div>UPTIME {uptime}s</div>
          <div>Portfolio &apos;26</div>
        </div>
        <div className="absolute bottom-[2.6vh] right-[5vw] text-right leading-relaxed tabular-nums">
          <div>
            <span className="intro-cursor" style={{ color: "#ff2d55" }}>
              ●
            </span>{" "}
            REC
          </div>
          <div>{clock}</div>
        </div>
      </motion.div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Name */}
        <h2
          className={`font-display font-black leading-[0.9] tracking-[-0.04em] text-[clamp(40px,10vw,160px)] ${
            nameGo ? "intro-glitch" : ""
          }`}
        >
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

        {/* Terminal block */}
        <motion.div
          className="mt-10 w-[clamp(280px,40vw,520px)] font-mono text-[clamp(10px,1.1vw,13px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: nameGo ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {/* Typed command */}
          <p className="mb-3 text-left">
            <span className="text-accent">$</span>{" "}
            <span className="text-ink">{COMMAND.slice(0, typed)}</span>
            {!typedDone && <span className="intro-cursor text-ink">▋</span>}
          </p>

          <p className="mb-2 text-left text-ink-dim">{header}</p>

          {/* Install log — each skill reveals + flips to ✓ as the bar fills. */}
          <div className="mb-3 flex flex-col gap-0.5 text-left">
            {DEPS.map((dep, i) => {
              const done = i < installed;
              const active = i === installed && progress < 100;
              const revealed = done || active;
              return (
                <motion.div
                  key={dep}
                  className="flex items-center justify-between"
                  animate={{ opacity: revealed ? 1 : 0.3 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <span>
                    <span className="inline-block w-3 text-accent">
                      {revealed ? "+" : " "}
                    </span>
                    <span className={revealed ? "text-ink" : "text-ink-dim"}>
                      {dep}
                    </span>
                  </span>
                  <span className="w-4 text-right text-accent">
                    {done ? "✓" : active ? SPINNER[spin] : ""}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-accent">[{bar}]</span>
            <span className="text-ink-dim tabular-nums">{progress}%</span>
          </div>

          {deployed && (
            <motion.p
              className="mt-3 text-left text-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              ✓ deployed · listening on :3000{" "}
              <span className="intro-cursor">▋</span>
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
