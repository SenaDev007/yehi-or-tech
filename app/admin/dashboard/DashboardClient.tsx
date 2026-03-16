"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  FileCheck,
  Mail,
  UserPlus,
  MessageCircle,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

type Props = {
  stats: {
    devisTotal: number;
    devisNouveaux: number;
    messagesTotal: number;
    messagesNonLus: number;
    candidaturesTotal: number;
    conversationsTotal: number;
  };
  devisParMois: { mois: string; total: number }[];
};

export default function DashboardClient({ stats, devisParMois }: Props) {
  const cards = [
    {
      label: "Demandes devis",
      value: stats.devisTotal,
      sub: `${stats.devisNouveaux} non traitées`,
      icon: FileCheck,
      href: "/admin/devis",
      accent: stats.devisNouveaux > 0,
    },
    {
      label: "Messages contact",
      value: stats.messagesTotal,
      sub: `${stats.messagesNonLus} non lus`,
      icon: Mail,
      href: "/admin/messages",
      accent: stats.messagesNonLus > 0,
    },
    {
      label: "Candidatures",
      value: stats.candidaturesTotal,
      sub: "",
      icon: UserPlus,
      href: "/admin/candidatures",
    },
    {
      label: "Conversations Elior",
      value: stats.conversationsTotal,
      sub: "",
      icon: MessageCircle,
      href: "/admin/elior",
    },
  ];

  const hasChartData = devisParMois.length > 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-6 sm:mb-8">
        <h1 className="font-syne text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1.5 text-sm text-white/60 sm:text-base">
          Vue d&apos;ensemble du backoffice
        </p>
      </header>

      <section className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, sub, icon: Icon, href, accent }) => (
          <Link
            key={href}
            href={href}
            className={`group relative flex items-start gap-4 rounded-xl border p-5 transition-all duration-200 hover:shadow-lg hover:shadow-black/20 ${
              accent
                ? "border-gold/40 bg-gradient-to-br from-gold/10 to-gold/5 shadow-sm"
                : "border-white/10 bg-white/[0.06] hover:border-white/20"
            }`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                accent ? "bg-gold/25 text-gold" : "bg-white/10 text-gold/80 group-hover:bg-white/15"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 sm:text-sm">
                {label}
              </p>
              <p className="mt-1 font-syne text-2xl font-bold text-white sm:text-3xl tabular-nums">
                {value}
              </p>
              {sub && (
                <p className="mt-0.5 text-xs font-medium text-gold">
                  {sub}
                </p>
              )}
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-6 sm:mt-8">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/20 text-gold">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h2 className="font-syne text-base font-semibold text-white sm:text-lg">
              Demandes de devis (6 derniers mois)
            </h2>
          </div>
          <div className="mt-4 h-52 sm:h-64">
            {hasChartData ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={devisParMois}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="mois" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(10, 15, 30, 0.95)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                    }}
                    labelStyle={{ color: "#fff", fontWeight: 600 }}
                  />
                  <Bar dataKey="total" fill="#F5A800" radius={[6, 6, 0, 0]} name="Demandes" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.02] text-center">
                <BarChart3 className="h-10 w-10 text-white/20" />
                <p className="mt-2 text-sm font-medium text-white/50">Aucune donnée sur la période</p>
                <p className="mt-0.5 text-xs text-white/40">Les demandes apparaîtront ici</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
