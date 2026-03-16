import type { Metadata } from "next";
import Link from "next/link";
import { getMembres } from "@/lib/equipe";
import { Button } from "@/components/ui/Button";
import { Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "Notre équipe | YEHI OR Tech",
  description:
    "Découvrez l'équipe YEHI OR Tech : fondateurs et collaborateurs à Parakou, Bénin.",
};

export default async function EquipePage() {
  const membres = await getMembres();

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <section className="bg-navy px-4 py-10 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-syne text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            Notre équipe
          </h1>
          <p className="mt-3 sm:mt-4 text-base text-white/85 sm:text-lg">
            Les femmes et hommes qui font YEHI OR Tech au quotidien.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {membres.length === 0 ? (
          <div className="rounded-xl border border-blue-lt bg-blue-xl/20 p-4 sm:p-8 text-center">
            <p className="text-sm sm:text-base text-gray">
              L&apos;équipe sera bientôt présentée ici. En attendant, n&apos;hésitez pas à nous contacter.
            </p>
            <Button asChild variant="primary" className="mt-4 sm:mt-6 shadow-gold-cta min-h-[44px] w-full sm:w-auto">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {membres.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-blue-lt bg-white p-4 sm:p-6 text-center shadow-sm transition hover:shadow-lg"
              >
                <div className="mx-auto flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-full border-2 border-gold/30 bg-blue-xl/30 text-xl sm:text-2xl font-bold text-gold">
                  {m.photo ? (
                    <img src={m.photo} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span>{m.prenom[0]}{m.nom[0]}</span>
                  )}
                </div>
                <h2 className="mt-4 font-syne text-lg font-semibold text-navy">
                  {m.prenom} {m.nom}
                </h2>
                <p className="text-gold">{m.role}</p>
                {m.bio && <p className="mt-2 text-sm text-gray">{m.bio}</p>}
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm text-blue hover:underline"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" /> LinkedIn
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <section className="mt-10 sm:mt-16 rounded-xl border border-gold/30 bg-gold-lt/50 p-4 sm:p-6 md:p-8 text-center">
          <h2 className="font-syne text-lg sm:text-xl font-semibold text-navy">
            Rejoindre l&apos;équipe
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray">
            Vous souhaitez nous rejoindre ? Consultez nos offres et postulez.
          </p>
          <Button asChild variant="primary" className="mt-4 sm:mt-6 shadow-gold-cta min-h-[44px] w-full sm:w-auto">
            <Link href="/carriere">Voir les offres</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
