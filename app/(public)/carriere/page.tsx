import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getOffres } from "@/lib/career";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { HeroImage } from "@/components/ui/HeroImage";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Carrière | YEHI OR Tech",
  description:
    "Rejoignez YEHI OR Tech à Parakou. Offres de stage et d'emploi, candidature spontanée.",
  openGraph: {
    images: [{ url: "/images/og-carriere.jpg", width: 1200, height: 630 }],
  },
};

export default async function CarrierePage() {
  const offres = await getOffres(true);

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <HeroImage src={IMAGES.carriere.teamAmbiance} height="h-64 sm:h-80 md:h-96" overlayOpacity={65} priority>
        <div className="mx-auto max-w-6xl w-full px-4 text-center">
          <h1 className="font-syne text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            Carrière
          </h1>
          <p className="mt-3 sm:mt-4 text-base text-white/85 sm:text-lg">
            Rejoignez une équipe passionnée par le digital et la création.
          </p>
        </div>
      </HeroImage>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {offres.length === 0 ? (
          <div className="rounded-xl border border-blue-lt bg-blue-xl/20 p-4 sm:p-8 text-center">
            <p className="text-sm sm:text-base text-gray">
              Aucune offre ouverte pour le moment. Envoyez-nous une candidature spontanée.
            </p>
            <Button asChild variant="primary" className="mt-4 sm:mt-6 shadow-gold-cta min-h-[44px] w-full sm:w-auto">
              <Link href="/carriere/candidater">Déposer une candidature</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {offres.map((o) => (
              <Card key={o.id} hover>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <h2 className="font-syne text-lg sm:text-xl font-semibold text-navy">
                        {o.titre}
                      </h2>
                      <div className="mt-2 flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray">
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
                  <p className="mt-3 sm:mt-4 line-clamp-2 text-sm sm:text-base text-gray">{o.description}</p>
                  <Button asChild variant="secondary" className="mt-4 min-h-[44px] w-full sm:w-auto">
                    <Link href={`/carriere/candidater?poste=${encodeURIComponent(o.titre)}&type=${encodeURIComponent(o.type)}`}>
                      Postuler
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <section className="mt-10 sm:mt-16 flex flex-col items-center gap-4 sm:gap-6 rounded-xl border border-blue-lt bg-blue-xl/20 p-4 sm:p-6 md:p-8 md:flex-row md:items-center">
          <Image
            src={IMAGES.carriere.jobsIllustration}
            alt="Rejoignez l'équipe YEHI OR Tech"
            width={400}
            height={280}
            className="shrink-0 rounded-lg object-cover w-full md:w-auto max-w-sm"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="text-center md:text-left min-w-0">
            <h2 className="font-syne text-lg sm:text-xl font-semibold text-navy">
              Candidature spontanée
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray">
              Vous ne trouvez pas d&apos;offre correspondante ? Envoyez-nous votre CV et lettre de motivation.
            </p>
            <Button asChild variant="primary" className="mt-4 shadow-gold-cta min-h-[44px] w-full sm:w-auto">
              <Link href="/carriere/candidater?poste=Candidature spontanée&type=Candidature spontanée">Déposer une candidature</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
