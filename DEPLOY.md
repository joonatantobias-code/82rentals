# Deploy 82Rentals to Vercel

## TL;DR
1. `git push` to a GitHub repo (or run `vercel` from this directory)
2. Click **Deploy** in the Vercel dashboard
3. Visit your `*.vercel.app` URL, share it
4. Add your custom domain whenever it's ready
5. Iterate by pushing new commits — every push redeploys

## First-time setup

### 1. Push the code to GitHub
```bash
# from the project root
git init
git add .
git commit -m "82rentals: initial public version"
git branch -M main
gh repo create 82rentals-web --public --source=. --push  # if you use the gh CLI
# OR create the repo on github.com, then:
git remote add origin https://github.com/<you>/82rentals-web.git
git push -u origin main
```

### 2. Connect to Vercel
Either via the dashboard OR the CLI.

**Dashboard**
1. Go to https://vercel.com/new
2. Import the GitHub repo you just created
3. Framework preset: Next.js (auto-detected)
4. Root directory: `.`
5. Build & output: defaults
6. Add env vars from `.env.example` (all are optional)
7. Click **Deploy**

**CLI**
```bash
npm i -g vercel
vercel login
vercel       # first run links the project, choose "no" when asked about existing project
vercel --prod # promote the latest deploy to production
```

### 3. Custom domain (later)
1. In Vercel project → **Settings → Domains** → **Add**
2. Enter your domain (e.g. `82rentals.fi`)
3. Vercel shows the DNS records to add at your registrar
4. Once propagated (usually under an hour) Vercel auto-provisions HTTPS

## What works in production today

- Whole marketing site (hero, vesijetti, hinnasto, meistä, ukk, yhteystiedot)
- Booking flow (`/varaa`) with:
  - 4-step UX (quantity, date+time, details+map, review)
  - Helsinki Leaflet map for pickup
  - Full availability mock (resets between deploys)
  - `POST /api/book` endpoint that **logs every booking to Vercel runtime logs**
- Admin endpoints `/api/admin/bookings`, `/api/admin/stats` (gate behind `ADMIN_API_KEY`)

## What you should add before taking real customers

Pick whichever fits today's plan; all are non-blocking for launch:

### Easiest (15 min): email me a copy of every booking
Add Resend (or SendGrid) and a couple of lines to `app/api/book/route.ts`:

```ts
// after createBooking(...)
await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  },
  body: JSON.stringify({
    from: "varaukset@82rentals.fi",
    to: process.env.BOOKINGS_NOTIFY_EMAIL,
    subject: `Uusi varaus ${booking.id}`,
    text: JSON.stringify(booking, null, 2),
  }),
});
```

Set `RESEND_API_KEY` and `BOOKINGS_NOTIFY_EMAIL` in Vercel → Settings → Env vars.

### Better: persistent storage (Postgres / Supabase / Neon)
Replace the in-memory `MOCK_BOOKINGS` array in `lib/crm.ts` with calls to a
database client. Everything else stays the same — the API surface is already
abstracted in that file.

### Best: full CRM integration
Replace the four functions in `lib/crm.ts`
(`getAvailability` / `createBooking` / `listBookings` / `getStats`) with
fetch calls to your CRM. The UI doesn't change.

## Iterating after launch

- Every commit on `main` redeploys automatically.
- Pull request → preview deployment with its own URL (great for sharing
  drafts before going live).
- Roll back instantly from Vercel → **Deployments** → pick a previous
  deployment → **Promote to Production**.

## Common gotchas

- **Leaflet CSS not loading in production**: ensure `import "leaflet/dist/leaflet.css"`
  stays in `components/MapPicker.tsx`. It already does.
- **Bookings reset on every deploy**: this is expected with the mock store.
  Add a database before relying on persistence.
- **Hero video not playing on mobile**: iOS Safari requires `playsInline muted autoplay`,
  all of which are already set.
