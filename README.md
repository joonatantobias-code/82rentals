# 82Rentals — Helsinki Jetski Rental

Production-ready marketing site for **82Rentals**, a Sea-Doo Spark Trixx jetski rental in Helsinki with city-wide delivery.

## Stack
- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react icons

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Booking API

`POST /api/book` accepts a JSON payload:

```json
{
  "date": "2026-06-15",
  "time": "13:00",
  "duration": "2h",
  "quantity": 1,
  "name": "Matti Meikäläinen",
  "phone": "+358...",
  "email": "you@example.com",
  "totalEUR": 269
}
```

The endpoint validates and logs the booking. To wire it into a CRM, add the
forwarding `fetch` call inside `app/api/book/route.ts` and set the env vars
`CRM_WEBHOOK_URL` and `CRM_API_KEY`.

## Project structure

```
app/
  layout.tsx        # root layout, fonts, metadata
  page.tsx          # composes the landing page
  globals.css       # tailwind + design tokens
  api/book/route.ts # booking endpoint placeholder
components/         # all UI sections
lib/pricing.ts      # pricing table + calculator
public/logo.jpg     # 82Rentals logo
```

## Replacing placeholders
- Hero video & all imagery use Unsplash/Pexels — swap with real footage in
  `components/Hero.tsx`, `components/Product.tsx`, `components/Lifestyle.tsx`,
  and `components/Delivery.tsx`.
- Phone/email/Instagram in `components/Footer.tsx`.
- Prices in `lib/pricing.ts`.
