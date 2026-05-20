# pl-folio — Frontend Designer Portfolio (Design Spec)

**Date:** 2026-05-19
**Status:** Approved for implementation planning
**Owner:** Client (frontend designer)

## Goal

Premium, classy, bold, clean portfolio site for a frontend designer who showcases web/app UI work and interaction/motion design. Must read modern and confident, with smooth purposeful animation throughout. Built to be maintained primarily by the designer-developer.

## Success Criteria

- Looks distinctively designed, not template-y
- Lighthouse perf ≥ 95 on landing and case study routes (mobile + desktop)
- Core Web Vitals: LCP < 2.0s, CLS < 0.05, INP < 200ms
- Case studies can be added by dropping a new `.mdx` file with frontmatter
- Contact form delivers email reliably with spam protection
- A11y passes axe-core on landing and a representative case study
- All motion respects `prefers-reduced-motion`

## Stack

- **Framework:** Next.js 16 (App Router, RSC, Turbopack)
- **Language:** TypeScript (strict)
- **Styles:** Tailwind CSS v4 with CSS custom properties for theme tokens
- **Motion:** Framer Motion (component-level) + Lenis (smooth scroll)
- **Content:** `next-mdx-remote-client` for case studies and writing
- **Theming:** `next-themes` — dark default, light toggle
- **Email:** Resend + `react-email`
- **Storage:** Vercel KV (view counter, contact rate limit)
- **Analytics:** Vercel Analytics + Speed Insights
- **Hosting:** Vercel

## Project Structure

```
pl-folio/
├── app/
│   ├── layout.tsx               # root, fonts, theme provider, smooth scroll, cursor
│   ├── page.tsx                 # landing: hero + featured work
│   ├── work/
│   │   ├── page.tsx             # full index, filterable
│   │   └── [slug]/page.tsx      # case study (renders MDX)
│   ├── writing/
│   │   ├── page.tsx             # blog index
│   │   └── [slug]/page.tsx      # blog post
│   ├── about/page.tsx
│   ├── api/contact/route.ts     # Resend email handler (server action wrapper)
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   └── error.tsx
├── content/
│   ├── work/*.mdx               # case studies
│   └── writing/*.mdx            # blog posts
├── components/
│   ├── motion/                  # Reveal, Magnetic, Marquee, KineticText, Cursor, PageTransition, ScrollProgress
│   ├── ui/                      # Button, Tag, Card, ThemeToggle, Link
│   ├── sections/                # Hero, FeaturedWork, AboutSplit, ContactCTA, Footer
│   └── mdx/                     # Figure, Compare, Callout, Stats
├── lib/
│   ├── mdx.ts                   # frontmatter parsing, content loaders
│   ├── views.ts                 # KV view counter
│   ├── contact.ts               # server action + rate limit + Resend
│   └── seo.ts                   # metadata + JSON-LD helpers
├── styles/
│   └── globals.css              # Tailwind layers, theme tokens, base
├── public/
│   └── work/<slug>/*            # case study images
└── tests/
    ├── unit/                    # Vitest
    └── e2e/                     # Playwright
```

## Visual System — "Brutal Bold"

### Typography

- **Display:** Geist (weight 900), tracking -0.04em, line-height 0.9 — loaded via `next/font/google`
- **Body:** Inter, weights 400 / 500, line-height 1.5
- **Mono:** Geist Mono — labels, metadata, code blocks, frontmatter chips

**Display scale:**
- Hero: `clamp(72px, 14vw, 220px)`
- Section: `clamp(48px, 8vw, 120px)`
- Sub: `clamp(28px, 4vw, 56px)`

### Color Tokens (CSS vars, dark default)

```css
:root[data-theme="dark"] {
  --bg:        #0a0a0a;
  --surface:   #141414;
  --ink:       #f5f5f0;
  --ink-dim:   #888888;
  --line:      #2a2a2a;
  --accent:    #c8ff00;
}
:root[data-theme="light"] {
  --bg:        #f5f5f0;
  --surface:   #ffffff;
  --ink:       #0a0a0a;
  --ink-dim:   #666666;
  --line:      #e0e0e0;
  --accent:    #c8ff00;
}
```

### Shape Language

- Borders: 1.5px sharp; no border-radius on chips/tags
- Radius 8px on cards and buttons only
- Generous whitespace, hairline (1px) dividers
- Type-driven ornaments: `●` status, `→` action, `★` highlight

### Grid

- 12 columns, 24px gutters
- Max content width 1440px
- Edge padding `clamp(24px, 5vw, 80px)`

## Motion System

### Primitives (`components/motion/`)

| Component | Behavior |
|-----------|----------|
| `<Reveal>` | Fade-up + clip-path on scroll-into-view; supports `stagger` for children |
| `<KineticText>` | Splits text by word/char and staggers reveal; used for hero + section heads |
| `<Magnetic>` | Children lerp toward cursor inside a hover bounding box; `strength` prop |
| `<Marquee>` | Infinite horizontal scroller; pause on hover; used for clients/skills strip |
| `<Cursor>` | Custom cursor blob; scales on hover targets; hidden on touch and reduced-motion |
| `<PageTransition>` | Clip-path wipe between routes via App Router template |
| `<ScrollProgress>` | 1px top progress bar driven by scroll Y |

### Global Behavior

- Lenis smooth scroll, duration 1.2, ease-out-expo
- Standard easings:
  - Entries: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-expo)
  - State transitions: `cubic-bezier(0.65, 0, 0.35, 1)` (ease-in-out-cubic)
