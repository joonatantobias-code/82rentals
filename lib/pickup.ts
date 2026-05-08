export const PICKUP = {
  name: "Kipparlahden satama",
  area: "Kipparlahdenkuja 3, 00810 Helsinki",
  // Coords for Kipparlahdenkuja 3 — the dock sits at the foot of
  // Kipparvuori on the western shore of Kipparlahti bay in Herttoniemi.
  // Earlier values were dropping the OpenStreetMap marker too far
  // east at Tammisalo, so they're now pulled back to the actual
  // Kipparvuori position visible on the map. Used by the embedded
  // OpenStreetMap iframe and the Apple Maps `ll=` fallback.
  lat: 60.1875,
  lng: 25.0508,
};

const PICKUP_QUERY = encodeURIComponent(
  `Kipparlahdenkuja 3, 00810 Helsinki`
);
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${PICKUP_QUERY}`;
export const APPLE_MAPS_URL = `https://maps.apple.com/?q=${PICKUP_QUERY}&ll=${PICKUP.lat},${PICKUP.lng}`;
