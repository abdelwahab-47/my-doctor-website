import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { LocaleProvider } from "@/lib/i18n";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
});

const metaTitle = "My Doctor · طبيبي — Connected health platform for Algeria";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: metaTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "My Doctor",
    "طبيبي",
    "healthcare platform Algeria",
    "clinic queue management",
    "patient appointment app",
    "digital health Algeria",
    "Firebase healthcare",
    "Flutter",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: metaTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f6fb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${spaceGrotesk.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen bg-lbg">
        <LocaleProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}