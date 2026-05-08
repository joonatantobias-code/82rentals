export const PICKUP = {
  name: "Kipparlahden satama",
  area: "Kipparlahti, Helsinki",
  // Approximate coords for the Kipparlahti bay area in Roihuvuori/Herttoniemi.
  lat: 60.1862,
  lng: 25.0510,
};

const PICKUP_QUERY = encodeURIComponent(
  `Kipparlahden satama, Kipparlahti, Helsinki`
);
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${PICKUP_QUERY}`;
export const APPLE_MAPS_URL = `https://maps.apple.com/?q=${PICKUP_QUERY}&ll=${PICKUP.lat},${PICKUP.lng}`;
