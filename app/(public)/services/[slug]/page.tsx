/**
 * Page détail d'un service — tarifs 3 niveaux, processus, FAQ, garantie, simulateur.
 * CDC v1.4
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServiceSlugs, SERVICE_CAT_LABELS } from "@/lib/services";
import type { ServiceCat } from "@prisma/client";
import ServiceTarifs from "@/components/services/ServiceTarifs";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import PriceSimulator from "@/components/services/PriceSimulator";
import GuaranteeBlock from "@/components/sections/GuaranteeBlock";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import * as LucideIcons from "lucide-react";
import { formatFCFA } from "@/lib/utils";

const DEVIS_URL =
  process.env.NEXT_PUBLIC_DEVIS_URL || "https://devis.yehiortech.com";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service)
    return { title: "Service | YEHI OR Tech" };
  return {
    title: `${service.nom} | YEHI OR Tech`,
    description: service.descCourte,
  };
}

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

function getIcon(icone: string) {
  const name = (icone || "Circle").replace(/-/g, "");
  const key = name.charAt(0).toUpperCase() + name.slice(1);
  return (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[key] ?? LucideIcons.Circle;
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = getIcon(service.icone);
  const catLabel = SERVICE_CAT_LABELS[service.categorie as ServiceCat];

  const simulatorServices = [
    {
      slug: service.slug,
      nom: service.nom,
      prixMin: service.tarifs[0]?.prixMin ?? 0,
      prixMax: service.tarifs[service.tarifs.length - 1]?.prixMax ?? 0,
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      {/* Hero */}
      <section className="bg-navy px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-6 text-sm text-white/70" aria-label="Fil d'Ariane">
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{service.nom}</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <Badge variant="gold" className="mb-2">
                {catLabel}
              </Badge>
              <h1 className="font-syne text-3xl font-bold text-white md:text-4xl">
                {service.nom}
              </h1>
              <p className="mt-2 text-white/85">{service.descCourte}</p>
              {service.delai && (
                <p className="mt-2 text-sm text-white/70">
                  Délai indicatif : {service.delai}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Description */}
        <section>
          <div
            className="max-w-none text-gray"
            dangerouslySetInnerHTML={{
              __html: service.descLongue.replace(/\n/g, "<br />"),
            }}
          />
        </section>

        {/* Processus */}
        {service.processus.length > 0 && (
          <section className="mt-12">
            <h2 className="font-syne text-xl font-semibold text-navy">
              Notre processus
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {service.processus.map((step, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 rounded-lg bg-blue-xl/50 px-4 py-2 font-medium text-navy"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/30 text-sm text-gold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Livrables / Non inclus */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {service.livrables.length > 0 && (
            <div>
              <h3 className="font-syne font-semibold text-navy">Livrables</h3>
              <ul className="mt-2 list-inside list-disc text-gray">
                {service.livrables.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </div>
          )}
          {service.nonInclus.length > 0 && (
            <div>
              <h3 className="font-syne font-semibold text-navy">Non inclus</h3>
              <ul className="mt-2 list-inside list-disc text-gray">
                {service.nonInclus.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Tarifs */}
        <section className="mt-16">
          <ServiceTarifs tarifs={service.tarifs} />
        </section>

        {/* Simulateur */}
        <section className="mt-16">
          <PriceSimulator services={simulatorServices} />
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <ServiceFAQ />
        </section>

        {/* Garantie */}
        <section className="mt-16">
          <GuaranteeBlock />
        </section>

        {/* CTA */}
        <section className="mt-12 flex flex-wrap gap-4">
          <Button asChild variant="primary" className="shadow-gold-cta">
            <a
              href={DEVIS_URL}
              target={DEVIS_URL.startsWith("http") ? "_blank" : undefined}
              rel={DEVIS_URL.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              Demander un devis pour ce service
            </a>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/services">Voir tous les services</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
