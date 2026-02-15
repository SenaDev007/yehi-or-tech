import { Section, SectionTitle } from "@/components/sections/Section";
import { CheckCircle2 } from "lucide-react";

const design = [
  "Branding",
  "Identité visuelle",
  "UI/UX",
  "Supports marketing",
];
const impression = [
  "Flyers",
  "Affiches",
  "Panneaux",
  "Supports entreprise",
  "Grand format",
];

export const metadata = {
  title: "Design & Impression | YEHI OR Tech",
  description:
    "Identité visuelle, logos, chartes graphiques, supports publicitaires et impression professionnelle.",
};

export default function ServiceDesignPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-primary-light/20">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-white sm:text-3xl md:text-4xl">
            Design & Impression
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-gray-light">
            Nous créons votre image et vos supports de communication.
          </p>
        </div>
      </section>

      <Section className="section-container py-12 sm:py-16 md:py-20">
        <SectionTitle title="Design" className="mb-6" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {design.map((p) => (
            <li key={p} className="flex items-center gap-3 text-neutral-gray-light">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-electric" />
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-t border-white/10 bg-primary-dark/30">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <SectionTitle title="Impression" className="mb-6" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {impression.map((p) => (
              <li key={p} className="flex items-center gap-3 text-neutral-gray-light">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-electric" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
