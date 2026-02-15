import Link from "next/link";
import { Server, Code, Cloud, Palette, Bot } from "lucide-react";
import { SectionTitle } from "@/components/sections/Section";

const services = [
  {
    href: "/services/it",
    title: "Informatique & IT",
    desc: "Maintenance, réseaux, assistance technique, cybersécurité de base.",
    icon: Server,
  },
  {
    href: "/services/developpement",
    title: "Développement technologique",
    desc: "Sites web, applications web et mobiles, logiciels métiers.",
    icon: Code,
  },
  {
    href: "/services/cloud",
    title: "Cloud & Hébergement",
    desc: "Hébergement web, emails professionnels, sauvegarde, serveurs.",
    icon: Cloud,
  },
  {
    href: "/services/design",
    title: "Design & Impression",
    desc: "Identité visuelle, supports de communication, impression professionnelle.",
    icon: Palette,
  },
  {
    href: "/services/ia",
    title: "Intelligence Artificielle",
    desc: "Chatbots, automatisation, assistants IA entreprise.",
    icon: Bot,
  },
];

export const metadata = {
  title: "Services | YEHI OR Tech",
  description:
    "Services technologiques : IT, développement, cloud, design et IA. Solutions professionnelles pour entreprises et institutions.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-primary-light/20">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-white sm:text-3xl md:text-4xl">
            Nos services
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-gray-light">
            Des prestations opérationnelles aujourd'hui, pour des organisations plus efficaces.
          </p>
        </div>
      </section>

      <section className="section-container py-12 sm:py-16 md:py-20">
        <SectionTitle
          title="Domaines d'intervention"
          subtitle="Chaque service dispose d'une page détaillée. Cliquez pour en savoir plus."
          className="mb-12"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex gap-4 rounded-xl border border-white/10 bg-primary-light/20 p-6 transition-colors hover:border-accent-electric/30 hover:bg-primary-light/30"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-electric/20 text-accent-electric">
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-white group-hover:text-accent-electric">
                  {s.title}
                </h2>
                <p className="mt-1 text-neutral-gray-light">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
