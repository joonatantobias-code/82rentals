import type { Metadata } from "next";

export const SITE_URL = "https://82rentals.com";
export const SITE_NAME = "82Rentals";

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  locale?: "fi_FI" | "en_US";
  type?: "website" | "article";
};

export function buildPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  locale = "fi_FI",
  type = "website",
}: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const finalOgTitle = ogTitle ?? title;
  const finalOgDescription = ogDescription ?? description;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fi: url,
        en: url,
        "x-default": url,
      },
    },
    openGraph: {
      type,
      title: finalOgTitle,
      description: finalOgDescription,
      url,
      siteName: SITE_NAME,
      locale,
      alternateLocale: locale === "fi_FI" ? ["en_US"] : ["fi_FI"],
    },
    twitter: {
      card: "summary_large_image",
      title: finalOgTitle,
      description: finalOgDescription,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
