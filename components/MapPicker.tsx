"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";

export type Harbor = {
  name: string;
  lat: number;
  lng: number;
};

export const HARBORS: Harbor[] = [
  { name: "Hernesaari", lat: 60.1495, lng: 24.9176 },
  { name: "Lauttasaari", lat: 60.1561, lng: 24.8855 },
  { name: "Hietaniemi", lat: 60.1741, lng: 24.9163 },
  { name: "Munkkiniemi", lat: 60.1996, lng: 24.8819 },
  { name: "Kulosaari", lat: 60.1875, lng: 25.0001 },
  { name: "Kruunuvuori", lat: 60.1696, lng: 24.9986 },
  { name: "Suomenlinna", lat: 60.1456, lng: 24.9888 },
  { name: "Vuosaari", lat: 60.2118, lng: 25.1462 },
];

const HELSINKI_CENTER: [number, number] = [60.175, 24.96];

/**
 * Map picker without Leaflet markers. Leaflet renders only the tiles; pins
 * are plain `<button>` elements positioned over the map using
 * `latLngToContainerPoint`. Each button has a native `onClick` so click
 * routing is impossible to get wrong.
 */
export default function MapPicker({
  selected,
  onPick,
}: {
  selected: string;
  onPick: (name: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [points, setPoints] = useState<
    { name: string; x: number; y: number }[]
  >([]);

  // Initialize Leaflet once
  useEffect(() => {
    const el = containerRef.current;
    if (!el || mapRef.current) return;

    const map = L.map(el, {
      center: HELSINKI_CENTER,
      zoom: 11,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    const recalc = () => {
      const next = HARBORS.map((h) => {
        const p = map.latLngToContainerPoint([h.lat, h.lng]);
        return { name: h.name, x: p.x, y: p.y };
      });
      setPoints(next);
    };

    recalc();
    map.on("move zoom moveend zoomend resize", recalc);
    // Trigger one more tick after layout settles
    setTimeout(recalc, 80);

    return () => {
      map.off();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Whenever a harbor is selected, smoothly recenter
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selected) return;
    const h = HARBORS.find((x) => x.name === selected);
    if (h) map.flyTo([h.lat, h.lng], 13, { duration: 0.5 });
  }, [selected]);

  return (
    <div className="relative rounded-2xl overflow-hidden border-2 border-brand-primary/30 shadow-soft">
      <div
        ref={containerRef}
        className="h-[320px] sm:h-[380px] w-full bg-brand-primary-50"
      />
      {/* Custom pin overlay — pure HTML buttons over the tile layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 500 }}
      >
        {points.map((p) => {
          const isSelected = p.name === selected;
          const size = isSelected ? 44 : 32;
          const fill = isSelected ? "#0A3D62" : "#6EC6FF";
          const ring = isSelected ? "#FFFFFF" : "#0A3D62";
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => onPick(p.name)}
              aria-label={p.name}
              className="pointer-events-auto absolute group focus:outline-none"
              style={{
                left: p.x,
                top: p.y,
                transform: "translate(-50%, -100%)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width={size}
                height={size}
                style={{
                  display: "block",
                  filter: isSelected
                    ? "drop-shadow(0 4px 8px rgba(10,61,98,0.4))"
                    : "drop-shadow(0 2px 4px rgba(10,61,98,0.25))",
                  transition:
                    "width 200ms cubic-bezier(.2,.8,.2,1), height 200ms cubic-bezier(.2,.8,.2,1)",
                }}
              >
                <path
                  d="M16 1 C 8 1 3 7 3 14 C 3 22 16 31 16 31 C 16 31 29 22 29 14 C 29 7 24 1 16 1 Z"
                  fill={fill}
                  stroke={ring}
                  strokeWidth="2.5"
                />
                <circle cx="16" cy="13" r="4.5" fill={ring} />
              </svg>
              <span
                className={`absolute left-1/2 top-full mt-1 -translate-x-1/2 px-2 py-0.5 text-[11px] font-semibold rounded-full shadow-soft whitespace-nowrap transition-opacity ${
                  isSelected
                    ? "bg-brand-secondary text-white opacity-100"
                    : "bg-white text-brand-secondary opacity-0 group-hover:opacity-100 group-focus:opacity-100"
                }`}
              >
                {p.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
