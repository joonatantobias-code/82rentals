import type { Metadata } from "next";
import Image from "next/image";
import QRCode from "qrcode";
import { Check, MapPin, QrCode, RotateCw, Star } from "lucide-react";

/**
 * /dev/flyer — kaksipuoleinen A6-klubiflyer (105 × 148 mm).
 *
 * Layout philosophy: each side is split into three explicit
 * vertical clusters (top, middle, bottom) joined by
 * `justify-between` so the brand mark stays anchored at the top,
 * the footer chips stay anchored at the bottom, and the middle
 * group inherits the leftover vertical room. That keeps the
 * print breathing instead of stacking blocks at fixed offsets.
 */
export const metadata: Metadata = {
  title: "Flyer · 82Rentals",
  robots: { index: false, follow: false },
};

// QR vie suoraan flyer-alennussivulle, joka aktivoi alennuksen
// automaattisesti. Asiakas ei syötä koodia mihinkään.
const QR_TARGET = "https://82rentals.com/alennus";

type Tier = {
  hours: string;
  name: string;
  strike: string;
  price: string;
  saving: string;
  badge?: { label: string; tone: "popular" | "value" };
  highlight?: boolean;
};

const TIERS: Tier[] = [
  {
    hours: "1 h",
    name: "Pyrähdys",
    strike: "169 €",
    price: "119",
    saving: "−50 €",
  },
  {
    hours: "2 h",
    name: "Kesän klassikko",
    strike: "259 €",
    price: "199",
    saving: "−60 €",
    badge: { label: "★ Suosituin", tone: "popular" },
    highlight: true,
  },
  {
    hours: "3 h",
    name: "Saaristoseikkailu",
    strike: "319 €",
    price: "249",
    saving: "−70 €",
    badge: { label: "Paras arvo", tone: "value" },
  },
];

const INCLUSIONS = [
  "Polttoaine",
  "Pelastusliivit",
  "Perehdytys",
  "Turvavarusteet",
];

