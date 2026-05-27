"use client";
import { useEffect, useRef, useState } from "react";

type Props = { items: string[]; speed?: number };

export function DraggableStrip({ items, speed = 50 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  });
  const acc = useRef(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let prev = performance.now();

    const tick = (now: number) => {
      const dt = now - prev;
      prev = now;
      const half = el.scrollWidth / 2;

      if (!drag.current.active) {
        let delta = 0;

        if (Math.abs(drag.current.velocity) > 0.02) {
          delta += drag.current.velocity * dt;
          drag.current.velocity *= Math.pow(0.94, dt / 16.67);
        } else {
          drag.current.velocity = 0;
          acc.current += (speed * dt) / 1000;
        }

        const whole = Math.floor(acc.current);
        if (whole !== 0) {
          delta += whole;
          acc.current -= whole;
        }

        if (delta !== 0) el.scrollLeft += delta;

        if (half > 0) {
          if (el.scrollLeft >= half) el.scrollLeft -= half;
          else if (el.scrollLeft < 0) el.scrollLeft += half;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, speed]);

  const list = [...items, ...items];

  return (
    <div
      ref={ref}
      className="cursor-grab touch-pan-y select-none overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      style={{ scrollBehavior: "auto" }}
      onPointerDown={(e) => {
        const el = ref.current;
        if (!el || e.pointerType === "touch") return;
        const now = performance.now();
        drag.current = {
          active: true,
          startX: e.clientX,
          startScroll: el.scrollLeft,
          lastX: e.clientX,
          lastT: now,
          velocity: 0,
        };
        el.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!drag.current.active || !el) return;
        const now = performance.now();
        const dx = e.clientX - drag.current.startX;
        el.scrollLeft = drag.current.startScroll - dx;

        const dt = now - drag.current.lastT;
        if (dt > 0) {
          const instant = -(e.clientX - drag.current.lastX) / dt;
          drag.current.velocity = drag.current.velocity * 0.6 + instant * 0.4;
        }
        drag.current.lastX = e.clientX;
        drag.current.lastT = now;
      }}
      onPointerUp={(e) => {
        const el = ref.current;
        if (!el) return;
        drag.current.active = false;
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      }}
      onPointerCancel={(e) => {
        const el = ref.current;
        if (!el) return;
        drag.current.active = false;
        drag.current.velocity = 0;
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      }}
    >
      <div className="flex w-max gap-12 py-2">
        {list.map((n, i) => (
          <span
            key={`${n}-${i}`}
            aria-hidden={i >= items.length}
            className="font-display text-4xl font-black tracking-tight whitespace-nowrap"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
