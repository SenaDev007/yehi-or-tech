import { Section, SectionTitle } from "@/components/sections/Section";
import { CheckCircle2 } from "lucide-react";

const web = [
  "Sites vitrines",
  "Plateformes SaaS",
  "Systèmes internes entreprises",
  "ERP / CRM",
];
const mobile = [
  "Applications Android",
  "Apps métier",
  "Apps éducatives",
  "Apps financières",
];
const desktop = [
  "Logiciels professionnels",
  "Solutions métiers personnalisées",
];

export const metadata = {
  title: "Développement technologique | YEHI OR Tech",
  description:
    "Sites web, applications web et mobiles, logiciels métiers. Développement sur mesure pour entreprises et institutions.",
};

export default function ServiceDeveloppementPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-primary-light/20">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-white sm:text-3xl md:text-4xl">
            Développement technologique
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-gray-light">
            Nous concevons des solutions logicielles adaptées à vos besoins métiers.
          </p>
        </div>
      </section>

      <Section className="section-container py-12 sm:py-16 md:py-20">
        <SectionTitle title="Web" className="mb-6" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {web.map((p) => (
            <li key={p} className="flex items-center gap-3 text-neutral-gray-light">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-electric" />
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-t border-white/10 bg-primary-dark/30">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <SectionTitle title="Mobile" className="mb-6" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {mobile.map((p) => (
              <li key={p} className="flex items-center gap-3 text-neutral-gray-light">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-electric" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section className="section-container py-12 sm:py-16 md:py-20">
        <SectionTitle title="Logiciels desktop" className="mb-6" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {desktop.map((p) => (
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
