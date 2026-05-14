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
  // Still frame extracted from the same video, used while the video
  // element waits to decode its first frame. Generated from the real
  // mp4 via qlmanage so every visual on the carousel comes straight
  // from our own clip — no stock filler.
  posterUrl: string;
  // Where the post lives — used for the "click again to open" action.
  postUrl: string;
  // Audio / sound label printed at the bottom of the card. Authentic
  // reels almost always have one (song name, original audio, etc).
  audioLabel: string;
  // Seconds into the source clip the card starts playing. Used so the
  // same brand video shown on both TikTok and Instagram tabs doesn't
  // open on the identical frame — a small offset makes the same clip
  // feel like a second post.
  startOffset?: number;
};

const TIKTOK_PROFILE = "https://www.tiktok.com/@82rentals";
const INSTAGRAM_PROFILE = "https://instagram.com/82rentals";

// Mock dataset. Once the real account has posts, replace each entry with
// the live response from the platform API (or remove this entirely and
// fetch from /api/social-feed). The shape is what the carousel renders.
// Three brand videos uploaded by the team. Each appears on both
// the TikTok and Instagram tab — same clip, platform-specific
// chrome — so every reel in the carousel is genuinely our own
// content (no stock fillers). The Instagram variant starts a few
// seconds later than the TikTok one so the two cards don't open
// on the identical frame, which makes the same clip feel like
// two distinct posts. Captions stay platform-neutral and follow
// the real-creator convention of "Linkki biossa" because neither
// feed renders clickable URLs inside the post overlay.
// Engagement numbers grounded around a ~1 000-likes-per-post
// baseline so the carousel doesn't pretend to be a viral mega-
// account. Top performer ~1.8k, weakest ~640. Comments at 2–3 %
// of likes, shares at ~1 %. Realistic for a small Helsinki
// rental brand.
const BRAND_VIDEOS = [
  {
    slug: "aloitus",
    videoUrl: "/Aloitusvideo.mp4",
    posterUrl: "/Aloitusvideo-poster.jpg",
    caption: "Linkki biossa varauksiin 🌊 #vesijetti #helsinki #seadoo #vuokraus",
    likes: { tt: "1.2k", ig: "980" },
    comments: { tt: "28", ig: "22" },
    shares: { tt: "14", ig: "9" },
    igStartOffset: 4,
  },
  {
    slug: "nopeus",
    videoUrl: "/Nopeusvideo.mp4",
    posterUrl: "/Nopeusvideo-poster.jpg",
    caption: "Linkki biossa varauksiin ⚡️ #vesijetti #seadoo #sparktrixx #helsinki",
    likes: { tt: "1.8k", ig: "1.4k" },
    comments: { tt: "42", ig: "31" },
    shares: { tt: "22", ig: "16" },
    igStartOffset: 6,
  },
  {
    slug: "lowcortisol",
    videoUrl: "/Low-cortisol.mp4",
    posterUrl: "/Low-cortisol-poster.jpg",
    caption: "Linkki biossa varauksiin 🧘 #vesijetti #helsinki #stressfree #saaristo",
    likes: { tt: "720", ig: "640" },
    comments: { tt: "18", ig: "14" },
    shares: { tt: "8", ig: "6" },
    igStartOffset: 3,
  },
] as const;

const MOCK_REELS: Reel[] = BRAND_VIDEOS.flatMap((v) => [
  {
    id: `tt-${v.slug}`,
    platform: "tiktok",
    caption: v.caption,
    likes: v.likes.tt,
    comments: v.comments.tt,
    shares: v.shares.tt,
    videoUrl: v.videoUrl,
    posterUrl: v.posterUrl,
    postUrl: TIKTOK_PROFILE,
    audioLabel: "alkuperäinen ääni",
  },
  {
    id: `ig-${v.slug}`,
    platform: "instagram",
    caption: v.caption,
    likes: v.likes.ig,
    comments: v.comments.ig,
    shares: v.shares.ig,
    videoUrl: v.videoUrl,
    posterUrl: v.posterUrl,
    postUrl: INSTAGRAM_PROFILE,
    audioLabel: "Original audio",
    startOffset: v.igStartOffset,
  },
]);

/**
 * Synchronous fallback so the component has something to render on
 * first paint while /api/social-feed is in flight (or if it fails).
 * The hook below replaces this with live IG / TikTok data once the
 * fetch resolves.
 */
export function getReels(): Reel[] {
  return MOCK_REELS;
}

/**
 * Fetches the live IG + TikTok feed from our own /api/social-feed
 * proxy. The proxy hits the Graph API / TikTok Display API on the
 * server with our app tokens, normalises both responses into the
 * `Reel` shape, and caches the merged payload for 10 minutes.
 *
 * Falls back to the local brand-clip mocks on any error so the
 * carousel keeps rendering — the marketing site shouldn't go blank
 * because a third-party API hiccuped.
 */
export async function fetchLiveReels(): Promise<Reel[]> {
  try {
    const res = await fetch("/api/social-feed", { cache: "no-store" });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as { reels?: Reel[] };
    if (Array.isArray(data.reels) && data.reels.length > 0) return data.reels;
  } catch {
    // Swallow — fall through to mocks below.
  }
  return MOCK_REELS;
}
