import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroImage } from "@/components/ui/HeroImage";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "À propos | YEHI OR Tech",
  description:
    "L'histoire de YEHI OR Tech, agence digitale à Parakou. Mission, vision, valeurs et équipe. יְהִי אוֹר — Que la lumière soit.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <HeroImage src={IMAGES.about.heroBg} height="h-64 sm:h-80 md:h-96" overlayOpacity={70} priority>
        <div className="mx-auto max-w-4xl w-full px-4 text-center">
          <h1 className="font-syne text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            À propos
          </h1>
          <p className="mt-3 sm:mt-4 text-base text-white/85 sm:text-lg">
            Des idées lumineuses, des solutions encore plus brillantes.
          </p>
        </div>
      </HeroImage>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <section className="mb-10 sm:mb-16">
          <h2 className="font-syne text-xl font-semibold text-navy sm:text-2xl">Notre histoire</h2>
          <div className="mt-4 sm:mt-6 flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center">
            <p className="flex-1 text-sm sm:text-base text-gray min-w-0">
              YEHI OR Tech (יְהִי אוֹר — « Que la lumière soit », en référence à Genèse 1:3) est née de la volonté d&apos;apporter la lumière du digital et du branding aux entreprises de Parakou et d&apos;Afrique de l&apos;Ouest. Fondée par AKPOVI TOHOU Sènakpon Dawes, avec AKPOVI Tchognon Stevens comme co-fondateur, l&apos;agence incarne le passage de l&apos;idée à la solution : un hexagone structuré, une bande orbitalaire en mouvement, une ampoule dorée et un éclair.
            </p>
            <Image
              src={IMAGES.about.foundingSpark}
              alt="L'étincelle fondatrice de YEHI OR Tech — יְהִי אוֹר"
              width={600}
              height={450}
              quality={90}
              className="rounded-2xl shadow-xl object-cover w-full md:max-w-sm shrink-0"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </section>

        <section className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-xl border border-blue-lt bg-blue-xl/20 p-4 sm:p-6">
            <Image src={IMAGES.about.iconMission} alt="Mission" width={60} height={60} className="w-12 h-12 sm:w-[60px] sm:h-[60px]" />
            <h3 className="mt-3 sm:mt-4 font-syne text-base sm:text-lg font-semibold text-navy">Mission</h3>
            <p className="mt-2 text-sm sm:text-base text-gray">
              Accompagner les entreprises et institutions dans leur transformation digitale et leur identité de marque, avec des livrables de qualité internationale et une transparence des prix.
            </p>
          </div>
          <div className="rounded-xl border border-blue-lt bg-blue-xl/20 p-4 sm:p-6">
            <Image src={IMAGES.about.iconVision} alt="Vision" width={60} height={60} className="w-12 h-12 sm:w-[60px] sm:h-[60px]" />
            <h3 className="mt-3 sm:mt-4 font-syne text-base sm:text-lg font-semibold text-navy">Vision</h3>
            <p className="mt-2 text-sm sm:text-base text-gray">
              Devenir la référence en agence digitale premium au nord du Bénin et en Afrique de l&apos;Ouest, reconnue pour l&apos;excellence et l&apos;innovation.
            </p>
          </div>
          <div className="rounded-xl border border-blue-lt bg-blue-xl/20 p-4 sm:p-6">
            <Image src={IMAGES.about.iconValeurs} alt="Valeurs" width={60} height={60} className="w-12 h-12 sm:w-[60px] sm:h-[60px]" />
            <h3 className="mt-3 sm:mt-4 font-syne text-base sm:text-lg font-semibold text-navy">Valeurs</h3>
            <p className="mt-2 text-sm sm:text-base text-gray">
              Expertise locale, qualité internationale, transparence tarifaire, satisfaction client et engagement durable.
            </p>
          </div>
        </section>

        <section className="mt-10 sm:mt-16 grid gap-4 sm:gap-8 grid-cols-1 md:grid-cols-2">
          <Image
            src={IMAGES.about.founderSenakpon}
            alt="AKPOVI TOHOU Sènakpon Dawes — Fondateur YEHI OR Tech"
            width={280}
            height={350}
            quality={90}
            className="rounded-2xl object-cover shadow-lg w-full h-auto"
            sizes="(max-width: 768px) 100vw, 280px"
          />
          <Image
            src={IMAGES.about.founderStevens}
            alt="AKPOVI Tchognon Stevens — Co-fondateur YEHI OR Tech"
            width={280}
            height={350}
            quality={90}
            className="rounded-2xl object-cover shadow-lg w-full h-auto"
            sizes="(max-width: 768px) 100vw, 280px"
          />
        </section>

        <section className="mt-10 sm:mt-16 rounded-xl border border-blue-lt bg-blue-xl/20 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
              <Users className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div className="min-w-0">
              <h2 className="font-syne text-lg sm:text-xl font-semibold text-navy">L&apos;équipe</h2>
              <p className="mt-1 text-sm sm:text-base text-gray">
                Découvrez les femmes et hommes qui font YEHI OR Tech au quotidien.
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-6">
            <Button asChild variant="primary" className="shadow-gold-cta min-h-[44px] w-full sm:w-auto">
              <Link href="/equipe">Voir notre équipe</Link>
            </Button>
          </div>
        </section>

        <section className="mt-10 sm:mt-16">
          <h2 className="font-syne text-lg sm:text-xl font-semibold text-navy">Rejoignez-nous</h2>
          <p className="mt-2 text-sm sm:text-base text-gray">
            Vous souhaitez lancer un projet ou rejoindre l&apos;équipe ? Nous sommes à votre écoute.
          </p>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Button asChild variant="primary" className="shadow-gold-cta min-h-[44px] w-full sm:w-auto">
              <Link href="/contact">Nous contacter</Link>
            </Button>
            <Button asChild variant="secondary" className="min-h-[44px] w-full sm:w-auto">
              <Link href="/carriere">Voir les offres</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
