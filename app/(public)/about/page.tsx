import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "À propos | YEHI OR Tech",
  description:
    "L'histoire de YEHI OR Tech, agence digitale à Parakou. Mission, vision, valeurs et équipe. יְהִי אוֹר — Que la lumière soit.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <section className="bg-navy px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-syne text-3xl font-bold text-white md:text-5xl">
            À propos
          </h1>
          <p className="mt-4 text-lg text-white/85">
            Des idées lumineuses, des solutions encore plus brillantes.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <section className="mb-16">
          <h2 className="font-syne text-2xl font-semibold text-navy">Notre histoire</h2>
          <p className="mt-4 text-gray">
            YEHI OR Tech (יְהִי אוֹר — « Que la lumière soit », en référence à Genèse 1:3) est née de la volonté d&apos;apporter la lumière du digital et du branding aux entreprises de Parakou et d&apos;Afrique de l&apos;Ouest. Fondée par AKPOVI TOHOU Sènakpon Dawes, avec AKPOVI Tchognon Stevens comme co-fondateur, l&apos;agence incarne le passage de l&apos;idée à la solution : un hexagone structuré, une bande orbitalaire en mouvement, une ampoule dorée et un éclair.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-blue-lt bg-blue-xl/20 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/20 text-gold">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-syne text-lg font-semibold text-navy">Mission</h3>
            <p className="mt-2 text-gray">
              Accompagner les entreprises et institutions dans leur transformation digitale et leur identité de marque, avec des livrables de qualité internationale et une transparence des prix.
            </p>
          </div>
          <div className="rounded-xl border border-blue-lt bg-blue-xl/20 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/20 text-gold">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-syne text-lg font-semibold text-navy">Vision</h3>
            <p className="mt-2 text-gray">
              Devenir la référence en agence digitale premium au nord du Bénin et en Afrique de l&apos;Ouest, reconnue pour l&apos;excellence et l&apos;innovation.
            </p>
          </div>
          <div className="rounded-xl border border-blue-lt bg-blue-xl/20 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/20 text-gold">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-syne text-lg font-semibold text-navy">Valeurs</h3>
            <p className="mt-2 text-gray">
              Expertise locale, qualité internationale, transparence tarifaire, satisfaction client et engagement durable.
            </p>
          </div>
        </section>

        <section className="mt-16 rounded-xl border border-blue-lt bg-blue-xl/20 p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-gold">
              <Users className="h-7 w-7" />
            </div>
            <div>
              <h2 className="font-syne text-xl font-semibold text-navy">L&apos;équipe</h2>
              <p className="mt-1 text-gray">
                Découvrez les femmes et hommes qui font YEHI OR Tech au quotidien.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Button asChild variant="primary" className="shadow-gold-cta">
              <Link href="/equipe">Voir notre équipe</Link>
            </Button>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-syne text-xl font-semibold text-navy">Rejoignez-nous</h2>
          <p className="mt-2 text-gray">
            Vous souhaitez lancer un projet ou rejoindre l&apos;équipe ? Nous sommes à votre écoute.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild variant="primary" className="shadow-gold-cta">
              <Link href="/contact">Nous contacter</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/carriere">Voir les offres</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
