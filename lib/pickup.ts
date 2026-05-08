export const PICKUP = {
  name: "Kipparlahden satama",
  area: "Kipparlahdenkuja 3, 00810 Helsinki",
  // Coords for Kipparlahdenkuja 3, planted right next to the
  // Kipparvuori label on OpenStreetMap (eastern Herttoniemenranta,
  // western shore of Kipparlahti bay). Two earlier guesses dropped
  // the marker east of the bay near Tammisalo; this one is pulled
  // all the way west to the actual Kipparvuori promontory where the
  // dock sits.
  lat: 60.1909,
  lng: 25.0224,
};

const PICKUP_QUERY = encodeURIComponent(
  `Kipparlahdenkuja 3, 00810 Helsinki`
);
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${PICKUP_QUERY}`;
export const APPLE_MAPS_URL = `https://maps.apple.com/?q=${PICKUP_QUERY}&ll=${PICKUP.lat},${PICKUP.lng}`;
