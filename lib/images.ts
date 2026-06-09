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
  // Hero-videon poster-stilli — pidetään, koska se on osa
  // background-video-elementtiä, ei erillinen valokuvasisältö.
  heroPoster: "/skuutit/hero-poster.jpg",
} as const;

// HUOM: omistajan omat valokuvat (seinajoki-1..7.jpg, founders.jpg,
// og-helsinki.jpg) on poistettu omistajan pyynnöstä. Avaimet
// ownSpark1..7, founders ja ogHelsinki ovat sallitusti poissa
// LOCAL_PHOTOS:ista. Älä lisää niitä takaisin ilman uutta
// kuva-aineistoa.
