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
    default: "82Rentals · Vesijetin vuokraus Helsingissä | Sea-Doo Spark Trixx",
    template: "%s · 82Rentals",
  },
  description:
    "Vuokraa Sea-Doo Spark Trixx -vesijetti Helsingissä. Tuomme sen suoraan rantaan tai laituriin. Varaa verkossa minuutissa, hinnat alkaen 119 €.",
  applicationName: SITE_NAME,
  keywords: [
    "vesijetin vuokraus",
    "vesijetti Helsinki",
    "jet ski rental Helsinki",
    "Sea-Doo Spark Trixx",
    "82Rentals",
    "watercraft rental Finland",
    "vesiskootteri vuokraus",
    "personal watercraft Finland",
    "vesijetti vuokraus Helsinki",
    "jetski Helsinki",
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
    title: "82Rentals · Vesijetin vuokraus Helsingissä",
    description:
      "Sea-Doo Spark Trixx vesijetti, toimitus haluamaasi rantaan Helsingissä. Hinnat alkaen 119 €.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "fi_FI",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "82Rentals · Vesijetin vuokraus Helsingissä",
    description:
      "Sea-Doo Spark Trixx vesijetti, toimitus haluamaasi rantaan Helsingissä.",
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
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "82Rentals Oy",
  alternateName: "82Rentals",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  telephone: "+358401866664",
  email: "82rentals.info@gmail.com",
  priceRange: "€€",
  description:
    "Vesijetin vuokraus Helsingissä. Sea-Doo Spark Trixx, toimitus haluamaasi rantaan tai laituriin.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Helsinki",
    addressCountry: "FI",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 60.1699,
    longitude: 24.9384,
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
      opens: "10:00",
      closes: "20:00",
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
      name: "1 tunnin vuokra",
      price: "119",
      priceCurrency: "EUR",
    },
    {
      "@type": "Offer",
      name: "2 tunnin vuokra",
      price: "199",
      priceCurrency: "EUR",
    },
    {
      "@type": "Offer",
      name: "Puoli päivää (4 h)",
      price: "349",
      priceCurrency: "EUR",
    },
    {
      "@type": "Offer",
      name: "Koko päivä (8 h)",
      price: "599",
      priceCurrency: "EUR",
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
