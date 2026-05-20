# Intro Preloader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full-screen, once-per-session kinetic-marquee intro preloader that clip-wipes up to reveal the page, handing off into the homepage hero's kinetic title.

**Architecture:** A client `IntroProvider` (in `app/layout.tsx`) decides whether the intro plays (first session visit, motion allowed), locks scroll, and renders a `Preloader` overlay. The provider exposes `useIntro() → { ready, active }`. `KineticText` waits on `ready` so the hero title rises as the overlay wipes; `app/template.tsx` skips its own entrance while the intro is `active` to avoid double-animating.

**Tech Stack:** Next.js 16 App Router, React 19, framer-motion 12, Tailwind v4 theme tokens, Vitest + Testing Library (jsdom), Playwright + axe.

**Spec:** `docs/superpowers/specs/2026-05-20-intro-preloader-design.md`

**Prerequisite:** Commit steps assume an initialized git repo. If `git init` has not been run yet, run it first (the repo's `.gitignore` is already prepared) or defer the commits.

---

## File Structure

| File | Responsibility |
|---|---|
| `components/motion/intro/should-play-intro.ts` (new) | Pure decision helper — testable in isolation |
| `components/motion/intro/preloader.tsx` (new) | Overlay visual + framer-motion choreography |
| `components/motion/intro/intro-provider.tsx` (new) | Context (`useIntro`), play decision, scroll lock, mounts `Preloader` |
| `components/motion/kinetic-text.tsx` (modify) | Gate animation start on `useIntro().ready` (backward compatible) |
| `app/layout.tsx` (modify) | Wrap header/main/footer in `IntroProvider` |
| `app/template.tsx` (modify) | Skip route entrance while intro is `active` |
| `tests/unit/should-play-intro.test.ts` (new) | Unit: decision helper |
| `tests/unit/preloader.test.tsx` (new) | Unit: overlay renders, accessible, named |
| `tests/unit/intro-provider.test.tsx` (new) | Unit: gating + context values |
| `tests/e2e/intro.spec.ts` (new) | E2E: play / skip / reduced-motion / axe |
| `tests/e2e/landing.spec.ts` etc. (modify) | Seed `intro-seen` so non-intro specs stay fast & stable |

---

## Task 1: `shouldPlayIntro` decision helper

**Files:**
- Create: `components/motion/intro/should-play-intro.ts`
- Test: `tests/unit/should-play-intro.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/unit/should-play-intro.test.ts
import { describe, it, expect } from "vitest";
import { shouldPlayIntro } from "@/components/motion/intro/should-play-intro";

describe("shouldPlayIntro", () => {
  it("plays on a first visit when motion is allowed", () => {
    expect(shouldPlayIntro({ hasSeen: false, reducedMotion: false })).toBe(true);
  });
  it("does not play once seen this session", () => {
    expect(shouldPlayIntro({ hasSeen: true, reducedMotion: false })).toBe(false);
  });
  it("does not play under reduced motion", () => {
    expect(shouldPlayIntro({ hasSeen: false, reducedMotion: true })).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- should-play-intro`
Expected: FAIL — cannot resolve `@/components/motion/intro/should-play-intro`.

- [ ] **Step 3: Write minimal implementation**

```ts
// components/motion/intro/should-play-intro.ts
export type IntroConditions = { hasSeen: boolean; reducedMotion: boolean };

/** Pure decision: the intro plays only on a first session visit with motion allowed. */
export function shouldPlayIntro({ hasSeen, reducedMotion }: IntroConditions): boolean {
  return !hasSeen && !reducedMotion;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- should-play-intro`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add components/motion/intro/should-play-intro.ts tests/unit/should-play-intro.test.ts
git commit -m "feat(intro): add shouldPlayIntro decision helper"
```

---

## Task 2: Preloader overlay component

**Files:**
- Create: `components/motion/intro/preloader.tsx`
- Test: `tests/unit/preloader.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/preloader.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Preloader } from "@/components/motion/intro/preloader";

