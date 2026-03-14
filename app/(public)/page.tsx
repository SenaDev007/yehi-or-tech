/**
 * Page d'accueil — 7 sections + conversion.
 * CDC v1.4
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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PourquoiSection />
      <ServicesPreview />
      <StatsSection />
      <ProcessSection />
      <PortfolioPreview />
      <ClientLogos />
      <TestimonialsSection />
      <GuaranteeBlock />
      <CTAFinal />
      <ConversionToast />
    </>
  );
}
