"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LOCAL_PHOTOS } from "@/lib/images";

// Scratch playground for placing the four "Tutustu jettiin"
// hotspots on top of the Spark side-profile photo. Drag the white
// dots to position the markers; drag the white cards to position
// their labels. Coordinates update live in the panel on the right
// — copy the JSON block and paste it into HOTSPOTS in
// components/Anatomy.tsx.

type Spec = {
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  labelAnchor: "right" | "left";
  number: string;
  title: string;
};

const INITIAL: Spec[] = [
  { x: 51, y: 45, labelX: 72, labelY: 14, labelAnchor: "right", number: "01", title: "Säädettävä ohjaustanko" },
  { x: 66, y: 54, labelX: 72, labelY: 86, labelAnchor: "right", number: "02", title: "Sininen Trixx-istuin" },
  { x: 42, y: 60, labelX: 28, labelY: 14, labelAnchor: "left", number: "03", title: "90 hv Rotax 900 ACE" },
  { x: 74, y: 58, labelX: 28, labelY: 86, labelAnchor: "left", number: "04", title: "Kevyt Polytec-runko" },
];

type Handle = { kind: "dot" | "label"; index: number };

export default function AnatomyPlayground() {
  const [hotspots, setHotspots] = useState<Spec[]>(INITIAL);
  const [active, setActive] = useState<Handle | null>(null);
  const [snap, setSnap] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      let x = ((e.clientX - rect.left) / rect.width) * 100;
      let y = ((e.clientY - rect.top) / rect.height) * 100;
      x = Math.max(0, Math.min(100, x));
      y = Math.max(0, Math.min(100, y));
      if (snap) {
        x = Math.round(x);
        y = Math.round(y);
      } else {
        x = Math.round(x * 10) / 10;
        y = Math.round(y * 10) / 10;
      }
      setHotspots((prev) =>
        prev.map((h, i) => {
          if (i !== active.index) return h;
          if (active.kind === "dot") return { ...h, x, y };
          return { ...h, labelX: x, labelY: y };
        }),
      );
    };
    const onUp = () => setActive(null);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [active, snap]);

  const json = JSON.stringify(
    hotspots.map(({ x, y, labelX, labelY, labelAnchor, number }) => ({
      x,
      y,
      labelX,
      labelY,
      labelAnchor,
      number,
    })),
    null,
    2,
  );

  return (
    <main className="min-h-screen bg-slate-100 p-6 sm:p-10 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-secondary">
              Anatomy hotspot playground
            </h1>
            <p className="text-sm text-brand-secondary/70 mt-1">
              Raahaa <strong>valkoisia palloja</strong> = pisteen sijainti.
              Raahaa <strong>valkoisia kortteja</strong> = labelin sijainti.
              Kopio JSON oikeasta paneelista{" "}
              <code className="px-1.5 py-0.5 bg-white rounded text-xs">
                components/Anatomy.tsx
              </code>{" "}
              kohtaan{" "}
              <code className="px-1.5 py-0.5 bg-white rounded text-xs">
                HOTSPOTS
              </code>
              .
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-brand-secondary">
            <input
              type="checkbox"
              checked={snap}
              onChange={(e) => setSnap(e.target.checked)}
              className="h-4 w-4"
            />
            Snap kokonaisiin %-arvoihin
          </label>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div
            ref={containerRef}
            className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-brand-primary-50 ring-1 ring-brand-primary/30 shadow-lg"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setActive(null);
            }}
          >
            <Image
              src={LOCAL_PHOTOS.ownSpark1}
              alt=""
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover pointer-events-none"
              priority
            />
            <div className="absolute inset-0 bg-brand-secondary/15 pointer-events-none" />

            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {hotspots.map((h, i) => (
                <line
                  key={`line-${i}`}
                  x1={h.x}
                  y1={h.y}
                  x2={h.labelX}
                  y2={h.labelY}
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    filter:
                      "drop-shadow(0 1.5px 3px rgba(10,61,98,0.6))",
                  }}
                />
              ))}
              {hotspots.map((h, i) => (
                <ellipse
                  key={`dot-${i}`}
                  cx={h.x}
                  cy={h.y}
                  rx="1.05"
                  ry="1.4"
                  fill="white"
                  stroke="#6EC6FF"
                  strokeWidth="3.2"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    filter:
                      "drop-shadow(0 1.5px 3px rgba(10,61,98,0.6))",
                  }}
                />
              ))}
            </svg>

            {/* Invisible drag handles over each dot */}
            {hotspots.map((h, i) => (
              <button
                key={`dot-handle-${i}`}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setActive({ kind: "dot", index: i });
                }}
                className="absolute h-7 w-7 rounded-full cursor-grab active:cursor-grabbing"
                style={{
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  transform: "translate(-50%, -50%)",
                  background:
                    active?.kind === "dot" && active.index === i
                      ? "rgba(110,198,255,0.4)"
                      : "transparent",
                }}
                aria-label={`Drag dot ${h.number}`}
              />
            ))}

            {/* Draggable labels */}
            {hotspots.map((h, i) => (
              <div
                key={`label-${i}`}
                className="absolute"
                style={{
                  left: `${h.labelX}%`,
                  top: `${h.labelY}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setActive({ kind: "label", index: i });
                  }}
                  className={`rounded-xl bg-white border border-brand-primary/40 shadow-[0_2px_6px_rgba(15,23,42,0.12),0_18px_36px_-12px_rgba(15,23,42,0.32)] px-4 py-3 w-[220px] cursor-grab active:cursor-grabbing ${
                    h.labelAnchor === "left" ? "text-right" : "text-left"
                  } ${
                    active?.kind === "label" && active.index === i
                      ? "ring-2 ring-brand-primary"
                      : ""
                  }`}
                >
                  <div className="flex items-baseline gap-2 text-xs font-bold tracking-wider uppercase text-brand-primary-600">
                    <span className="shrink-0">{h.number}</span>
                    <span className="text-brand-secondary leading-tight">
                      {h.title}
                    </span>
                  </div>
                  <p className="text-xs text-brand-secondary/60 mt-1">
                    label {h.labelX.toFixed(1)}, {h.labelY.toFixed(1)}
                    <br />
                    dot {h.x.toFixed(1)}, {h.y.toFixed(1)}
                  </p>
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow ring-1 ring-black/5 p-5 h-fit lg:sticky lg:top-6">
            <h2 className="font-display font-bold text-brand-secondary mb-3">
              Coordinates
            </h2>
            <div className="space-y-3 mb-4">
              {hotspots.map((h, i) => (
                <div
                  key={i}
                  className="text-xs font-mono bg-slate-50 rounded p-2 leading-relaxed"
                >
                  <div className="font-bold text-brand-secondary">
                    {h.number} {h.title}
                  </div>
                  <div>
                    dot ({h.x.toFixed(1)}, {h.y.toFixed(1)})
                  </div>
                  <div>
                    label ({h.labelX.toFixed(1)}, {h.labelY.toFixed(1)})
                  </div>
                  <div className="mt-1 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setHotspots((prev) =>
                          prev.map((p, pi) =>
                            pi === i
                              ? {
                                  ...p,
                                  labelAnchor:
                                    p.labelAnchor === "left"
                                      ? "right"
                                      : "left",
                                }
                              : p,
                          ),
                        )
                      }
                      className="px-2 py-1 bg-brand-primary text-brand-secondary rounded text-[10px] font-bold"
                    >
                      anchor: {h.labelAnchor}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(json)}
              className="w-full mb-2 px-3 py-2 bg-brand-secondary text-white rounded-lg text-sm font-bold hover:bg-brand-secondary/90"
            >
              Copy JSON
            </button>
            <button
              type="button"
              onClick={() => setHotspots(INITIAL)}
              className="w-full px-3 py-2 bg-slate-100 text-brand-secondary rounded-lg text-sm font-bold hover:bg-slate-200"
            >
              Reset to defaults
            </button>

            <pre className="mt-4 text-[10px] bg-slate-900 text-slate-100 rounded p-3 overflow-x-auto leading-relaxed">
              {json}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
