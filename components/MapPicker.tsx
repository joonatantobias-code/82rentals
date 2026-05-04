"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
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
  const html = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}" style="display:block;cursor:pointer;pointer-events:auto;"><path d="M16 1 C 8 1 3 7 3 14 C 3 22 16 31 16 31 C 16 31 29 22 29 14 C 29 7 24 1 16 1 Z" fill="${color}" stroke="${ring}" stroke-width="2.5"/><circle cx="16" cy="13" r="4.5" fill="${ring}"/></svg>`;
  return L.divIcon({
    className: "harbor-pin",
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
}

/**
 * One Marker per harbor, each in its own component. The click handler is
 * bound directly on the underlying Leaflet marker via a ref + useEffect, so
 * each marker captures only its own harbor and can never route clicks to a
 * sibling. The console.log is intentional debug output you can verify in
 * the browser DevTools while picking pins.
 */
function HarborMarker({
  harbor,
  selected,
  onPick,
}: {
  harbor: Harbor;
  selected: string;
  onPick: (name: string) => void;
}) {
  const markerRef = useRef<L.Marker | null>(null);
  // Keep the latest onPick in a ref so the bound handler always calls the
  // freshest version without rebinding.
  const onPickRef = useRef(onPick);
  useEffect(() => {
    onPickRef.current = onPick;
  }, [onPick]);

  // Bind click once per marker. The handler closes over `harbor.name`
  // directly which is unique per HarborMarker instance.
  useEffect(() => {
    const m = markerRef.current;
    if (!m) return;
    const handler = () => {
      // Diagnostic — remove later if noisy
      // eslint-disable-next-line no-console
      console.log("[MapPicker] picked", harbor.name);
      onPickRef.current(harbor.name);
    };
    m.on("click", handler);
    return () => {
      m.off("click", handler);
    };
  }, [harbor.name]);

  const isSelected = selected === harbor.name;

  return (
    <Marker
      ref={markerRef}
      position={[harbor.lat, harbor.lng]}
      icon={makeIcon(isSelected)}
      keyboard
      title={harbor.name}
      alt={harbor.name}
    >
      <Tooltip
        direction="top"
        offset={[0, -28]}
        opacity={1}
        permanent={isSelected}
      >
        <span style={{ fontWeight: 600 }}>{harbor.name}</span>
      </Tooltip>
    </Marker>
  );
}

/** Smoothly recenters the map on the selected harbor. */
function FlyToSelected({ selected }: { selected: string }) {
  const map = useMap();
  useEffect(() => {
    if (!selected) return;
    const h = HARBORS.find((x) => x.name === selected);
    if (h) map.flyTo([h.lat, h.lng], 13, { duration: 0.6 });
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
        {HARBORS.map((h) => (
          <HarborMarker
            key={h.name}
            harbor={h}
            selected={selected}
            onPick={onPick}
          />
        ))}
        <FlyToSelected selected={selected} />
      </MapContainer>
    </div>
  );
}
