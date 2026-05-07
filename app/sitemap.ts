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
  return routes.map((r) => {
    const url = `${SITE_URL}${r.path}`;
    return {
      url,
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates: {
        languages: {
          fi: url,
          en: url,
          "x-default": url,
        },
      },
    };
  });
}
