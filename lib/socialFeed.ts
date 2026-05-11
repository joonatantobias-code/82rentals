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
const BRAND_VIDEOS = [
  {
    slug: "aloitus",
    videoUrl: "/Aloitusvideo.mp4",
    caption: "Linkki biossa varauksiin 🌊 #vesijetti #helsinki #seadoo #vuokraus",
    likes: { tt: "12.4k", ig: "9.1k" },
    comments: { tt: "184", ig: "132" },
    shares: { tt: "612", ig: "284" },
    igStartOffset: 4,
  },
  {
    slug: "nopeus",
    videoUrl: "/Nopeusvideo.mp4",
    caption: "Linkki biossa varauksiin ⚡️ #vesijetti #seadoo #sparktrixx #helsinki",
    likes: { tt: "16.8k", ig: "11.4k" },
    comments: { tt: "274", ig: "186" },
    shares: { tt: "523", ig: "342" },
    igStartOffset: 6,
  },
  {
    slug: "lowcortisol",
    videoUrl: "/Low-cortisol.mp4",
    caption: "Linkki biossa varauksiin 🧘 #vesijetti #helsinki #stressfree #saaristo",
    likes: { tt: "8.2k", ig: "7.6k" },
    comments: { tt: "112", ig: "98" },
    shares: { tt: "264", ig: "201" },
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
    postUrl: INSTAGRAM_PROFILE,
    audioLabel: "Original audio",
    startOffset: v.igStartOffset,
  },
]);

/**
 * Returns the reels feed. Currently synchronous and static; switch to an
 * async version pointing at /api/social-feed once the platform integration
 * lands. Component code does not need to change — just the call shape.
 */
export function getReels(): Reel[] {
  return MOCK_REELS;
}
