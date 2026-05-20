"use client";
import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { Preloader } from "./preloader";
import { shouldPlayIntro } from "./should-play-intro";

type IntroState = { ready: boolean; active: boolean };

const IntroContext = createContext<IntroState>({ ready: true, active: false });
export const useIntro = () => useContext(IntroContext);

const STORAGE_KEY = "intro-seen";

function willPlay(): boolean {
  if (typeof window === "undefined") return false;
  const hasSeen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return shouldPlayIntro({ hasSeen, reducedMotion });
}

// One-shot decision: it never changes while mounted, so the store never notifies.
const noopSubscribe = () => () => {};

export function IntroProvider({ children }: { children: ReactNode }) {
  // Hydration-safe client-only decision: the server and the hydration render
  // both see `false` (matching the no-intro default markup); after hydration
  // the client snapshot re-renders with the real value. `active`/`ready` are
  // DERIVED from `plays` on every render — never captured in a useState
  // initializer — so they pick up the post-hydration value correctly.
  const plays = useSyncExternalStore(noopSubscribe, willPlay, () => false);

  const [revealed, setRevealed] = useState(false); // hero handoff (onReveal)
  const [dismissed, setDismissed] = useState(false); // overlay gone (onDone)

  const active = plays && !dismissed;
  const ready = !plays || revealed;

  // The effect owns the scroll lock: lock while active, release on cleanup
  // (which runs when the overlay is dismissed or the provider unmounts).
  useEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      html.style.overflow = "";
    };
  }, [active]);

  const handleReveal = useCallback(() => setRevealed(true), []);
  const handleDone = useCallback(() => {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
  }, []);

  return (
    <IntroContext.Provider value={{ ready, active }}>
      {children}
      {active && <Preloader onReveal={handleReveal} onDone={handleDone} />}
    </IntroContext.Provider>
  );
}
