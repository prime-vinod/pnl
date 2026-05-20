"use client";
import { useEffect, useRef } from "react";

const PHRASES = [
  "FRONTEND DEVELOPER",
  "PINAL PATEL",
  "React / Next.js",
  "TypeScript / Tailwind",
  "PORTFOLIO 2026",
  "Motion Design",
  "Interface Architecture",
  "framer-motion",
  "SELECTED WORKS",
  "Design Systems",
  "Component Libraries",
  "Typography + Layout",
  "OPEN TO WORK",
  "Ahmedabad, India",
  "UI Engineering",
  "Next.js App Router",
  "CASE STUDY",
  "Animation. Experience.",
  "Build. Ship. Polish.",
  "REMOTE WORLDWIDE",
];

const INTERVAL_MS = 90;
const ROW_COUNT = 42;
const SEP = " · ";

function buildRow(): string {
  const shuffled = [...PHRASES].sort(() => Math.random() - 0.5);
  let row = "";
  let i = 0;
  while (row.length < 500) {
    row += shuffled[i % shuffled.length] + SEP;
    i++;
  }
  return row;
}

export function FilmRoll({ running }: { running: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!running) return;

    function shuffle() {
      const el = containerRef.current;
      if (!el) return;
      while (el.firstChild) el.removeChild(el.firstChild);
      for (let r = 0; r < ROW_COUNT; r++) {
        const div = document.createElement("div");
        div.textContent = buildRow();
        div.style.opacity = (0.1 + Math.random() * 0.38).toString();
        div.style.color = Math.random() > 0.88 ? "#c8ff00" : "#4a4a4a";
        div.style.whiteSpace = "nowrap";
        el.appendChild(div);
      }
    }

    shuffle();
    const id = setInterval(shuffle, INTERVAL_MS);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        ref={containerRef}
        className="flex h-full flex-col justify-between font-mono text-[clamp(9px,1.05vw,13px)] leading-none"
      />
    </div>
  );
}
