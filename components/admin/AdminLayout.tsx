"use client";

/**
 * Layout admin — Sidebar + zone contenu (masqué sur /admin/login).
 * Design moderne, fond structuré, header mobile avec logo.
 */

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { IMAGES } from "@/lib/images";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#070c1a]">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="relative flex-1 overflow-auto min-w-0 text-white" data-admin-content>
        {/* Fond dégradé discret */}
        <div
          className="pointer-events-none fixed inset-0 -z-10 lg:left-64"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(13, 46, 140, 0.12), transparent 50%), linear-gradient(180deg, #070c1a 0%, #0a0f1e 100%)",
          }}
        />
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-white/10 bg-[#0a0f1e]/90 px-4 backdrop-blur-md lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Image
            src={IMAGES.ui.logo}
            alt="YEHI OR Tech"
            width={90}
            height={27}
            className="h-6 w-auto shrink-0 object-contain"
          />
          <span className="font-syne text-sm font-bold text-white truncate">YEHI OR Tech</span>
          <span className="rounded bg-gold/20 px-1.5 py-0.5 font-syne text-[10px] font-semibold uppercase tracking-wider text-gold">
            Admin
          </span>
        </header>
        {children}
      </main>
    </div>
  );
}
