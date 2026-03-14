"use client";

/**
 * Carte service — glassmorphisme, bordure or à gauche, prix, CTA.
 * CDC v1.4
 */

import Link from "next/link";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatFCFA } from "@/lib/utils";
import type { ServiceListItem } from "@/lib/services";

const CAT_COLORS: Record<string, string> = {
  BRANDING: "gold",
  WEB: "blue",
  IMPRESSION: "success",
  PACK: "navy",
  CREDIBILITE: "default",
  FORMATION: "gold",
  HEBERGEMENT: "navy",
};

function getIcon(icone: string) {
  const name = (icone || "Circle").replace(/-/g, "");
  const key = name.charAt(0).toUpperCase() + name.slice(1);
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[key] ?? LucideIcons.Circle;
  return Icon;
}

export interface ServiceCardProps {
  service: ServiceListItem;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = getIcon(service.icone);
  const prixMin = service.tarifs.length > 0
    ? Math.min(...service.tarifs.map((t) => t.prixMin))
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card
        hover
        className="h-full border-l-4 border-l-gold bg-white/80 backdrop-blur"
      >
        <CardContent className="flex flex-1 flex-col pt-6">
          <div className="flex items-start justify-between gap-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold/20 text-gold">
              <Icon className="h-6 w-6" />
            </div>
            {service.badge && (
              <Badge variant="gold">{service.badge}</Badge>
            )}
          </div>
          <h3 className="mt-4 font-syne text-lg font-semibold text-navy">
            {service.nom}
          </h3>
          <p className="mt-2 flex-1 text-sm text-gray">{service.descCourte}</p>
          {prixMin > 0 && (
            <p className="mt-4 font-syne text-sm font-semibold text-gold">
              À partir de {formatFCFA(prixMin)}
            </p>
          )}
        </CardContent>
        <div className="p-6 pt-0">
          <Button asChild variant="secondary" className="w-full">
            <Link href={`/services/${service.slug}`}>En savoir plus</Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
