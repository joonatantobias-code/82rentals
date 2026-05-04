"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { PICKUP, GOOGLE_MAPS_URL, APPLE_MAPS_URL } from "@/lib/pickup";

/**
 * Single-pin map for the pickup location. Pure tile rendering plus a single
 * absolutely-positioned `<button>` over the canvas, mirroring the pattern
 * we use in MapPicker (Leaflet markers were unreliable). The button opens
 * the location in Google or Apple Maps.
 */
export default function PickupMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const pinRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || mapRef.current) return;

    const map = L.map(el, {
      center: [PICKUP.lat, PICKUP.lng],
      zoom: 15,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);
    mapRef.current = map;

    function place() {
      const p = map.latLngToContainerPoint([PICKUP.lat, PICKUP.lng]);
      const pin = pinRef.current;
      if (!pin) return;
      pin.style.left = `${p.x}px`;
      pin.style.top = `${p.y}px`;
    }
    place();
    map.on("move zoom moveend zoomend resize", place);
    setTimeout(place, 80);

    return () => {
      map.off();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border-2 border-brand-primary/30 shadow-soft">
      <div
        ref={containerRef}
        className="h-[280px] sm:h-[340px] w-full bg-brand-primary-50"
      />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 500 }}>
        <button
          ref={pinRef}
          type="button"
          onClick={() => {
            const ua = navigator.userAgent;
            const isApple = /iPad|iPhone|iPod|Macintosh/.test(ua);
            window.open(isApple ? APPLE_MAPS_URL : GOOGLE_MAPS_URL, "_blank", "noopener");
          }}
          aria-label={`Avaa ${PICKUP.name} kartalla`}
          className="pointer-events-auto absolute group focus:outline-none"
          style={{ transform: "translate(-50%, -100%)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width={48}
            height={48}
            style={{
              display: "block",
              filter: "drop-shadow(0 4px 8px rgba(10,61,98,0.4))",
            }}
          >
            <path
              d="M16 1 C 8 1 3 7 3 14 C 3 22 16 31 16 31 C 16 31 29 22 29 14 C 29 7 24 1 16 1 Z"
              fill="#0A3D62"
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
            <circle cx="16" cy="13" r="4.5" fill="#FFFFFF" />
          </svg>
          <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-brand-secondary text-white shadow-soft whitespace-nowrap">
            {PICKUP.name}
          </span>
        </button>
      </div>
    </div>
  );
}
