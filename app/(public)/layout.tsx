/**
 * Layout public — Header + Footer + WhatsApp + Cookie banner.
 * Widget Elior (ChatWidget) sera ajouté en Phase 6.
 * CDC v1.4
 */

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CookieBanner from "@/components/layout/CookieBanner";
import ChatWidget from "@/components/layout/ChatWidget";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <ChatWidget />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}
