/**
 * Single source of truth for the pickup location. Changing the
 * fields here updates every map link, address card, JSON-LD,
 * email confirmation, and booking-form copy that derives from
 * PICKUP across both repos.
 *
 * The coordinates below are an approximate placeholder over the
 * Tervasaari peninsula. Replace with the exact slip coordinates
 * once the brand owner drops the pin in Desktop/82rentals/
 * pin-picker.html.
 */
export const PICKUP = {
  name: "Tervasaaren satama",
  area: "Tervasaari, 00170 Helsinki",
  // TODO: replace with the exact slip coordinates from pin-picker.html.
  lat: 60.17143,
  lng: 24.96275,
};

const PICKUP_QUERY = encodeURIComponent(
  `Tervasaaren satama, 00170 Helsinki`,
);
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${PICKUP_QUERY}`;
export const APPLE_MAPS_URL = `https://maps.apple.com/?q=${PICKUP_QUERY}&ll=${PICKUP.lat},${PICKUP.lng}`;
