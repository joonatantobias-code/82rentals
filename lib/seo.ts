import type { Metadata } from "next";

export const SITE_URL = "https://82rentals.com";
/** Site name visible to Google as the source label in the SERP —
 *  e.g. "82Rentals Oy" instead of "82rentals.com". Drives
 *  og:site_name, the WebSite JSON-LD, and applicationName, all of
 *  which feed Google's "site name" detection algorithm. Keep this
 *  in sync with the LocalBusiness / Organization schema names. */
export const SITE_NAME = "82Rentals Oy";

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
    // Only emit a self-canonical. Previously we also emitted hreflang
    // annotations (`languages: { fi, en, x-default }`) all pointing at
    // the SAME URL — Search Console reads that as "every page is the
    // alternate variant of itself" and flags each page as "Alternate
    // page with proper canonical tag". The site renders both locales
    // from the same URL via LocaleProvider, so there are no separate
    // per-language URLs to announce.
    alternates: {
      canonical: url,
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
