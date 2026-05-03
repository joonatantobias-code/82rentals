import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  metadataBase: new URL("https://82rentals.fi"),
  title: {
    default: "82Rentals, Vesijetin vuokraus Helsingissä | Sea-Doo Spark Trixx",
    template: "%s | 82Rentals",
  },
  description:
    "Vuokraa Sea-Doo Spark Trixx -vesijetti Helsingissä. Toimitamme sen sinulle minne tahansa kaupungissa. Varaa verkossa, helppoa, nopeaa, unohtumatonta.",
  keywords: [
    "vesijetin vuokraus Helsinki",
    "vesijetti vuokraus Helsinki",
    "Sea-Doo Spark Trixx",
    "vesijetti Suomi",
    "82rentals",
    "vesiskootteri vuokraus",
  ],
  openGraph: {
    title: "82Rentals, Vesijetin vuokraus Helsingissä",
    description:
      "Vuokraa Sea-Doo Spark Trixx ja aja minne tahansa Helsingissä. Me toimitamme sen sinulle.",
    url: "https://82rentals.fi",
    siteName: "82Rentals",
    locale: "fi_FI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "82Rentals, Vesijetin vuokraus Helsingissä",
    description:
      "Vuokraa Sea-Doo Spark Trixx ja aja minne tahansa Helsingissä. Me toimitamme sen sinulle.",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A3D62",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans bg-brand-bg text-brand-text antialiased overflow-x-clip">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
