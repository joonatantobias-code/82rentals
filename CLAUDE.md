# 82Rentals — public site

## Deploy workflow

This repo deploys to Vercel automatically on every push to `main`. The user prefers continuous, fast iteration: every committed change should ship to production unless it's a draft, work-in-progress, or sensitive (secrets / payment keys / destructive migrations).

Standard flow per change:
1. Edit files.
2. `npm run build` — verify clean.
3. `git add` the touched files.
4. `git commit` with a clear message + Co-Authored-By footer.
5. `git push origin main` so Vercel picks it up.
6. Briefly note the deploy is running.

When the user explicitly asks for a feature branch, PR, or "ei pushaamista", honor that.

## Project context

- Next.js 14.2.13 App Router. Deploys to Vercel as `82rentals` project. Live at https://82rentals.com.
- Sister repo: `/Users/joonatanlindholm/82rentals-crm` (admin CRM, same DB).
- Shared Neon Postgres; bookings written from the public `/api/book` endpoint flow through to the CRM.
- Brand tokens: `brand-primary` (#6EC6FF sky), `brand-secondary` (#0A3D62 deep), `brand-turquoise` (#1DD3B0). Don't introduce new color names — extend in `tailwind.config.ts` if a new shade is needed.
- i18n: `lib/i18n/dictionary.ts` holds both `fi` and `en`. Keep them in lock-step — change one, change the other.
