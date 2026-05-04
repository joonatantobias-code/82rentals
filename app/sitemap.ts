import type { MetadataRoute } from "next";

const BASE = "https://82rentals.com";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/vesijetti", priority: 0.9, changeFrequency: "monthly" },
  { path: "/hinnasto", priority: 0.9, changeFrequency: "monthly" },
  { path: "/varaa", priority: 0.95, changeFrequency: "weekly" },
  { path: "/meista", priority: 0.7, changeFrequency: "monthly" },
  { path: "/yhteystiedot", priority: 0.6, changeFrequency: "yearly" },
  { path: "/ukk", priority: 0.6, changeFrequency: "monthly" },
  { path: "/miten-toimii", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
