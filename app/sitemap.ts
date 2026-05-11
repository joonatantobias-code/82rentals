import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/varaa", priority: 0.95, changeFrequency: "weekly" },
  { path: "/vesijettimme", priority: 0.9, changeFrequency: "monthly" },
  { path: "/hinnasto", priority: 0.9, changeFrequency: "monthly" },
  { path: "/miten-toimii", priority: 0.7, changeFrequency: "monthly" },
  { path: "/meista", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ukk", priority: 0.6, changeFrequency: "monthly" },
  { path: "/yhteystiedot", priority: 0.6, changeFrequency: "yearly" },
  { path: "/sopimusehdot", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    // No `alternates.languages` block: both locales render from the
    // same URL via LocaleProvider, so emitting fi/en/x-default
    // hreflangs that all point back at the same URL just confuses
    // Search Console into flagging duplicate-with-canonical issues.
  }));
}
