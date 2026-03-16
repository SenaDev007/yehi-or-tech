/**
 * Page d'accueil — 7 sections + conversion.
 * CDC v1.4 — Témoignages connectés au backoffice (admin/temoignages).
 */

import HeroSection from "@/components/sections/HeroSection";
import PourquoiSection from "@/components/sections/PourquoiSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import StatsSection from "@/components/sections/StatsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import ClientLogos from "@/components/sections/ClientLogos";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GuaranteeBlock from "@/components/sections/GuaranteeBlock";
import CTAFinal from "@/components/sections/CTAFinal";
import ConversionToast from "@/components/sections/ConversionToast";
import { getTemoignages } from "@/lib/temoignages";

export default async function HomePage() {
  const temoignages = await getTemoignages();
  return (
    <>
      <HeroSection />
      <PourquoiSection />
      <ServicesPreview />
      <StatsSection />
      <ProcessSection />
      <PortfolioPreview />
      <ClientLogos />
      <TestimonialsSection temoignages={temoignages} />
      <GuaranteeBlock />
      <CTAFinal />
      <ConversionToast />
    </>
  );
}