- `prefers-reduced-motion`:
  - Disables Lenis (native scroll)
  - Disables split-text staggers (text appears whole)
  - Keeps simple opacity fades
  - Hides custom cursor

### Hover & Interaction

- Buttons: magnetic + arrow translates X 4px on hover
- Work cards: image scale 1.02, title slides up revealing meta line
- Links: underline draws left-to-right (200ms)

### Hero

- Kinetic display "FRONTEND DESIGN." reveals char-by-char on mount (60ms stagger)
- Status pill animates in after hero text completes
- Featured work below the fold staggers in on scroll (Y + opacity)

## Pages & Content

### Landing (`/`)

1. **Hero** — kinetic display, status pill (`● Available`), one-line tagline
2. **Featured Work** — 4 projects, 2-col asymmetric grid, large thumbs, year / role / tags
3. **Marquee strip** — past clients and tools
4. **About teaser** — split layout: portrait + 2-paragraph bio + `→ Read more`
5. **Writing teaser** — last 3 posts as a simple list
6. **Contact CTA** — massive type "LET'S BUILD →" + email + socials

### Work Index (`/work`)

- Title: "SELECTED WORK / 2020—2026"
- Filter chips: All / UI / Motion / Systems / Year
- Default list view: row per project — year | title | client | tags | →, with hover image preview
- Toggle to 3-col grid

### Case Study (`/work/[slug]`)

- Hero: project name (display type), meta strip (client / year / role / views), single hero image
- Overview: 4-col meta block — Problem / Role / Timeline / Stack
- Long-form MDX body using custom components:
  - `<Figure src caption fullbleed?>`
  - `<Compare before after>` (slider)
  - `<Callout>` (quote/insight)
  - `<Stats>` (metrics row)
- Next project nav at bottom

### Writing (`/writing` and `/writing/[slug]`)

- Index: list — date | title | read time | tags
- Post: max 680px reading width, drop cap, MDX rendering

### About (`/about`)

- Long-form bio
- "Now" section
- Skills / tools tag cloud
- Selected past clients
- Press / talks list
- Contact block

### Content Frontmatter

**Work `.mdx`:**
```yaml
title: Project Name
client: Acme
year: 2025
role: Lead Designer
tags: [ui, motion]
cover: /work/acme/cover.jpg
featured: true
order: 1
```

**Writing `.mdx`:**
```yaml
title: Post Title
date: 2025-11-12
tags: [process, motion]
description: One-line summary used for index + SEO.
```

## Contact Flow

- Form submits via React Server Action → `lib/contact.ts`
- Validates with Zod
- Honeypot field + IP rate limit (Vercel KV, 5 submissions / hour / IP)
- Sends via Resend using a `react-email` template
- Returns typed `{ ok: true } | { ok: false; error: string }`
- UI shows inline success/error state; no page redirect

## View Counter

- Vercel KV `INCR` on case study and post view (called in a server component once per request)
- Displayed as small mono number in the case study meta strip (e.g., `1,204 views`)
- No PII; aggregate count only

## Performance

- Budget: LCP < 2.0s, CLS < 0.05, INP < 200ms
- Hero LCP element = display text (text-first design avoids hero-image LCP cost)
- Images: `next/image`, AVIF/WebP, blur placeholders, explicit width/height
- Fonts: `next/font` with subset; preload display weight only; `font-display: swap`
- Framer Motion: lazy-load heavy primitives (`<Cursor>`, `<Marquee>`); selective imports to keep bundle small
- Lenis dynamic-imported and initialized after hydration
- Route-level code splitting (App Router default)
- Analytics only in production

## Accessibility

- Semantic HTML; single `h1` per page; logical heading order
- `prefers-reduced-motion` honored across all motion primitives
- Custom cursor hidden on touch devices and when reduced-motion is set
- Focus ring: 2px solid accent, never removed
- Color contrast: ink/bg ≥ 7:1; accent-on-bg verified against WCAG AA for non-text and AAA where used as text
- Filter chips keyboard-navigable; magnetic buttons fall back to plain hover without breaking focus
- Form: visible labels, `aria-describedby` on errors, `aria-live="polite"` for success
- Skip-to-content link

## SEO

- `app/sitemap.ts` and `app/robots.ts`
- Per-route metadata (title, description, OpenGraph)
- Dynamic OG images via `next/og` — display type on dark background with project/post title
- JSON-LD:
  - `Person` on `/about`
  - `CreativeWork` on case studies
  - `BlogPosting` on writing
- RSS feed for `/writing`

## Testing

- **Vitest unit:** `lib/mdx` frontmatter parsing, contact action validation + rate limit branches, view counter increment
- **Playwright E2E (smoke):**
  - Landing renders, hero kinetic text completes
  - Navigate to a case study, MDX components render
  - Submit contact form (Resend mocked) → success state
  - Toggle theme, reload → persisted
- **axe-core** integrated into Playwright for a11y assertions on landing + a case study
- **Lighthouse CI** in PR check; fails if perf < 95

## Error Handling

- `app/error.tsx` and `app/not-found.tsx` use on-brand display typography
- Contact action errors render inline; never throw to error boundary
- Missing MDX slug → 404 (not 500)
- Resend failure → user-facing "Try again or email directly" with mailto link

## Out of Scope (explicit YAGNI)

- CMS / dashboard
- Multi-language / i18n
- Comments on blog
- Newsletter signup
- Auth or admin area
- E-commerce / shop
- Search across content
