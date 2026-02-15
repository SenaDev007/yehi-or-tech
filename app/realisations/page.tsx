import { Section, SectionTitle } from "@/components/sections/Section";
import { Globe, Layout, Palette, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const exemples = [
  { icon: Globe, title: "Plateformes web professionnelles" },
  { icon: Layout, title: "Solutions internes d'organisation" },
  { icon: MessageSquare, title: "Systèmes de communication numériques" },
  { icon: Palette, title: "Identités visuelles complètes" },
];

export const metadata = {
  title: "Réalisations | YEHI OR Tech",
  description:
    "Exemples de projets : plateformes web, solutions internes, identités visuelles.",
};

export default function RealisationsPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-primary-light/20">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-white sm:text-3xl md:text-4xl">
            Réalisations
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-gray-light">
            Quelques exemples de projets. Cette section sera enrichie au fur et à mesure.
          </p>
        </div>
      </section>

      <Section className="section-container py-12 sm:py-16 md:py-20">
        <SectionTitle title="Exemples de projets" className="mb-12" />
        <div className="grid gap-6 sm:grid-cols-2">
          {exemples.map((e) => (
            <div
              key={e.title}
              className="flex gap-4 rounded-xl border border-white/10 bg-primary-light/20 p-6"
            >
              <e.icon className="h-10 w-10 shrink-0 text-accent-electric" />
              <div>
                <h2 className="text-lg font-semibold text-neutral-white">
                  {e.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild>
            <Link href="/contact">Discuter d'un projet similaire</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