describe("Preloader", () => {
  it("renders an accessible, decorative overlay containing the name", () => {
    render(<Preloader onReveal={vi.fn()} onDone={vi.fn()} />);
    const overlay = screen.getByTestId("intro-preloader");
    expect(overlay).toHaveAttribute("aria-hidden", "true");
    expect(overlay.textContent).toContain("PINAL PATEL");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- preloader`
Expected: FAIL — cannot resolve `@/components/motion/intro/preloader`.

- [ ] **Step 3: Write minimal implementation**

```tsx
// components/motion/intro/preloader.tsx
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Marquee } from "@/components/motion/marquee";

const EASE = [0.22, 1, 0.36, 1] as const;
const NAME = "PINAL PATEL";
const REVEAL_AT_MS = 2600; // cover beats finish; wipe + hero handoff begins
const FONTS_CAP_MS = 800; // max wait for Geist before showing the name

type Props = { onReveal: () => void; onDone: () => void };

export function Preloader({ onReveal, onDone }: Props) {
  const [nameGo, setNameGo] = useState(false);
  const [wipe, setWipe] = useState(false);

  useEffect(() => {
    let active = true;
    const cap = new Promise<void>((r) => setTimeout(r, FONTS_CAP_MS));
    const fonts =
      typeof document !== "undefined" && document.fonts ? document.fonts.ready : Promise.resolve();
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
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      animate={{ clipPath: wipe ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)" }}
      transition={{ duration: 0.6, ease: EASE }}
      onAnimationComplete={() => {
        if (wipe) onDone();
      }}
    >
      <div className="pointer-events-none absolute inset-0 p-[5vw]">
        <span className="absolute left-[5vw] top-[5vw] font-mono text-xs uppercase tracking-widest text-ink-dim">
          Portfolio ’26
        </span>
        <span className="absolute right-[5vw] top-[5vw] font-mono text-xs uppercase tracking-widest text-ink-dim">
          Ahmedabad, India
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.08]">
        <Marquee duration={18}>
          <span className="font-display font-black leading-none tracking-[-0.04em] text-[18vw]">
            PINAL PATEL —
          </span>
        </Marquee>
      </div>

      <h2 className="relative font-display font-black leading-[0.9] tracking-[-0.04em] text-[clamp(40px,10vw,160px)]">
        {chars.map((c, i) => (
          <motion.span
            key={i}
            className="inline-block whitespace-pre"
            initial={{ y: "110%", opacity: 0 }}
            animate={nameGo ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{ duration: 0.6, delay: i * 0.04, ease: EASE }}
          >
            {c}
          </motion.span>
        ))}
      </h2>

      <motion.div
        className="relative mt-6 h-1 w-[clamp(120px,18vw,260px)] origin-left bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: nameGo ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
      />
    </motion.div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- preloader`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add components/motion/intro/preloader.tsx tests/unit/preloader.test.tsx
git commit -m "feat(intro): add Preloader overlay with marquee + clip-wipe"
```

---

## Task 3: IntroProvider + useIntro context

**Files:**
- Create: `components/motion/intro/intro-provider.tsx`
- Test: `tests/unit/intro-provider.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// tests/unit/intro-provider.test.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { IntroProvider, useIntro } from "@/components/motion/intro/intro-provider";

function Probe() {
  const { ready, active } = useIntro();
  return <div data-testid="probe">{`${ready}-${active}`}</div>;
}

describe("IntroProvider", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    document.documentElement.style.overflow = "";
  });

  it("skips the intro when already seen this session", () => {
    window.sessionStorage.setItem("intro-seen", "1");
    render(
      <IntroProvider>
        <Probe />
      </IntroProvider>,
    );
    expect(screen.getByTestId("probe").textContent).toBe("true-false");
    expect(screen.queryByTestId("intro-preloader")).toBeNull();
  });

  it("plays the intro on a first visit and locks scroll", () => {
    render(
      <IntroProvider>
        <Probe />
      </IntroProvider>,
    );
    expect(screen.getByTestId("intro-preloader")).toBeInTheDocument();
    expect(screen.getByTestId("probe").textContent).toBe("false-true");
    expect(document.documentElement.style.overflow).toBe("hidden");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- intro-provider`
Expected: FAIL — cannot resolve `@/components/motion/intro/intro-provider`.

- [ ] **Step 3: Write minimal implementation**

```tsx
// components/motion/intro/intro-provider.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
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

export function IntroProvider({ children }: { children: ReactNode }) {
  // Decided synchronously on the client so a gated hero never animates before
  // the overlay claims the first reveal. Server returns the no-intro default,
  // and the overlay node only mounts in an effect, so SSR markup is identical.
  const [ready, setReady] = useState(() => !willPlay());
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!willPlay()) {
      setReady(true);
      return;
    }
    setActive(true);
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);
  }, []);

  const handleReveal = () => setReady(true);
  const handleDone = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    document.documentElement.style.overflow = "";
    setActive(false);
  };

  return (
    <IntroContext.Provider value={{ ready, active }}>
      {children}
      {active && <Preloader onReveal={handleReveal} onDone={handleDone} />}
    </IntroContext.Provider>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- intro-provider`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components/motion/intro/intro-provider.tsx tests/unit/intro-provider.test.tsx
git commit -m "feat(intro): add IntroProvider context, gating, and scroll lock"
```

---

## Task 4: Gate KineticText on intro readiness

**Files:**
- Modify: `components/motion/kinetic-text.tsx`
- Test: `tests/unit/kinetic-text.test.tsx` (extend)

- [ ] **Step 1: Add a failing test for the gated case**

Append this test inside the existing `describe("KineticText", ...)` block in `tests/unit/kinetic-text.test.tsx`:

```tsx
import { IntroProvider } from "@/components/motion/intro/intro-provider";

it("keeps the full text accessible while the intro gates animation", () => {
  // First-visit: provider reports ready=false, but the sr-only copy must remain.
  window.sessionStorage.clear();
  render(
    <IntroProvider>
      <KineticText text="FRONTEND DEVELOPER." />
    </IntroProvider>,
  );
  expect(screen.getAllByText("FRONTEND DEVELOPER.").length).toBeGreaterThan(0);
});
```

(Add `import { IntroProvider } ...` to the top of the file alongside the existing imports.)

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- kinetic-text`
Expected: FAIL — `useIntro` is not yet consumed; component does not compile against provider OR test asserts text that is still gated. (If it happens to pass because the helper isn't wired, proceed to wire it in Step 3 and re-run.)

- [ ] **Step 3: Wire the gate**

Edit `components/motion/kinetic-text.tsx`. Add the import and consume `ready`, then make the per-character `animate` conditional. Full file:

```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { JSX } from "react";
import { useIntro } from "@/components/motion/intro/intro-provider";

type Props = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  stagger?: number;
  className?: string;
};

export function KineticText({ text, as = "h1", stagger = 0.04, className }: Props) {
  const reduced = useReducedMotion();
  const { ready } = useIntro();
  const Tag = motion[as as "h1"];
  if (reduced) return <Tag className={className}>{text}</Tag>;
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <Tag className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => {
          const node = (
            <span key={wi} className="inline-block whitespace-nowrap">
              {Array.from(word).map((c) => {
                const i = charIndex++;
                return (
                  <motion.span
                    key={i}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={ready ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
                    transition={{ duration: 0.6, delay: i * stagger, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {c}
                  </motion.span>
                );
              })}
            </span>
          );
          charIndex++; // account for the space separating words
          return wi < words.length - 1 ? [node, " "] : node;
        })}
      </span>
    </Tag>
  );
}
```

Default context `ready: true` means components used without a provider animate on mount exactly as before.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test -- kinetic-text`
Expected: PASS (both the original and the new test).

- [ ] **Step 5: Commit**

```bash
git add components/motion/kinetic-text.tsx tests/unit/kinetic-text.test.tsx
git commit -m "feat(intro): gate KineticText on intro readiness for hero handoff"
```

---

## Task 5: Mount IntroProvider in the root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add the import**

In `app/layout.tsx`, add alongside the other component imports:

```tsx
import { IntroProvider } from "@/components/motion/intro/intro-provider";
```

- [ ] **Step 2: Wrap header/main/footer**

Replace the body's provider subtree so `IntroProvider` wraps the visible chrome and page content (it renders the overlay as its last child). The `<body>` content becomes:

```tsx
<ThemeProvider>
  <LenisProvider />
  <Cursor />
  <ScrollProgress />
  <IntroProvider>
    <SiteHeader />
    <main id="main">{children}</main>
    <SiteFooter />
  </IntroProvider>
</ThemeProvider>
```

- [ ] **Step 3: Verify build + types**

Run: `npm run typecheck`
Expected: PASS, no errors.

Run: `npm run build`
Expected: Build completes successfully.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(intro): mount IntroProvider in root layout"
```

---

## Task 6: Skip the route entrance while the intro is active

**Files:**
- Modify: `app/template.tsx`

- [ ] **Step 1: Update the template**

Replace `app/template.tsx` with:

```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useIntro } from "@/components/motion/intro/intro-provider";

export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const { active } = useIntro();
  // While the intro overlay owns the first reveal, skip the per-route entrance
  // so the page is not animated twice. Later client navigations animate as usual.
  if (reduced || active) return <div>{children}</div>;
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify build + types**

Run: `npm run typecheck`
Expected: PASS.

Run: `npm run build`
Expected: Build completes successfully.

- [ ] **Step 3: Commit**

```bash
git add app/template.tsx
git commit -m "feat(intro): skip route entrance while intro is active"
```

---

## Task 7: E2E coverage + keep existing specs stable

**Files:**
- Create: `tests/e2e/intro.spec.ts`
- Modify: `tests/e2e/landing.spec.ts`, `tests/e2e/responsive.spec.ts`, `tests/e2e/case-study.spec.ts`, `tests/e2e/contact.spec.ts`

- [ ] **Step 1: Seed `intro-seen` in non-intro specs**

In each of `landing.spec.ts`, `responsive.spec.ts`, `case-study.spec.ts`, and `contact.spec.ts`, add this `beforeEach` immediately after the existing `import { test, expect } ...` line so the overlay never blocks those assertions:

```ts
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.sessionStorage.setItem("intro-seen", "1"));
});
```

(`addInitScript` runs before the app boots, so the provider sees the flag and skips the intro. `a11y.spec.ts` already emulates reduced motion, which skips the intro — leave it unchanged.)

- [ ] **Step 2: Write the intro E2E spec**

```ts
// tests/e2e/intro.spec.ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("first visit shows the intro, then reveals the hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("intro-preloader")).toBeVisible();
  await expect(page.getByRole("heading", { name: /FRONTEND DEVELOPER/i })).toBeVisible();
  await expect(page.getByTestId("intro-preloader")).toBeHidden({ timeout: 6000 });
});

test("intro has no axe violations while visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("intro-preloader")).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("intro is skipped on a same-session reload", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("intro-preloader")).toBeHidden({ timeout: 6000 });
  await page.reload();
  await expect(page.getByTestId("intro-preloader")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /FRONTEND DEVELOPER/i })).toBeVisible();
});

