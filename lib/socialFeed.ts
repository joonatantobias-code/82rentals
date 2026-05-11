// Social feed data source.
//
// Today: returns a curated set of mock reels (the same ones the carousel
// has been showing). Tomorrow: replace the body of getReels() with calls
// to /api/social-feed, which will proxy the TikTok / Instagram APIs
// server-side and return data in this exact shape.
//
// Wiring real platforms when the accounts have content:
//
//   TikTok  — Display API (commercial: Research API) listing the
//             authenticated user's posts. Auth via OAuth bearer token
//             stored in TIKTOK_ACCESS_TOKEN. Video URLs come back
//             CDN-signed and need re-fetching periodically (or proxied
//             through Vercel so we control cache + CORS).
//   Instagram — Graph API: GET /me/media + GET /{media-id}?fields=...
//             scoped via a Long-Lived Access Token (IG_ACCESS_TOKEN).
//             Reels require the ig_basic + ig_show_list permissions
//             plus a Business/Creator account.
//
// The route handler should normalise both platform responses into the
// `Reel` shape below so this component stays platform-agnostic. Drop in
// the real fetch and the carousel keeps working with no UI changes.

import { unsplashUrl, PEXELS_VIDEOS, LOCAL_PHOTOS } from "@/lib/images";

export type Platform = "tiktok" | "instagram";

export type Reel = {
  id: string;
  platform: Platform;
  // Caption straight from the post — never translated, since the user is
  // about to click through to the original. Keep it short (≈ 80 chars).
  // For our own brand reels, the caption is also where "linkki biossa"
  // belongs — TikTok strips clickable URLs from captions, so real
  // creators point viewers at their profile bio instead.
  caption: string;
  // Engagement counts as already-formatted strings (e.g. "12.4k") so we
  // don't need to know each platform's locale conventions at render time.
  likes: string;
  comments: string;
  shares: string;
  // Direct video URL (mp4 / m3u8). For real data this will usually be a
  // proxied URL from /api/social-feed/proxy?id=... so we can cache and
  // avoid CDN-signing expiry surprises.
  videoUrl: string;
  // Still image rendered while video metadata loads.
  posterUrl: string;
  // Where the post lives — used for the "click again to open" action.
  postUrl: string;
  // Audio / sound label printed at the bottom of the card. Authentic
  // reels almost always have one (song name, original audio, etc).
  audioLabel: string;
};

const TIKTOK_PROFILE = "https://www.tiktok.com/@82rentals";
const INSTAGRAM_PROFILE = "https://instagram.com/82rentals";

