import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Title is the single most weighted SEO signal. Brand owner
    // wants the service keyword + city leading, with the brand
    // name kept short and trailing — no model name or English
    // long-tail in the SERP title, since the previous variant
    // (which included "Sea-Doo Spark Trixx") was getting picked
    // up by Google as the result title.
    default: "Vesijettivuokraus Helsinki - 82Rentals Oy",
    template: "%s | Vesijettivuokraus Helsinki - 82Rentals Oy",
  },
  description:
    "Vuokraa vesijetti Helsingissä helposti netistä. Lähtö Kipparlahden satamasta tai ilmainen toimitus pääkaupunkiseudulle. Polttoaine, pelastusliivit ja vakuutus aina hintaan. Avajaistarjous: 1h 119 €, 2h 199 €, 3h 279 €. Jet ski rental in Helsinki — book online.",
  applicationName: SITE_NAME,
  keywords: [
    "vesijettivuokraus Helsinki",
    "vesijetin vuokraus Helsinki",
    "vesijetti vuokraus Helsinki",
    "vesijetti Helsinki",
    "vesijettivuokraus",
    "vesiskootteri vuokraus Helsinki",
    "jet ski rental Helsinki",
    "jetski rental Helsinki",
    "jetski Helsinki",
    "rent jet ski Helsinki",
    "watercraft rental Helsinki",
    "vesiurheilu Helsinki",
    "vesijetti Kipparlahti",
    "Helsinki jet ski",
    "82Rentals",
  ],
  authors: [{ name: "82Rentals Oy" }],
  creator: "82Rentals Oy",
  publisher: "82Rentals Oy",
  alternates: {
    canonical: SITE_URL,
    languages: {
      fi: SITE_URL,
      en: SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    title: "Vesijettivuokraus Helsinki - 82Rentals Oy",
    description:
      "Vesijetin vuokraus Helsingissä. Lähtö Kipparlahden satamasta tai ilmainen toimitus pääkaupunkiseudulle. Polttoaine ja vakuutus aina hintaan. Avajaistarjous alkaen 119 €.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "fi_FI",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "82Rentals — Vesijettivuokraus Helsinki",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vesijettivuokraus Helsinki - 82Rentals Oy",
    description:
      "Vesijetin vuokraus Helsingissä. Lähtö Kipparlahden satamasta, polttoaine ja vakuutus sisältyy. Avajaistarjous alkaen 119 €.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Watercraft Rental",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A3D62",
  width: "device-width",
  initialScale: 1,
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  // SportsActivityLocation + LocalBusiness gives Google two strong
  // schema signals at once: we're a place you can do an activity,
  // and we're a business with hours, price range, geo, etc. Both
  // surface useful rich-result UI in SERP.
  "@type": ["LocalBusiness", "SportsActivityLocation"],
  "@id": `${SITE_URL}/#business`,
  name: "82Rentals Oy",
  alternateName: ["82Rentals", "Vesijettivuokraus Helsinki", "Jet Ski Rental Helsinki"],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: [`${SITE_URL}/logo.png`, `${SITE_URL}/Aloitusvideo-poster.jpg`],
  telephone: "+358401866664",
  email: "82rentals.info@gmail.com",
  priceRange: "€€",
  description:
    "Vesijetin vuokraus Helsingissä Kipparlahden satamasta. Polttoaine, pelastusliivit ja vakuutus aina hintaan. Helppo online-varaus. Jet ski rental in Helsinki — book online.",
  slogan: "Vesijettivuokraus Helsinki · Jet Ski Rental Helsinki",
  knowsLanguage: ["fi", "en"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kipparlahdenkuja 3",
    postalCode: "00810",
    addressLocality: "Helsinki",
    addressRegion: "Uusimaa",
    addressCountry: "FI",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 60.1909,
    longitude: 25.0224,
  },
  // Reviews summary so search results can display the gold-star
  // rich snippet. Counts the 18 visible 5-star cards plus the
  // hidden 4-star review for an accurate average.
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: 19,
    bestRating: "5",
    worstRating: "1",
  },
  areaServed: {
    "@type": "City",
    name: "Helsinki",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "22:00",
      validFrom: "2026-05-01",
      validThrough: "2026-09-30",
    },
  ],
  sameAs: [
    "https://instagram.com/82rentals",
    "https://www.tiktok.com/@82rentals",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      name: "1 tunnin vuokra (polttoaine sisältyy)",
      price: "119",
      priceCurrency: "EUR",
      url: `${SITE_URL}/varaa`,
    },
    {
      "@type": "Offer",
      name: "2 tunnin vuokra (polttoaine sisältyy)",
      price: "199",
      priceCurrency: "EUR",
      url: `${SITE_URL}/varaa`,
    },
    {
      "@type": "Offer",
      name: "3 tunnin vuokra (polttoaine sisältyy)",
      price: "279",
      priceCurrency: "EUR",
      url: `${SITE_URL}/varaa`,
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#business` },
  inLanguage: ["fi-FI", "en-US"],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "82Rentals Oy",
  alternateName: "82Rentals",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [
    "https://instagram.com/82rentals",
    "https://www.tiktok.com/@82rentals",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+358401866664",
      email: "82rentals.info@gmail.com",
      contactType: "customer service",
      areaServed: "FI",
      availableLanguage: ["fi", "en"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <JsonLd data={localBusinessJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={organizationJsonLd} />
      </head>
      <body className="font-sans bg-brand-bg text-brand-text antialiased overflow-x-clip">
        <LocaleProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