test("intro is skipped under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByTestId("intro-preloader")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /FRONTEND DEVELOPER/i })).toBeVisible();
});
```

- [ ] **Step 3: Run the full unit suite**

Run: `npm run test`
Expected: PASS — all unit tests including the three new files.

- [ ] **Step 4: Run lint + typecheck**

Run: `npm run lint && npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Run the E2E suite**

Run: `npm run e2e`
Expected: PASS — `intro.spec.ts` (4 tests) plus the existing specs (now seeded). The Playwright config builds and starts the app automatically.

- [ ] **Step 6: Commit**

```bash
git add tests/e2e/intro.spec.ts tests/e2e/landing.spec.ts tests/e2e/responsive.spec.ts tests/e2e/case-study.spec.ts tests/e2e/contact.spec.ts
git commit -m "test(intro): e2e for play/skip/reduced-motion/axe; seed flag in other specs"
```

---

## Manual verification (after Task 7)

- [ ] `npm run dev`, open a fresh tab at `/` → marquee + name rise, underline draws, overlay wipes up into the hero title.
- [ ] Reload the tab → no overlay (session flag set).
- [ ] Open a new browser/incognito session → intro plays again.
- [ ] Toggle OS "Reduce motion" → no overlay; hero shows instantly.
- [ ] Toggle light theme, fresh session → overlay background matches the light theme (no dark→light snap at the wipe).
- [ ] Land directly on `/work` in a fresh session → intro plays there too (scope = any first page); navigate around afterward → no overlay.

## Self-review notes (author)

- **Spec coverage:** gating (Task 1/3), choreography + theme-follow + fonts gate (Task 2), handoff (Task 4), scroll lock (Task 3), layout mount (Task 5), template double-animate fix (Task 6), unit + e2e incl. axe-during-intro (Tasks 1–3, 7). All spec sections map to a task.
- **Scope boundary honored:** only `KineticText` is gated; `Reveal` and non-home sections are untouched.
- **Type consistency:** `useIntro()` returns `{ ready, active }`; `Preloader` props are `{ onReveal, onDone }`; storage key `"intro-seen"` is identical across provider and e2e seeds.
