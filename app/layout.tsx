import type { Metadata, Viewport } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { site } from "@/lib/content";
import "./globals.css";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["600", "700"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-body",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  applicationName: site.brandLatin,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "ar_DZ",
    siteName: site.title,
    title: site.title,
    description: site.description,
    url: "/",
    images: [
      {
        url: "/hero-wheat.webp",
        width: 1920,
        height: 1200,
        alt: site.ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/hero-wheat.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#0F4D2A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${alexandria.variable} ${plexArabic.variable}`}
    >
      <body>
        <noscript>
          <style>{`
            [data-reveal], .hero-anim { opacity: 1 !important; transform: none !important; }
            [data-rule] { transform: scaleX(1) !important; }
            .hero-photo { transform: none !important; }
          `}</style>
        </noscript>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
