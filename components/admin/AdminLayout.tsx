"use client";

/**
 * Layout admin — Sidebar + zone contenu (masqué sur /admin/login).
 * CDC v1.4
 */

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#0A0F1E]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
