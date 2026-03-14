import { prisma } from "@/lib/db";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboardPage() {
  const [devisCount, devisNouveaux, messagesCount, messagesNonLus, candidaturesCount, conversationsCount] =
    await Promise.all([
      prisma.demandeDevis.count(),
      prisma.demandeDevis.count({ where: { statut: "NOUVEAU" } }),
      prisma.messageContact.count(),
      prisma.messageContact.count({ where: { statut: "NON_LU" } }),
      prisma.candidature.count(),
      prisma.conversation.count(),
    ]);

  const devisParMois = await prisma.$queryRaw<
    { mois: string; total: number }[]
  >`
    SELECT to_char("createdAt", 'YYYY-MM') as mois, COUNT(*)::int as total
    FROM "DemandeDevis"
    WHERE "createdAt" >= NOW() - INTERVAL '6 months'
    GROUP BY to_char("createdAt", 'YYYY-MM')
    ORDER BY mois ASC
  `.catch(() => []);

  return (
    <DashboardClient
      stats={{
        devisTotal: devisCount,
        devisNouveaux,
        messagesTotal: messagesCount,
        messagesNonLus,
        candidaturesTotal: candidaturesCount,
        conversationsTotal: conversationsCount,
      }}
      devisParMois={devisParMois.map((r) => ({ mois: r.mois, total: Number(r.total) }))}
    />
  );
}
