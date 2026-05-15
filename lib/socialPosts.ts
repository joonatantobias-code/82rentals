/**
 * Hard-coded list of published Instagram and TikTok posts to embed
 * in the home page's social feed. Add new URLs to the top of each
 * array as the team posts — order is preserved in the rendered
 * scroller so newest sits left-most.
 *
 * Why we keep this as a static list rather than fetching from the
 * platforms: pulling live "feed" data from either platform requires
 * an OAuth access token issued from a registered developer app.
 * Until those tokens are in place, embedding by URL is the closest
 * thing to real content — each embed renders the actual post via
 * the official widget so the video, caption, likes, and comments
 * are pulled live from the platform itself.
 */

export const INSTAGRAM_POST_URLS: string[] = [
  "https://www.instagram.com/p/DYOwQ5Ao04j/",
  "https://www.instagram.com/p/DYRYsRGI7ZL/",
];

export const TIKTOK_POST_URLS: string[] = [
  // Lisää URL:t kun käyttäjä toimittaa ne:
  // "https://www.tiktok.com/@82rentals/video/1234..."
];
