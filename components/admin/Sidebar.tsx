"use client";

/**
 * Sidebar admin — fond navy, liens modules, accent or.
 * CDC v1.4
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenTool,
  FolderKanban,
  FileText,
  MessageSquare,
  Users,
  MessageCircle,
  FileCheck,
  Mail,
  UserPlus,
  Newspaper,
  Settings,
  UserCog,
  LogOut,
} from "lucide-react";

const ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: PenTool },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/temoignages", label: "Témoignages", icon: MessageSquare },
  { href: "/admin/equipe", label: "Équipe", icon: Users },
  { href: "/admin/elior", label: "Elior IA", icon: MessageCircle },
  { href: "/admin/devis", label: "Demandes devis", icon: FileCheck },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/candidatures", label: "Candidatures", icon: UserPlus },
  { href: "/admin/newsletter", label: "Newsletter", icon: Newspaper },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: UserCog },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-white/10 bg-navy">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-4">
        <span className="font-syne text-lg font-bold text-gold">YEHI OR</span>
        <span className="text-sm text-white/70">Admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-0.5 px-2">
          {ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-gold/20 text-gold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-white/10 p-2">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  );
}
