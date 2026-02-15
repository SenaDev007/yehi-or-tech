import { Section, SectionTitle } from "@/components/sections/Section";
import { CheckCircle2 } from "lucide-react";

const disponible = [
  "Agents IA entreprise",
  "Automatisation",
  "Chatbots",
  "Traitement de données",
];
const rd = [
  "IA éducative",
  "IA métier",
  "Assistants professionnels",
];

export const metadata = {
  title: "Intelligence Artificielle | YEHI OR Tech",
  description:
    "Chatbots, automatisation, assistants IA entreprise. Solutions d'intelligence artificielle opérationnelles.",
};

export default function ServiceIAPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-primary-light/20">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-white sm:text-3xl md:text-4xl">
            Intelligence Artificielle & Automatisation
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-gray-light">
            Nous intégrons des outils intelligents pour améliorer votre productivité.
          </p>
        </div>
      </section>

      <Section className="section-container py-12 sm:py-16 md:py-20">
        <SectionTitle
          title="Disponible"
          subtitle="Prestations opérationnelles aujourd'hui."
          className="mb-8"
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {disponible.map((p) => (
            <li key={p} className="flex items-center gap-3 text-neutral-gray-light">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-electric" />
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-t border-white/10 bg-primary-dark/30">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <SectionTitle
            title="R&D"
            subtitle="Projets en cours de recherche et développement."
            className="mb-8"
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {rd.map((p) => (
              <li key={p} className="flex items-center gap-3 text-neutral-gray">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-neutral-gray" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
