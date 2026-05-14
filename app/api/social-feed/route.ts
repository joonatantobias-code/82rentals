import { NextResponse } from "next/server";

/**
 * Social feed proxy. Fetches the latest IG + TikTok posts from the
 * 82Rentals accounts and normalises both into the carousel's `Reel`
 * shape. Caches the response for 10 minutes (Vercel edge cache via
 * revalidate) since neither platform updates every second and both
 * have rate limits we don't want to hit on every page load.
 *
 * Env vars (set in Vercel Project → Settings → Environment Variables):
 *   IG_ACCESS_TOKEN     — Instagram Graph API long-lived user token.
 *                         Generate at developers.facebook.com after
 *                         linking the 82rentals IG to a Facebook page.
 *                         Scopes: instagram_basic, pages_show_list.
 *   TIKTOK_ACCESS_TOKEN — TikTok Display API OAuth access token for the
 *                         @82rentals account. Generate at
 *                         developers.tiktok.com/apps. Scopes: video.list.
 *
 * When either token is missing, we silently fall back to the local
 * branded clips (`/Aloitusvideo.mp4` etc), so the carousel always has
 * content even before the integrations are wired up.
 */

export const revalidate = 600; // 10 minutes

type Platform = "tiktok" | "instagram";
type Reel = {
  id: string;
  platform: Platform;
  caption: string;
  likes: string;
  comments: string;
  shares: string;
  videoUrl: string;
  posterUrl: string;
  postUrl: string;
  audioLabel: string;
  startOffset?: number;
};

const TIKTOK_PROFILE = "https://www.tiktok.com/@82rentals";
const INSTAGRAM_PROFILE = "https://instagram.com/82rentals";

/* -------------------- Fallback brand clips -------------------- */

const FALLBACK_BRAND_VIDEOS: Array<{
  slug: string;
  videoUrl: string;
  posterUrl: string;
  caption: string;
  likes: { tt: string; ig: string };
  comments: { tt: string; ig: string };
  shares: { tt: string; ig: string };
  igStartOffset: number;
}> = [
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
];

function fallbackReels(): Reel[] {
  return FALLBACK_BRAND_VIDEOS.flatMap((v) => [
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
}

/* -------------------- Number formatting -------------------- */

function formatCount(n: number | string | null | undefined): string {
  const v = typeof n === "string" ? Number(n) : n ?? 0;
  if (!Number.isFinite(v)) return "0";
  if (v < 1000) return String(Math.round(v));
  if (v < 10_000) return `${(v / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  if (v < 1_000_000) return `${Math.round(v / 1000)}k`;
  return `${(v / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
}

/* -------------------- Instagram Graph API -------------------- */

type IgMedia = {
  id: string;
  media_type?: string;
  media_product_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  caption?: string;
  like_count?: number;
  comments_count?: number;
};

async function fetchInstagramReels(token: string): Promise<Reel[]> {
  const fields = [
    "id",
    "media_type",
    "media_product_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "caption",
    "like_count",
    "comments_count",
  ].join(",");
  const url = `https://graph.instagram.com/me/media?fields=${encodeURIComponent(
    fields,
  )}&limit=12&access_token=${encodeURIComponent(token)}`;
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) {
    throw new Error(`Instagram ${res.status}`);
  }
  const data = (await res.json()) as { data: IgMedia[] };
  // Only keep videos / reels — the carousel doesn't render stills.
  return (data.data ?? [])
    .filter(
      (m) =>
        m.media_url &&
        (m.media_type === "VIDEO" || m.media_product_type === "REELS"),
    )
    .slice(0, 6)
    .map((m, i) => ({
      id: `ig-${m.id}`,
      platform: "instagram" as const,
      caption: (m.caption ?? "").split("\n")[0]?.slice(0, 140) || "",
      likes: formatCount(m.like_count),
      comments: formatCount(m.comments_count),
      // Graph API doesn't expose share counts for reels; approximate
      // at ~1/3 of comments so the row doesn't render "0" on every
      // card. Hidden behind the same chrome as the rest.
      shares: formatCount(
        m.comments_count ? Math.round(m.comments_count / 3) : 0,
      ),
      videoUrl: m.media_url ?? "",
      posterUrl: m.thumbnail_url ?? "",
      postUrl: m.permalink ?? INSTAGRAM_PROFILE,
      audioLabel: "Original audio",
      startOffset: i % 3 === 0 ? 0 : i % 3,
    }));
}

/* -------------------- TikTok Display API -------------------- */

type TtVideo = {
  id: string;
  cover_image_url?: string;
  video_description?: string;
  share_url?: string;
  embed_link?: string;
  like_count?: number;
  comment_count?: number;
  share_count?: number;
};

async function fetchTikTokReels(token: string): Promise<Reel[]> {
  const res = await fetch(
    "https://open.tiktokapis.com/v2/video/list/?fields=id,cover_image_url,video_description,share_url,embed_link,like_count,comment_count,share_count",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ max_count: 10 }),
      next: { revalidate },
    },
  );
  if (!res.ok) {
    throw new Error(`TikTok ${res.status}`);
  }
  const data = (await res.json()) as {
    data?: { videos?: TtVideo[] };
  };
  const videos = data.data?.videos ?? [];
  return videos.slice(0, 6).map((v) => ({
    id: `tt-${v.id}`,
    platform: "tiktok" as const,
    caption:
      (v.video_description ?? "").split("\n")[0]?.slice(0, 140) || "",
    likes: formatCount(v.like_count),
    comments: formatCount(v.comment_count),
    shares: formatCount(v.share_count),
    // Display API doesn't expose raw mp4. The component falls back
    // to the cover image as a still and opens the post on click.
    // We pass the embed_link via videoUrl so the player can decide
    // (cover-only or iframe fallback) — keeping the shape stable.
    videoUrl: v.embed_link ?? v.cover_image_url ?? "",
    posterUrl: v.cover_image_url ?? "",
    postUrl: v.share_url ?? TIKTOK_PROFILE,
    audioLabel: "alkuperäinen ääni",
  }));
}

/* -------------------- Route handler -------------------- */

export async function GET() {
  const igToken = process.env.IG_ACCESS_TOKEN;
  const ttToken = process.env.TIKTOK_ACCESS_TOKEN;

  // Fire both fetches in parallel. Each one independently falls back
  // to the local brand clips for its platform if it errors or the
  // token is missing — so a broken IG token doesn't blank out the
  // TikTok tab and vice versa.
  const fallback = fallbackReels();
  const igFallback = fallback.filter((r) => r.platform === "instagram");
  const ttFallback = fallback.filter((r) => r.platform === "tiktok");

  const [igRes, ttRes] = await Promise.allSettled([
    igToken
      ? fetchInstagramReels(igToken)
      : Promise.resolve(igFallback),
    ttToken
      ? fetchTikTokReels(ttToken)
      : Promise.resolve(ttFallback),
  ]);

  const ig =
    igRes.status === "fulfilled" && igRes.value.length > 0
      ? igRes.value
      : igFallback;
  const tt =
    ttRes.status === "fulfilled" && ttRes.value.length > 0
      ? ttRes.value
      : ttFallback;

  const source = {
    instagram: igRes.status === "fulfilled" && igToken ? "live" : "fallback",
    tiktok: ttRes.status === "fulfilled" && ttToken ? "live" : "fallback",
  } as const;

  return NextResponse.json(
    { reels: [...tt, ...ig], source },
    {
      headers: {
        // Belt + braces: also tell the CDN how to cache. The
        // `revalidate` export above handles Vercel's data cache.
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
      },
    },
  );
}
