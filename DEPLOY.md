# Deploy

1. `vercel link` (one-time)
2. Provision Vercel KV from Marketplace → auto-injects `KV_REST_API_*`
3. Set in Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL` (production URL)
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
4. Verify Resend sending domain (or use `onboarding@resend.dev` for testing only).
5. Push to main → Vercel auto-deploys.

## Local development

```bash
cp .env.example .env.local
# fill in values, then:
npm install
npm run dev
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run test` | Vitest unit tests |
| `npm run e2e` | Playwright E2E + axe |
