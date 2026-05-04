export const PICKUP = {
  name: "Kipparilahden venekerho",
  area: "Herttoniemi, Helsinki",
  lat: 60.1869,
  lng: 25.0247,
};

const PICKUP_QUERY = encodeURIComponent(`${PICKUP.name}, ${PICKUP.area}`);
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${PICKUP_QUERY}`;
export const APPLE_MAPS_URL = `https://maps.apple.com/?q=${PICKUP_QUERY}&ll=${PICKUP.lat},${PICKUP.lng}`;
