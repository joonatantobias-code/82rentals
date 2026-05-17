/**
 * Local image paths used across the marketing site. Everything
 * lives under /public/skuutit/ and is part of the repository,
 * served from Vercel's edge cache. No external CDN dependencies,
 * no Unsplash, no stock filler.
 *
 * If you need a new image here:
 *   1. Drop the file into /public/skuutit/ (or another /public
 *      subfolder).
 *   2. Add a key + path below.
 *   3. Reference it from a component as `LOCAL_PHOTOS.someKey`.
 */
export const LOCAL_PHOTOS = {
  blue1: "/skuutit/spark-trixx-blue-1.png",
  blue2: "/skuutit/spark-trixx-blue-2.png",
  blueSide: "/skuutit/spark-trixx-blue-side.png",
  yellowRider: "/skuutit/spark-trixx-yellow-rider.png",
  redRider: "/skuutit/spark-red-rider.png",
  coupleAction: "/skuutit/spark-couple-action.png",
  founders: "/skuutit/founders.jpg",
  // Real photos of our own Sea-Doo Spark Trixx, shot in Seinäjoki.
  // Used as the primary product gallery on /vesijetti and various
  // hero / section posters across the site.
  ownSpark1: "/skuutit/seinajoki-1.jpg",
  ownSpark2: "/skuutit/seinajoki-2.jpg",
  ownSpark3: "/skuutit/seinajoki-3.jpg",
  ownSpark4: "/skuutit/seinajoki-4.jpg",
  ownSpark5: "/skuutit/seinajoki-5.jpg",
  ownSpark6: "/skuutit/seinajoki-6.jpg",
  ownSpark7: "/skuutit/seinajoki-7.jpg",
} as const;
