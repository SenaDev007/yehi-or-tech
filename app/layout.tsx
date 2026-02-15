import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YEHI OR Tech | Ingénierie technologique & solutions numériques",
  description:
    "YEHI OR Tech accompagne les entreprises et institutions dans la conception, le développement et la gestion de solutions technologiques fiables et évolutives.",
  keywords: [
    "technologie",
    "développement",
    "cloud",
    "informatique",
    "Afrique",
    "solutions numériques",
  ],
  openGraph: {
    title: "YEHI OR Tech | Ingénierie technologique",
    description:
      "Des idées lumineuses, des solutions encore plus brillantes. Solutions technologiques fiables et évolutives.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={plusJakarta.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-primary overflow-x-hidden">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
