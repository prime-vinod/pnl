"use client";
import { useEffect, useRef } from "react";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // Respect reduced motion — leave the poster frame, don't autoplay.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // iOS (Low Power Mode, backgrounded tab, decode race) rejects the autoplay
    // promise and leaves a frozen frame. Retry on every event that signals the
    // video can play or the page became visible again (incl. bfcache restore).
    const tryPlay = () => {
      v.play().catch(() => {});
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    tryPlay();
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("loadeddata", tryPlay);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", tryPlay);

    return () => {
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", tryPlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/hero-poster.jpg"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
    >
      <source src="/hero-bg.mp4" type="video/mp4" />
    </video>
  );
}