export default async function FlyerPage() {
  const qrSvg = await QRCode.toString(QR_TARGET, {
    type: "svg",
    errorCorrectionLevel: "H",
    color: { dark: "#062a45", light: "#ffffff" },
    margin: 1,
    width: 280,
  });

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-300 flex flex-col items-center gap-6 py-10 px-4 print:py-0 print:bg-white">
      <div className="text-xs uppercase tracking-[0.22em] text-neutral-500 print:hidden">
        82Rentals · A6 club flyer · 105 × 148 mm · Etu + taka
      </div>

      <div className="flex gap-6 flex-wrap justify-center print:gap-0">
        <div className="flyer-page">
          <FrontSide />
        </div>
        <div className="flyer-page">
          <BackSide qrSvg={qrSvg} />
        </div>
      </div>

      <div className="text-xs text-neutral-500 print:hidden text-center max-w-md leading-relaxed">
        Print → "Save as PDF" · paperikoko <strong>A4</strong> · reunukset "None".
        Etu + taka tulostuu kaksisivuisena täydellä A4-koolla.
      </div>

      <style>{`
        .flyer-a6 {
          position: relative;
          width: 397px;
          height: 559px;
          background: #062a45;
          color: white;
          font-family: var(--font-inter, system-ui), sans-serif;
          overflow: hidden;
          box-shadow: 0 20px 60px -16px rgba(0,0,0,0.6);
        }
        .flyer-page { display: contents; }
        @media print {
          @page { size: A4 portrait; margin: 0; }
          html, body { background: white !important; margin: 0; padding: 0; }
          .flyer-page {
            display: block;
            width: 210mm;
            height: 297mm;
            position: relative;
            overflow: hidden;
            page-break-after: always;
            break-after: page;
          }
          .flyer-page .flyer-a6 {
            box-shadow: none;
            transform: scale(2);
            transform-origin: top left;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------ *
 * FRONT
 * ------------------------------------------------------------ */
function FrontSide() {
  return (
    <article className="flyer-a6">
      {/* Hero photo strip (top ~34%) */}
      <div className="absolute inset-x-0 top-0 h-[34%] z-0">
        <Image
          src="/skuutit/spark-sunset-girls.png"
          alt=""
          fill
          sizes="400px"
          className="object-cover object-[48%_42%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#062a45]/30 via-[#062a45]/15 to-[#062a45]" />
      </div>

      {/* Outline "82" watermark */}
      <div className="absolute -bottom-6 -right-3 z-0 pointer-events-none select-none">
        <span
          className="font-display font-extrabold text-[9rem] leading-none tracking-tighter text-transparent"
          style={{ WebkitTextStroke: "1.5px rgba(110,198,255,0.16)" }}
        >
          82
        </span>
      </div>

      {/* Brand geometric overlays (outline, blurred) */}
      <FlyerShapes
        variant="a"
        className="absolute -top-12 -left-12 w-[280px] h-[280px] z-0 pointer-events-none"
      />
      <FlyerShapes
        variant="b"
        className="absolute -bottom-10 -right-14 w-[260px] h-[260px] z-0 pointer-events-none"
      />

      {/* Deterministic stack: header → photo clear spacer → middle
          (flex-1, grows to fill the remaining space) → bottom.
          No justify-between, no internal pt-[108] hack — the
          spacer reserves exactly the room the photo occupies, and
          flex-1 on the middle absorbs any leftover slack so the
          content always sits flush under the photo without a big
          empty navy band in the middle. */}
      <div className="relative z-10 h-full flex flex-col px-6 pt-5 pb-5">
        {/* TOP — header chips (logo + Alennus pill) */}
        <div className="flex items-center justify-between">
          <Image
            src="/logo-transparent.png"
            alt="82Rentals"
            width={92}
            height={30}
            className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            unoptimized
          />
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FF7A00] text-white px-2.5 py-1">
            <QrCode size={11} strokeWidth={2.8} />
            <span className="font-display font-bold uppercase tracking-[0.2em] text-[8.5px] leading-none">
              Alennus
            </span>
          </div>
        </div>

        {/* Photo clear spacer — height tuned so the location pill
            below lands just under the photo gradient. */}
        <div className="h-[132px] shrink-0" />

        {/* MIDDLE — flex-1 absorbs all leftover vertical space */}
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          <div>
            <div className="flex">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 px-2 py-1 text-white text-[8.5px]">
                <MapPin size={9} className="text-[#6EC6FF]" />
                <span className="font-semibold">Vesijettivuokraus Helsinki</span>
                <span className="opacity-50">·</span>
                <Star
                  size={9}
                  fill="#6EC6FF"
                  strokeWidth={0}
                  className="text-[#6EC6FF]"
                />
                <span className="font-semibold">4,9 / 5</span>
              </span>
            </div>

            <h1 className="font-display font-black text-white text-[1.55rem] leading-[1.04] tracking-tight mt-2">
              Koe kesän
              <br />
              <span className="relative inline-block">
                paras päivä
                <SprayUnderline />
              </span>{" "}
              vesillä.
            </h1>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-3 gap-1.5 pt-3">
            {TIERS.map((t) => (
              <PriceCard key={t.hours} tier={t} />
            ))}
          </div>

          {/* Inclusion strip */}
          <div className="rounded-md bg-[#6EC6FF]/10 border border-[#6EC6FF]/35 px-3 py-2">
            <p className="text-[7px] uppercase tracking-[0.22em] text-[#6EC6FF] font-bold mb-1.5">
              Kaikkiin paketteihin sisältyy
            </p>
            <div className="flex flex-wrap gap-x-2.5 gap-y-1">
              {INCLUSIONS.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1 text-white text-[8.5px] font-semibold leading-tight"
                >
                  <span className="grid place-items-center h-3 w-3 rounded-full bg-[#6EC6FF]/25 text-[#6EC6FF] shrink-0">
                    <Check size={8} strokeWidth={3.5} />
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM — chip row, naturally anchored after the flex-1
            middle absorbs the remaining space. */}
        <div className="flex items-center justify-between gap-2 flex-nowrap pt-3">
          <div className="flex items-center gap-1.5 flex-nowrap">
            <AgeBadge />
            <span className="inline-flex items-center gap-1 rounded-full bg-white/8 border border-white/20 text-white px-2 py-1 whitespace-nowrap">
              <Check size={9} strokeWidth={3} className="text-[#6EC6FF]" />
              <span className="text-[8px] uppercase tracking-[0.22em] font-bold leading-none">
                Ei ajokorttia
              </span>
            </span>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-[#6EC6FF] text-[#062a45] px-2 py-1 whitespace-nowrap">
            <RotateCw size={10} strokeWidth={3} />
            <span className="text-[8px] uppercase tracking-[0.18em] font-bold leading-none">
              Käännä
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------ *
 * BACK
 * ------------------------------------------------------------ */
function BackSide({ qrSvg }: { qrSvg: string }) {
  return (
    <article className="flyer-a6">
      <div className="absolute inset-0 z-0 bg-[#062a45]" />

      <div className="absolute -top-6 -left-4 z-0 pointer-events-none select-none">
        <span
          className="font-display font-extrabold text-[9rem] leading-none tracking-tighter text-transparent"
          style={{ WebkitTextStroke: "1.5px rgba(110,198,255,0.16)" }}
        >
          82
        </span>
      </div>

      <FlyerShapes
        variant="a"
        className="absolute -bottom-14 -left-10 w-[280px] h-[280px] z-0 pointer-events-none"
      />

      {/* Deterministic stack: top header → flex-1 middle absorbs
          remaining space → bottom anchored. No justify-between,
          so the QR + steps + address sit cleanly under the title
          without a stray empty band above them. */}
      <div className="relative z-10 h-full flex flex-col items-center px-6 pt-4 pb-5 text-center">
        {/* TOP — brand mark + eyebrow + headline */}
        <div className="flex flex-col items-center">
          <Image
            src="/logo-transparent.png"
            alt="82Rentals"
            width={102}
            height={34}
            className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            unoptimized
          />
          <p className="mt-2 text-[7.5px] font-bold uppercase tracking-[0.32em] text-[#6EC6FF]">
            Skannaa & varaa
          </p>
          <h2 className="font-display font-black text-white text-[1.25rem] leading-[1.05] tracking-tight mt-0.5">
            Vesille minuuteissa.
          </h2>
        </div>

        {/* MIDDLE — flex-1 absorbs the slack; pt-4 keeps the QR
            from sitting on the headline above. */}
        <div className="w-full flex-1 flex flex-col items-center gap-3 min-h-0 pt-4">
          <div className="rounded-lg bg-white p-2">
            <div
              className="h-[148px] w-[148px] [&_svg]:block [&_svg]:w-full [&_svg]:h-full"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
          </div>

          {/* 3 step cards (horizontal) */}
          <div className="grid grid-cols-3 gap-1.5 w-full pt-1">
            {[
              "Skannaa QR-koodi",
              "Valitse sopiva aika ja kesto",
              "Nauti kauniista kesäpäivästä vesillä!",
            ].map((step, i) => (
              <div
                key={step}
                className="relative rounded-lg bg-white/8 border border-[#6EC6FF]/40 px-1.5 pt-3.5 pb-2 text-center"
              >
                <span className="absolute left-1/2 -translate-x-1/2 -top-2 grid place-items-center h-4 w-4 rounded-full bg-[#6EC6FF] text-[#062a45] font-display font-black text-[9px] leading-none">
                  {i + 1}
                </span>
                <p className="text-white text-[7.5px] leading-snug">{step}</p>
              </div>
            ))}
          </div>

          {/* Address card */}
          <div className="rounded-lg bg-[#6EC6FF]/12 border border-[#6EC6FF]/45 px-3 py-2 w-full flex items-start gap-2 text-left">
            <span className="grid place-items-center h-6 w-6 rounded-full bg-[#6EC6FF] text-[#062a45] shrink-0">
              <MapPin size={12} strokeWidth={2.6} />
            </span>
            <div className="min-w-0">
              <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-[#6EC6FF] leading-none">
                Lähtöpaikka
              </p>
              <p className="font-display font-bold text-white text-[10px] leading-tight mt-1">
                Tervasaaren satama
              </p>
              <p className="text-white/75 text-[8px] leading-tight mt-0.5">
                Tervasaarenkannas 1, 00170 Helsinki
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM — rating, age + licence chips, URL. pt-5 + mt-3
            steps between rows so the footer doesn't pinch the
            address card above and the rows inside aren't stacked
            on top of each other. */}
        <div className="w-full pt-5">
          <div className="flex items-center justify-center gap-1.5">
            <div className="flex gap-0.5 text-[#FFC857]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={10} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-white">
              4,9 / 5 · Google
            </span>
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5 flex-nowrap">
            <AgeBadge />
            <span className="inline-flex items-center gap-1 rounded-full bg-white/8 border border-white/20 text-white px-2 py-1 whitespace-nowrap">
              <Check size={9} strokeWidth={3} className="text-[#6EC6FF]" />
              <span className="text-[7.5px] uppercase tracking-[0.22em] font-bold leading-none">
                Ei ajokorttia
              </span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Standalone "16+" age-rating badge.
 */
function AgeBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full border border-[#6EC6FF]/70 bg-[#6EC6FF]/15 px-2 py-1 text-[#6EC6FF]">
      <span className="font-display font-black text-[12px] leading-none tracking-tight tabular-nums">
        16
      </span>
      <span className="font-display font-black text-[10px] leading-none -translate-y-[1px]">
        +
      </span>
      <span className="ml-1 text-[7.5px] uppercase tracking-[0.22em] font-bold leading-none">
        Ikäraja
      </span>
    </span>
  );
}

/**
 * Flyer-only ambient decoration. Outline-only primitives
 * (triangles, plusses, diamonds, dot clusters) at 0.55 opacity
 * plus a small CSS blur so the shapes recede into texture.
 */
function FlyerShapes({
  className = "",
  variant = "a",
}: {
  className?: string;
  variant?: "a" | "b";
}) {
  const mirror = variant === "b";
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      style={{ filter: "blur(0.6px)", opacity: 0.55 }}
      aria-hidden
    >
      <g
        transform={mirror ? "translate(600 0) scale(-1 1)" : undefined}
        stroke="#6EC6FF"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M180,80 L260,220 L100,220 Z" strokeWidth="1.6" opacity="0.55" />
        <path d="M340,330 L400,420 L280,420 Z" strokeWidth="1.4" opacity="0.5" />
        <path d="M520,260 L560,260 L540,300 Z" strokeWidth="1.4" opacity="0.45" />
        <g strokeWidth="2.2" opacity="0.6">
          <path d="M70,360 L70,400 M50,380 L90,380" />
          <path d="M460,160 L460,200 M440,180 L480,180" />
          <path d="M520,460 L520,490 M505,475 L535,475" />
          <path d="M250,500 L250,530 M235,515 L265,515" />
        </g>
      </g>
      <g
        transform={mirror ? "translate(600 0) scale(-1 1)" : undefined}
        stroke="#1DD3B0"
        strokeWidth="1.6"
        fill="none"
        opacity="0.55"
      >
        <path d="M420,90 L450,120 L420,150 L390,120 Z" />
        <path d="M150,470 L172,492 L150,514 L128,492 Z" />
      </g>
      <g
        transform={mirror ? "translate(600 0) scale(-1 1)" : undefined}
        fill="#6EC6FF"
        opacity="0.55"
      >
        <circle cx="80" cy="120" r="2.6" />
        <circle cx="100" cy="140" r="2.2" />
        <circle cx="60" cy="150" r="1.8" />
        <circle cx="540" cy="380" r="2.4" />
        <circle cx="555" cy="400" r="1.8" />
        <circle cx="525" cy="390" r="1.6" />
      </g>
    </svg>
  );
}

function PriceCard({ tier }: { tier: Tier }) {
  const isHighlight = tier.highlight;
  return (
    <div className="relative">
      {tier.badge && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 -top-2.5 z-10 rounded-full px-2.5 py-1 text-[7.5px] font-display font-extrabold uppercase tracking-[0.22em] whitespace-nowrap ${
            tier.badge.tone === "popular"
              ? "bg-[#6EC6FF] text-[#062a45]"
              : "bg-[#FF7A00] text-white"
          }`}
        >
          {tier.badge.label}
        </div>
      )}
      <div
        className={`relative rounded-lg px-2 pt-3.5 pb-2.5 h-full ${
          isHighlight
            ? "bg-white/10 border border-[#6EC6FF]/70"
            : "bg-white/5 border border-white/15"
        }`}
      >
        <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#6EC6FF]">
          {tier.hours}
        </p>
        <p className="mt-0.5 font-display font-bold text-white text-[0.6rem] leading-tight">
          {tier.name}
        </p>

        <p className="mt-1.5 text-white/45 text-[0.55rem] font-semibold line-through tabular-nums">
          {tier.strike}
        </p>
        {/* Price: numeral leads, € sign trails after a tight gap —
            matches the Finnish convention "199 €" rather than the
            anglo "€199". */}
        <div className="flex items-baseline">
          <span className="font-display font-black text-white text-[1.45rem] leading-none tracking-tighter tabular-nums">
            {tier.price}
          </span>
          <span className="font-display font-extrabold text-white text-[0.85rem] leading-none ml-0.5">
            €
          </span>
        </div>

        <span className="mt-1.5 inline-flex items-center rounded-full bg-[#FF7A00]/90 text-white font-display font-bold uppercase tracking-[0.1em] text-[7px] px-1.5 py-0.5">
          {tier.saving}
        </span>
      </div>
    </div>
  );
}

/**
 * Static spray-style underline mirroring the site's BrushUnderline.
 */
function SprayUnderline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 20"
      preserveAspectRatio="none"
      className="absolute left-0 right-0 -bottom-3 w-full h-3 pointer-events-none overflow-visible"
    >
      <defs>
        <filter id="flyerSpray" x="-10%" y="-50%" width="120%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="2.5" />
        </filter>
      </defs>
      <path
        d="M4,14 L 318,5"
        stroke="#6EC6FF"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        opacity="0.18"
        filter="url(#flyerSpray)"
      />
      <path
        d="M4,14 L 318,5"
        stroke="#6EC6FF"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        filter="url(#flyerSpray)"
      />
      <g fill="#6EC6FF">
        <circle cx="12" cy="17" r="1.4" />
        <circle cx="60" cy="3" r="1" />
        <circle cx="116" cy="16" r="1.6" />
        <circle cx="180" cy="2" r="1.2" />
        <circle cx="248" cy="14" r="1" />
        <circle cx="306" cy="2" r="1.5" />
      </g>
    </svg>
  );
}
