// Curated stock photos verified to exist. Each entry is a photo ID; we build
// the final URL via the helper so we can centrally tweak quality, width and
// crop without touching every component.

export const PHOTOS = {
  // Sea-Doo Spark / yellow PWC product shots
  sparkTrixxYellow1: "1623346155525-7214049f32ac",
  sparkTrixxYellow2: "1623346684869-977abfb7778c",
  sparkTrixxYellow3: "1762005806443-49ba91fad15a",
  sparkTrixxYellow4: "1632635025719-0e3f98dfbb53",
  // Action / lifestyle
  jetskiSplash: "1755566981083-5e54b2915148",
  jetskiOcean: "1728354708576-62302c2a6be7",
  jetskiAction1: "1505867798796-639ec7e8cdf5",
  jetskiAction2: "1554132267-d06483b00adc",
  jetskiAction3: "1617059063772-34532796cdb5",
  jetskiAction4: "1564633351631-e85bd59a91af",
  jetskiClean1: "1618858227841-9beacd3b5f6f",
  jetskiClean2: "1761418741711-aeefe283a9aa",
  jetskiClean3: "1712595185763-79553a8d8b42",
  jetskiClean4: "1744288204006-02bf587324dc",
  jetskiSide: "1769234758409-831ae4082186",
  jetskiTop: "1771282136960-345939d9f8d7",
  jetskiClassic: "1530541930197-ff16ac917b0e",
  jetskiFun1: "1599244617334-2128a89e923f",
  // Helsinki / archipelago
  helsinki1: "1538332576228-eb5b4c4de6f5",
  helsinki2: "1540799051881-f52f8d808bf3",
  helsinki3: "1566111947159-0fcbf19648bc",
  helsinki4: "1593157327221-213b1df00998",
  archipelago1: "1604065781162-602728f326a7",
  archipelago2: "1617707713766-ee547bd0720a",
  archipelago3: "1684140937239-7233d385e93f",
  archipelago4: "1564429721077-f020fe95b216",
  friendsOnWater: "1502933691298-84fc14542831",
  coastline: "1587742456-99c4f8d9c1a8",
} as const;

export function unsplashUrl(
  id: keyof typeof PHOTOS,
  opts: { w?: number; q?: number } = {}
) {
  const { w = 1800, q = 92 } = opts;
  return `https://images.unsplash.com/photo-${PHOTOS[id]}?auto=format&fit=crop&w=${w}&q=${q}`;
}

// A few shorthands for the Pexels jet-ski videos we keep for the social
// preview section. Listed here so the component just refers to a key name.
// Use HD (1280x720) instead of UHD (2560x1440). UHD files are 30-44 MB; HD
// is 4-9 MB. Same visual quality at the rendered card size, but ~4x lighter
// to download and decode.
export const PEXELS_VIDEOS = {
  tricks: "https://videos.pexels.com/video-files/18074526/18074526-hd_1280_720_24fps.mp4",
  blueSea: "https://videos.pexels.com/video-files/2079270/2079270-hd_1280_720_30fps.mp4",
  fast: "https://videos.pexels.com/video-files/4763824/4763824-hd_1280_720_24fps.mp4",
} as const;

// Local high-quality Spark photos. Files live under /public/skuutit/.
export const LOCAL_PHOTOS = {
  blue1: "/skuutit/spark-trixx-blue-1.png",
  blue2: "/skuutit/spark-trixx-blue-2.png",
  blueSide: "/skuutit/spark-trixx-blue-side.png",
  yellowRider: "/skuutit/spark-trixx-yellow-rider.png",
  redRider: "/skuutit/spark-red-rider.png",
  coupleAction: "/skuutit/spark-couple-action.png",
  founders: "/skuutit/founders.jpg",
} as const;
