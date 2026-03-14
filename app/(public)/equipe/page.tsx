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
      <section className="bg-navy px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-syne text-3xl font-bold text-white md:text-5xl">
            Notre équipe
          </h1>
          <p className="mt-4 text-lg text-white/85">
            Les femmes et hommes qui font YEHI OR Tech au quotidien.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {membres.length === 0 ? (
          <div className="rounded-xl border border-blue-lt bg-blue-xl/20 p-8 text-center">
            <p className="text-gray">
              L&apos;équipe sera bientôt présentée ici. En attendant, n&apos;hésitez pas à nous contacter.
            </p>
            <Button asChild variant="primary" className="mt-6 shadow-gold-cta">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {membres.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-blue-lt bg-white p-6 text-center shadow-sm transition hover:shadow-lg"
              >
                <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-gold/30 bg-blue-xl/30 text-2xl font-bold text-gold">
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

        <section className="mt-16 rounded-xl border border-gold/30 bg-gold-lt/50 p-8 text-center">
          <h2 className="font-syne text-xl font-semibold text-navy">
            Rejoindre l&apos;équipe
          </h2>
          <p className="mt-2 text-gray">
            Vous souhaitez nous rejoindre ? Consultez nos offres et postulez.
          </p>
          <Button asChild variant="primary" className="mt-6 shadow-gold-cta">
            <Link href="/carriere">Voir les offres</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