// Mock dataset. Once the real account has posts, replace each entry with
// the live response from the platform API (or remove this entirely and
// fetch from /api/social-feed). The shape is what the carousel renders.
const MOCK_REELS: Reel[] = [
  {
    id: "tt-aloitus",
    platform: "tiktok",
    caption: "Linkki biossa varauksiin 🌊 #vesijetti #helsinki #seadoo #vuokraus",
    likes: "12.4k",
    comments: "184",
    shares: "612",
    videoUrl: "/Aloitusvideo.mp4",
    posterUrl: LOCAL_PHOTOS.coupleAction,
    postUrl: TIKTOK_PROFILE,
    audioLabel: "alkuperäinen ääni",
  },
  {
    id: "tt-nopeus",
    platform: "tiktok",
    caption: "Linkki biossa varauksiin ⚡️ #vesijetti #seadoo #sparktrixx #helsinki",
    likes: "16.8k",
    comments: "274",
    shares: "523",
    videoUrl: "/Nopeusvideo.mp4",
    posterUrl: LOCAL_PHOTOS.yellowRider,
    postUrl: TIKTOK_PROFILE,
    audioLabel: "alkuperäinen ääni",
  },
  {
    id: "ig-001",
    platform: "instagram",
    caption: "Hernesaaresta Kaivopuistoon, kahvi mukana",
    likes: "8.7k",
    comments: "92",
    shares: "243",
    videoUrl: PEXELS_VIDEOS.blueSea,
    posterUrl: unsplashUrl("jetskiOcean", { w: 800 }),
    postUrl: INSTAGRAM_PROFILE,
    audioLabel: "Original audio",
  },
  {
    id: "tt-002",
    platform: "tiktok",
    caption: "Ensimmäinen ajo, viimeinen jännitys",
    likes: "5.9k",
    comments: "127",
    shares: "318",
    videoUrl: PEXELS_VIDEOS.fast,
    posterUrl: unsplashUrl("jetskiSplash", { w: 800 }),
    postUrl: TIKTOK_PROFILE,
    audioLabel: "alkuperäinen ääni",
  },
  {
    id: "ig-002",
    platform: "instagram",
    caption: "Spark Trixx tempuilla, kavereita kannella",
    likes: "21.2k",
    comments: "412",
    shares: "1.1k",
    videoUrl: PEXELS_VIDEOS.tricks,
    posterUrl: LOCAL_PHOTOS.yellowRider,
    postUrl: INSTAGRAM_PROFILE,
    audioLabel: "Original audio",
  },
  {
    id: "tt-003",
    platform: "tiktok",
    caption: "Lauttasaaresta Vallisaareen",
    likes: "3.1k",
    comments: "58",
    shares: "146",
    videoUrl: PEXELS_VIDEOS.blueSea,
    posterUrl: LOCAL_PHOTOS.redRider,
    postUrl: TIKTOK_PROFILE,
    audioLabel: "alkuperäinen ääni",
  },
  {
    id: "ig-003",
    platform: "instagram",
    caption: "Auringonlasku saaristossa",
    likes: "4.3k",
    comments: "67",
    shares: "188",
    videoUrl: PEXELS_VIDEOS.fast,
    posterUrl: unsplashUrl("helsinki1", { w: 800 }),
    postUrl: INSTAGRAM_PROFILE,
    audioLabel: "Original audio",
  },
  {
    id: "tt-004",
    platform: "tiktok",
    caption: "Kaverit ja 90 hv",
    likes: "9.5k",
    comments: "201",
    shares: "457",
    videoUrl: PEXELS_VIDEOS.tricks,
    posterUrl: unsplashUrl("jetskiAction1", { w: 800 }),
    postUrl: TIKTOK_PROFILE,
    audioLabel: "alkuperäinen ääni",
  },
  {
    id: "ig-004",
    platform: "instagram",
    caption: "Kun kaveri pyytää selfietä",
    likes: "2.8k",
    comments: "44",
    shares: "92",
    videoUrl: PEXELS_VIDEOS.blueSea,
    posterUrl: LOCAL_PHOTOS.blueSide,
    postUrl: INSTAGRAM_PROFILE,
    audioLabel: "Original audio",
  },
  {
    id: "tt-005",
    platform: "tiktok",
    caption: "Synttärilahja kaverille",
    likes: "15.1k",
    comments: "312",
    shares: "722",
    videoUrl: PEXELS_VIDEOS.fast,
    posterUrl: LOCAL_PHOTOS.blue1,
    postUrl: TIKTOK_PROFILE,
    audioLabel: "alkuperäinen ääni",
  },
  {
    id: "ig-005",
    platform: "instagram",
    caption: "Päivä joka jää muistiin",
    likes: "6.2k",
    comments: "108",
    shares: "234",
    videoUrl: PEXELS_VIDEOS.tricks,
    posterUrl: unsplashUrl("jetskiAction3", { w: 800 }),
    postUrl: INSTAGRAM_PROFILE,
    audioLabel: "Original audio",
  },
  {
    id: "tt-006",
    platform: "tiktok",
    caption: "Kaveriporukan kesän paras päivä",
    likes: "18.6k",
    comments: "374",
    shares: "841",
    videoUrl: PEXELS_VIDEOS.blueSea,
    posterUrl: LOCAL_PHOTOS.blue2,
    postUrl: TIKTOK_PROFILE,
    audioLabel: "alkuperäinen ääni",
  },
  {
    id: "ig-006",
    platform: "instagram",
    caption: "Saaristoreitti kahdelle",
    likes: "7.4k",
    comments: "121",
    shares: "281",
    videoUrl: PEXELS_VIDEOS.fast,
    posterUrl: unsplashUrl("jetskiAction2", { w: 800 }),
    postUrl: INSTAGRAM_PROFILE,
    audioLabel: "Original audio",
  },
  {
    id: "tt-007",
    platform: "tiktok",
    caption: "Aamuauringossa ennen kaupunkia",
    likes: "10.9k",
    comments: "229",
    shares: "496",
    videoUrl: PEXELS_VIDEOS.fast,
    posterUrl: unsplashUrl("helsinki2", { w: 800 }),
    postUrl: TIKTOK_PROFILE,
    audioLabel: "alkuperäinen ääni",
  },
  {
    id: "ig-007",
    platform: "instagram",
    caption: "Helsinki keulasta katsottuna",
    likes: "13.2k",
    comments: "256",
    shares: "538",
    videoUrl: PEXELS_VIDEOS.tricks,
    posterUrl: LOCAL_PHOTOS.coupleAction,
    postUrl: INSTAGRAM_PROFILE,
    audioLabel: "Original audio",
  },
];

/**
 * Returns the reels feed. Currently synchronous and static; switch to an
 * async version pointing at /api/social-feed once the platform integration
 * lands. Component code does not need to change — just the call shape.
 */
export function getReels(): Reel[] {
  return MOCK_REELS;
}
