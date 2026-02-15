import { Section, SectionTitle } from "@/components/sections/Section";
import { Target, Eye, Heart, Shield } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Clarté",
    desc: "des solutions compréhensibles",
  },
  {
    icon: Shield,
    title: "Fiabilité",
    desc: "des systèmes stables",
  },
  {
    icon: Eye,
    title: "Évolutivité",
    desc: "des technologies durables",
  },
  {
    icon: Heart,
    title: "Accompagnement",
    desc: "un partenaire sur la durée",
  },
];

export const metadata = {
  title: "Entreprise | YEHI OR Tech",
  description:
    "YEHI OR Tech : vision, mission et valeurs. Une entreprise d'ingénierie technologique dédiée aux solutions numériques professionnelles.",
};

export default function EntreprisePage() {
  return (
    <>
      <section className="border-b border-white/10 bg-primary-light/20">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-white sm:text-3xl md:text-4xl">
            Qui sommes-nous
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-gray-light">
            YEHI OR Tech est une entreprise technologique dédiée à la conception et à la mise en œuvre de solutions numériques professionnelles.
          </p>
          <p className="mt-3 text-neutral-gray-light">
            Nous combinons ingénierie informatique, développement logiciel et automatisation pour aider les organisations à améliorer leur efficacité et leur performance.
          </p>
        </div>
      </section>

      <Section className="section-container py-12 sm:py-16 md:py-20">
        <SectionTitle
          title="Notre vision"
          subtitle="Construire des systèmes technologiques fiables capables d'accompagner durablement la croissance des entreprises et institutions."
        />
      </Section>

      <section className="border-y border-white/10 bg-primary-dark/30">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <SectionTitle
            title="Notre mission"
            subtitle="Permettre aux structures de toutes tailles d'accéder à des solutions numériques performantes sans complexité inutile."
          />
        </div>
      </section>

      <Section className="section-container py-12 sm:py-16 md:py-20">
        <SectionTitle title="Nos valeurs" className="mb-10" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-white/10 bg-primary-light/20 p-6"
            >
              <v.icon className="h-10 w-10 text-accent-electric" />
              <h3 className="mt-3 text-lg font-semibold text-neutral-white">
                {v.title}
              </h3>
              <p className="mt-1 text-neutral-gray-light">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="border-t border-white/10">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <p className="max-w-2xl text-center text-neutral-gray-light md:text-lg">
            Nous ne nous présentons pas comme une agence web. Nous sommes une{" "}
            <strong className="text-neutral-white">entreprise d'ingénierie technologique</strong>.
          </p>
        </div>
      </section>
    </>
  );
}
