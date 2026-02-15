import { Section, SectionTitle } from "@/components/sections/Section";
import { CheckCircle2 } from "lucide-react";

const prestations = [
  "Hébergement web",
  "Serveurs privés",
  "Stockage cloud",
  "Email professionnel",
  "Sauvegarde entreprise",
  "Infrastructure dédiée",
];

export const metadata = {
  title: "Cloud & Hébergement | YEHI OR Tech",
  description:
    "Hébergement web, serveurs, stockage cloud, emails professionnels, sauvegarde. Infrastructures numériques accessibles et fiables.",
};

export default function ServiceCloudPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-primary-light/20">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-white sm:text-3xl md:text-4xl">
            Cloud & Hébergement
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-gray-light">
            Nous mettons en place des infrastructures numériques accessibles et fiables.
          </p>
          <p className="mt-2 text-sm text-accent-electric">
            Positionnement stratégique majeur pour votre activité.
          </p>
        </div>
      </section>

      <Section className="section-container py-12 sm:py-16 md:py-20">
        <SectionTitle title="Offres" className="mb-8" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {prestations.map((p) => (
            <li key={p} className="flex items-center gap-3 text-neutral-gray-light">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-electric" />
              {p}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
