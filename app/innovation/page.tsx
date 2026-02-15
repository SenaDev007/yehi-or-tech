import { Section, SectionTitle } from "@/components/sections/Section";
import { Cpu, Cloud, Database, Globe, Box } from "lucide-react";

const roadmap = [
  {
    icon: Globe,
    title: "Réseaux sociaux souverains",
    desc: "Plateformes de communication et collaboration souveraines.",
  },
  {
    icon: Cpu,
    title: "OS LUX",
    desc: "Système d'exploitation et écosystème logiciel.",
  },
  {
    icon: Cloud,
    title: "Cloud africain",
    desc: "Infrastructures cloud régionales et fiables.",
  },
  {
    icon: Database,
    title: "Data centers",
    desc: "Centres de données et hébergement de proximité.",
  },
  {
    icon: Box,
    title: "Hardware",
    desc: "Ordinateurs YEHI OR, serveurs, terminaux éducatifs, matériel professionnel.",
  },
];

export const metadata = {
  title: "Innovation & R&D | YEHI OR Tech",
  description:
    "Vision et feuille de route technologique : systèmes intelligents, infrastructures souveraines, R&D.",
};

export default function InnovationPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-primary-light/20">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-electric/30 bg-accent-electric/10 px-4 py-1.5 text-sm text-accent-electric">
            Vision & R&D
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-white sm:text-3xl md:text-4xl">
            Innovation
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-gray-light">
            YEHI OR Tech mène également des recherches sur des solutions technologiques avancées visant à améliorer durablement l'accès aux outils numériques.
          </p>
          <p className="mt-3 text-neutral-gray">
            Ces projets s'inscrivent dans une vision à long terme et feront l'objet de déploiements progressifs. Ils ne sont pas présentés comme des produits disponibles aujourd'hui.
          </p>
        </div>
      </section>

      <Section className="section-container py-12 sm:py-16 md:py-20">
        <SectionTitle
          title="Nos travaux portent sur"
          subtitle="Systèmes intelligents, infrastructures numériques avancées, plateformes collaboratives évolutives."
          className="mb-12"
        />
        <div className="space-y-4">
          {roadmap.map((item, i) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl border border-white/10 bg-primary-light/20 p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-electric/20 text-accent-electric">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-white">
                  {item.title}
                </h2>
                <p className="mt-1 text-neutral-gray-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-lg border border-white/10 bg-primary-dark/50 p-4 text-sm text-neutral-gray">
          La fabrication d'appareils (ordinateurs YEHI OR, serveurs, terminaux éducatifs) est en préparation et fera l'objet d'annonces lorsque les produits seront prêts.
        </p>
      </Section>
    </>
  );
}
