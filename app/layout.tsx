import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "YEHI OR Tech — Des idées lumineuses, des solutions encore plus brillantes",
  description:
    "Agence de branding, création web & impression — Parakou, Bénin",
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
