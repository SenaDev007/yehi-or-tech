import type { Metadata } from "next";
import Link from "next/link";
import { getOffres } from "@/lib/career";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Briefcase, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Carrière | YEHI OR Tech",
  description:
    "Rejoignez YEHI OR Tech à Parakou. Offres de stage et d'emploi, candidature spontanée.",
};

export default async function CarrierePage() {
  const offres = await getOffres(true);

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <section className="bg-navy px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-syne text-3xl font-bold text-white md:text-5xl">
            Carrière
          </h1>
          <p className="mt-4 text-lg text-white/85">
            Rejoignez une équipe passionnée par le digital et la création.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {offres.length === 0 ? (
          <div className="rounded-xl border border-blue-lt bg-blue-xl/20 p-8 text-center">
            <p className="text-gray">
              Aucune offre ouverte pour le moment. Envoyez-nous une candidature spontanée.
            </p>
            <Button asChild variant="primary" className="mt-6 shadow-gold-cta">
              <Link href="/carriere/candidater">Déposer une candidature</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {offres.map((o) => (
              <Card key={o.id} hover>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="font-syne text-xl font-semibold text-navy">
                        {o.titre}
                      </h2>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" /> {o.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {o.modalite}
                        </span>
                        {o.expiresAt && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Expire le {formatDate(o.expiresAt)}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge variant={o.permanente ? "success" : "default"}>
                      {o.permanente ? "Permanent" : "Limitée"}
                    </Badge>
                  </div>
                  <p className="mt-4 line-clamp-2 text-gray">{o.description}</p>
                  <Button asChild variant="secondary" className="mt-4">
                    <Link href={`/carriere/candidater?poste=${encodeURIComponent(o.titre)}&type=${encodeURIComponent(o.type)}`}>
                      Postuler
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <section className="mt-16 rounded-xl border border-blue-lt bg-blue-xl/20 p-8">
          <h2 className="font-syne text-xl font-semibold text-navy">
            Candidature spontanée
          </h2>
          <p className="mt-2 text-gray">
            Vous ne trouvez pas d&apos;offre correspondante ? Envoyez-nous votre CV et lettre de motivation.
          </p>
          <Button asChild variant="primary" className="mt-4 shadow-gold-cta">
            <Link href="/carriere/candidater?poste=Candidature spontanée&type=Candidature spontanée">Déposer une candidature</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
