"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";

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

function makeIcon(selected: boolean) {
  const size = selected ? 44 : 32;
  const color = selected ? "#0A3D62" : "#6EC6FF";
  const ring = selected ? "#FFFFFF" : "#0A3D62";
  const html = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}" style="display:block;cursor:pointer;"><path d="M16 1 C 8 1 3 7 3 14 C 3 22 16 31 16 31 C 16 31 29 22 29 14 C 29 7 24 1 16 1 Z" fill="${color}" stroke="${ring}" stroke-width="2.5"/><circle cx="16" cy="13" r="4.5" fill="${ring}"/></svg>`;
  return L.divIcon({
    className: "harbor-pin",
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
}

/**
 * Imperative marker layer. Markers are created once with bound click
 * handlers; subsequent re-renders only swap the icon for the current
 * selection. This avoids react-leaflet's stale-handler footgun where every
 * click could route to the first marker.
 */
function MarkerLayer({
  selected,
  onPick,
}: {
  selected: string;
  onPick: (name: string) => void;
}) {
  const map = useMap();
  const markersRef = useRef<L.Marker[]>([]);
  const onPickRef = useRef(onPick);

  // Keep handler reference current
  useEffect(() => {
    onPickRef.current = onPick;
  }, [onPick]);

  // Mount markers once
  useEffect(() => {
    const created: L.Marker[] = [];
    HARBORS.forEach((h) => {
      const marker = L.marker([h.lat, h.lng], {
        icon: makeIcon(false),
        title: h.name,
        alt: h.name,
        riseOnHover: true,
      });
      // Each marker gets its own closure over `h`
      marker.on("click", () => onPickRef.current(h.name));
      marker.bindTooltip(h.name, {
        direction: "top",
        offset: [0, -28],
        opacity: 1,
      });
      marker.addTo(map);
      created.push(marker);
    });
    markersRef.current = created;
    return () => {
      created.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [map]);

  // Update icons + camera when selection changes
  useEffect(() => {
    markersRef.current.forEach((marker, i) => {
      const harbor = HARBORS[i];
      marker.setIcon(makeIcon(harbor.name === selected));
    });
    if (selected) {
      const idx = HARBORS.findIndex((h) => h.name === selected);
      if (idx >= 0) {
        const h = HARBORS[idx];
        map.flyTo([h.lat, h.lng], 13, { duration: 0.6 });
      }
    }
  }, [selected, map]);

  return null;
}

export default function MapPicker({
  selected,
  onPick,
}: {
  selected: string;
  onPick: (name: string) => void;
}) {
  return (
    <div className="rounded-2xl overflow-hidden border-2 border-brand-primary/30 shadow-soft">
      <MapContainer
        center={HELSINKI_CENTER}
        zoom={11}
        scrollWheelZoom={false}
        className="h-[320px] sm:h-[380px] w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerLayer selected={selected} onPick={onPick} />
      </MapContainer>
    </div>
  );
}
