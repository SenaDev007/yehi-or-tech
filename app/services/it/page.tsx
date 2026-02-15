import { Section, SectionTitle } from "@/components/sections/Section";
import { CheckCircle2 } from "lucide-react";

const prestations = [
  "Installation de postes et réseaux",
  "Maintenance informatique",
  "Assistance technique",
  "Sécurisation de base",
  "Organisation de parc informatique",
];

const cibles = ["Écoles", "PME", "Administrations", "ONG"];

export const metadata = {
  title: "Informatique & IT | YEHI OR Tech",
  description:
    "Maintenance informatique entreprise, gestion de parc, cybersécurité, réseaux, audit système. Pour écoles, PME, administrations et ONG.",
};

export default function ServiceITPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-primary-light/20">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-white sm:text-3xl md:text-4xl">
            Informatique & IT
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-gray-light">
            Nous assurons la mise en place, la maintenance et la sécurisation de votre environnement informatique.
          </p>
        </div>
      </section>

      <Section className="section-container py-12 sm:py-16 md:py-20">
        <SectionTitle title="Prestations" className="mb-8" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {prestations.map((p) => (
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
            title="Cibles"
            subtitle="Nous accompagnons les organisations de toute taille."
            className="mb-6"
          />
          <div className="flex flex-wrap gap-3">
            {cibles.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-neutral-gray-light"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
