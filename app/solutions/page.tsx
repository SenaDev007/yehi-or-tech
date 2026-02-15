import { Section, SectionTitle } from "@/components/sections/Section";
import { Building2, GraduationCap, Landmark, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    icon: Building2,
    title: "Pour les entreprises",
    desc: "Centralisation des outils, automatisation et gestion simplifiée.",
  },
  {
    icon: GraduationCap,
    title: "Pour les écoles et centres de formation",
    desc: "Plateformes pédagogiques et gestion administrative numérique.",
  },
  {
    icon: Landmark,
    title: "Pour les administrations",
    desc: "Digitalisation et organisation des services.",
  },
  {
    icon: Rocket,
    title: "Pour entrepreneurs et startups",
    desc: "Création d'outils professionnels évolutifs.",
  },
];

export const metadata = {
  title: "Solutions | YEHI OR Tech",
  description:
    "Cas concrets : école numérique, entreprise connectée, administration digitalisée, infrastructure startup.",
};

export default function SolutionsPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-primary-light/20">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-white sm:text-3xl md:text-4xl">
            Solutions
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-gray-light">
            Des cas concrets pour chaque type d'organisation.
          </p>
        </div>
      </section>

      <Section className="section-container py-12 sm:py-16 md:py-20">
        <SectionTitle
          title="Des solutions adaptées à votre secteur"
          className="mb-12"
        />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {solutions.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-white/10 bg-primary-light/20 p-6"
            >
              <s.icon className="h-10 w-10 text-accent-electric" />
              <h2 className="mt-4 text-lg font-semibold text-neutral-white">
                {s.title}
              </h2>
              <p className="mt-2 text-neutral-gray-light">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild>
            <Link href="/contact">Parlons de votre projet</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
