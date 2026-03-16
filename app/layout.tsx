import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yehiortech.com";

export const metadata: Metadata = {
  title: {
    default: "YEHI OR Tech — Agence Digitale à Parakou, Bénin",
    template: "%s | YEHI OR Tech",
  },
  description:
    "Agence digitale à Parakou, Bénin. Branding, sites web, impression et crédibilité digitale. Des idées lumineuses, des solutions encore plus brillantes.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "fr_BJ",
    url: BASE_URL,
    siteName: "YEHI OR Tech",
    title: "YEHI OR Tech — Agence Digitale Parakou, Bénin",
    description:
      "Branding · Sites Web · Impression · Crédibilité Digitale. Des idées lumineuses, des solutions encore plus brillantes.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "YEHI OR Tech — Agence Digitale à Parakou, Bénin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YEHI OR Tech — Agence Digitale Parakou, Bénin",
    description:
      "Branding · Sites Web · Impression · Crédibilité Digitale.",
    images: ["/images/og-default.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/images/favicon.png",
    shortcut: "/images/favicon-32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
