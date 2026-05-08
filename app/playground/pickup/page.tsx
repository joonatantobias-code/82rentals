"use client";

import { useState } from "react";
import { PICKUP } from "@/lib/pickup";

// Scratch playground for picking the pickup pin lat/lng. Loads the
// same OpenStreetMap embed the live site uses, then overlays a
// transparent click-target on top: clicking anywhere on the map
// converts the pixel position back to lat/lng using the iframe's
// known bbox, drops the marker there, and recentres the view on the
// new spot. Use the zoom buttons to tighten or widen the view, then
// copy the lat/lng pair into lib/pickup.ts.

const ZOOM_PRESETS = [
  { label: "Laaja", dLat: 0.012, dLng: 0.022 },
  { label: "Normaali", dLat: 0.005, dLng: 0.0095 },
  { label: "Tarkka", dLat: 0.002, dLng: 0.0038 },
  { label: "Tarkin", dLat: 0.0008, dLng: 0.0015 },
];

export default function PickupPlayground() {
  const [lat, setLat] = useState(PICKUP.lat);
  const [lng, setLng] = useState(PICKUP.lng);
  const [zoomIdx, setZoomIdx] = useState(1);
  const { dLat, dLng } = ZOOM_PRESETS[zoomIdx];

  const west = lng - dLng;
  const south = lat - dLat;
  const east = lng + dLng;
  const north = lat + dLat;
  const bbox = `${west},${south},${east},${north}`;
  const src =
    `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}` +
    `&layer=mapnik&marker=${lat},${lng}`;

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xRatio = x / rect.width;
    const yRatio = y / rect.height;
    const newLng = west + (east - west) * xRatio;
    const newLat = north - (north - south) * yRatio;
    setLat(Number(newLat.toFixed(6)));
    setLng(Number(newLng.toFixed(6)));
  }

  const snippet = `lat: ${lat.toFixed(4)},\nlng: ${lng.toFixed(4)},`;

  return (
    <main className="min-h-screen bg-slate-100 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-secondary">
              Lähtöpaikan pin-valitsin
            </h1>
            <p className="text-sm text-brand-secondary/70 mt-1">
              Klikkaa karttaa siihen kohtaan minne pin pitää laittaa. Jokainen
              klikkaus uudelleenkohdistaa kartan ja pin asettuu sinne. Kopioi
              lat/lng oikealta ja päivitä{" "}
              <code className="px-1.5 py-0.5 bg-white rounded text-xs">
                lib/pickup.ts
              </code>
              .
            </p>
          </div>
          <div className="flex items-center gap-2">
            {ZOOM_PRESETS.map((z, i) => (
              <button
                key={z.label}
                onClick={() => setZoomIdx(i)}
                type="button"
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                  i === zoomIdx
                    ? "bg-brand-secondary text-white"
                    : "bg-white text-brand-secondary hover:bg-slate-200"
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/10">
            <iframe
              key={`${bbox}-${lat}-${lng}`}
              title="Pickup picker"
              src={src}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[640px] bg-brand-primary-50 block pointer-events-none"
            />
            <div
              role="button"
              tabIndex={0}
              onClick={onClick}
              className="absolute inset-0 cursor-crosshair"
              aria-label="Click to set pickup pin"
            />
          </div>

          <div className="bg-white rounded-2xl shadow ring-1 ring-black/5 p-5 h-fit lg:sticky lg:top-6 space-y-4">
            <div>
              <h2 className="font-display font-bold text-brand-secondary mb-2">
                Koordinaatit
              </h2>
              <dl className="text-sm font-mono bg-slate-50 rounded p-3 leading-relaxed space-y-1">
                <div className="flex justify-between gap-2">
                  <dt className="text-brand-secondary/65">lat</dt>
                  <dd className="font-bold text-brand-secondary">
                    {lat.toFixed(6)}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-brand-secondary/65">lng</dt>
                  <dd className="font-bold text-brand-secondary">
                    {lng.toFixed(6)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-secondary/70">
                Hienosäätö
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex flex-col gap-1 text-xs">
                  <span className="text-brand-secondary/65">lat</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={lat}
                    onChange={(e) =>
                      setLat(Number(e.target.value) || 0)
                    }
                    className="px-2 py-1.5 bg-slate-50 rounded font-mono text-sm border border-slate-200 focus:outline-none focus:border-brand-primary"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs">
                  <span className="text-brand-secondary/65">lng</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={lng}
                    onChange={(e) =>
                      setLng(Number(e.target.value) || 0)
                    }
                    className="px-2 py-1.5 bg-slate-50 rounded font-mono text-sm border border-slate-200 focus:outline-none focus:border-brand-primary"
                  />
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(snippet)}
              className="w-full px-3 py-2 bg-brand-secondary text-white rounded-lg text-sm font-bold hover:bg-brand-primary hover:text-brand-secondary transition-colors"
            >
              Kopioi snippet
            </button>
            <button
              type="button"
              onClick={() => {
                setLat(PICKUP.lat);
                setLng(PICKUP.lng);
              }}
              className="w-full px-3 py-2 bg-slate-100 text-brand-secondary rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors"
            >
              Palauta tämänhetkiseen
            </button>

            <pre className="text-[11px] bg-slate-900 text-slate-100 rounded p-3 overflow-x-auto leading-relaxed">
              {snippet}
            </pre>

            <p className="text-xs text-brand-secondary/65 leading-relaxed">
              Vinkki: aloita laajalla zoomilla, klikkaa kohti oikeaa aluetta,
              kiristä zoomia ja klikkaa uudestaan tarkalleen oikeaan
              kohtaan. Hienosäätö-kentät ovat sub-pikselin tarkkuutta varten.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
