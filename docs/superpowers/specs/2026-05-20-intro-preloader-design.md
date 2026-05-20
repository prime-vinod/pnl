# Intro Preloader — Design Spec

**Date:** 2026-05-20
**Status:** Approved (design), pending implementation plan
**Site:** Pinal Patel portfolio (`pl-folio`), Next.js 16 App Router, framer-motion, lenis

## Summary

A full-screen intro preloader that plays once per browser session on the
visitor's first page. Concept: a kinetic name marquee that resolves to
"PINAL PATEL" with an accent underline, then clip-wipes upward to reveal the
page. On the homepage the wipe hands off into the existing hero kinetic
reveal so the two read as one continuous motion. Total ~3.2s. Fully skipped
for repeat sessions and for `prefers-reduced-motion`.

## Decisions (locked)

| Question | Decision |
|---|---|
| Type | Full-screen preloader overlay (independent of hero) |
| Concept | C — Kinetic marquee (name strip behind, sharp name + accent underline front) |
| Duration | Cinematic ~3.2s |
| Exit | Clip-path wipe up (`inset(0 0 0 0)` → `inset(0 0 100% 0)`), site-signature motion |
| Replay | Once per session — `sessionStorage["intro-seen"]` |
| Scope | Any first page in session (not homepage-only) |
| Theme | Follows theme tokens (`bg`/`ink`); accent `#c8ff00` constant |
| Reduced motion | Overlay never renders; content shows instantly |

## Behavior & gating

`shouldPlay` is computed client-side after mount and is true only when ALL hold:

1. Running in the browser (never during SSR).
2. `sessionStorage["intro-seen"]` is unset.
3. `window.matchMedia("(prefers-reduced-motion: reduce)").matches` is false.

On the wipe completing (`onDone`):

- Set `sessionStorage["intro-seen"] = "1"`.
- Unmount the overlay.
- Release the scroll lock.

Because `shouldPlay` is only known after mount, the server and first client
paint must assume "no intro" to avoid hydration mismatch; the overlay is
rendered after mount when `shouldPlay` resolves true. This means the overlay
appears on the very next frame, covering the page before any meaningful
interaction. The page underneath is fully rendered (SSR) so there is no SEO
or LCP penalty to the content itself — the overlay is purely additive and
self-removes.

### Scroll lock

While the intro is active:

- Add `overflow: hidden` to `<html>` (or a lock class) and reset scroll to
  top.
- Overlay is `position: fixed; inset: 0; z-index: 9999` and captures pointer
  events, so the page cannot be interacted with or scrolled.
- Lenis keeps running (it owns its own RAF loop in `LenisProvider`); the
  `overflow: hidden` + covering overlay make scroll inert without needing to
  reach into the Lenis instance. Lock is released on `onDone`.

## Choreography (~3.2s)

| Time | Beat |
|---|---|
| 0.0s | Overlay paints in theme `bg`; mono corner labels fade in (e.g. `Portfolio ’26`, location). |
| 0.0–0.8s | Gate on `document.fonts.ready`, capped at 0.8s, so the resolved name renders in Geist (no FOUT). The gate applies to the **name beat only**; the faint marquee background may start immediately. |
| 0.3s | Faint giant name marquee begins looping (reuses `Marquee` component) — independent of the fonts gate. |
| 0.6–1.4s | "PINAL PATEL" characters rise (kinetic: `y 110% → 0`, opacity, expo ease `[0.22,1,0.36,1]`, stagger 0.04). |
| 1.4–1.9s | Accent underline draws left→right (`scaleX 0 → 1`, `transform-origin: left`). |
| 1.9–2.6s | Hold / settle beat; marquee continues. |
| 2.6–3.2s | Clip-wipe up: overlay `clip-path inset(0 0 0 0)` → `inset(0 0 100% 0)` over ~0.6s expo. On the homepage the hero kinetic begins in the same beat so its characters rise into the opening gap — the handoff. |

Times are nominal; exact keyframes are tuned during implementation but total
stays ~3.2s.

## Architecture

### New — `components/motion/intro/`

**`intro-context.tsx`**
- `IntroProvider` (`"use client"`): on mount computes `shouldPlay`, owns phase
  state `"intro" | "done"`, renders `<Preloader>` while in `"intro"`, manages
  the scroll lock.
- `useIntro()` hook returns `{ ready: boolean }`.
  - `ready === true` immediately when no intro will play (repeat session /
    reduced motion / SSR default).
  - When an intro plays, `ready` flips to `true` at the start of the wipe beat
    so gated components (homepage hero) begin animating into the reveal.

**`preloader.tsx`** (`"use client"`)
- The overlay visual and the framer-motion choreography described above.
- Receives an `onDone` callback (or reads/sets phase via context) and invokes
  it after the wipe transition completes.
- Uses theme tokens for background/ink; accent `#c8ff00`.
- `aria-hidden="true"` on decorative marquee; the resolved name is real text.

### Changed

**`app/layout.tsx`**
- Wrap the app tree in `IntroProvider`.
- Mount the overlay (rendered by the provider) above header/cursor.

**`app/template.tsx`**
- Currently every route plays a clip-path entrance on mount. When the intro
  owns the first reveal (first session load), `template.tsx` must skip its
  entrance to avoid a double animation. It reads intro state: if intro is
  active for this first load, render children without the entrance; on all
  later client navigations, behave exactly as today.

**`components/motion/kinetic-text.tsx`**
- Gate the start of the character animation on `useIntro().ready`.
- Backward compatible: if no `IntroProvider` is present (or `ready` is already
  true), it animates on mount exactly as today.
- This is the mechanism that produces the homepage handoff: the hero's
  `KineticText` waits through the intro and fires as the wipe opens.

## Scope boundary (YAGNI)

- Handoff gating is applied to the **homepage hero only**.
- Below-the-fold `Reveal` sections and non-home pages keep their current
  on-view (`whileInView`, once) behavior. The overlay covers the brief overlap
  for any above-the-fold reveals; we deliberately do **not** refactor every
  animated component to gate on intro readiness.
- No counter, no per-asset progress — the marquee is time-driven, with only
  the fonts gate gating the start.

## Testing

**Unit (vitest)** — `shouldPlay` decision logic, extracted as a pure helper:
- first visit (no flag, motion ok) → true
- flag set → false
- reduced motion → false

**E2E (playwright)** — covering the gating matrix:
- First load: overlay visible, then hero visible after it clears.
- Reload (flag set): no overlay, hero visible immediately.
- `prefers-reduced-motion: reduce`: no overlay, hero visible immediately.
- `@axe-core/playwright` passes both during the intro and after it clears.

## Out of scope

- Replay/skip button (session gating is enough; can revisit).
- Sound.
- Route-specific intro variants.
- Refactoring existing `Reveal`/section animations.
```
