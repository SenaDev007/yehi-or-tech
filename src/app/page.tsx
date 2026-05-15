import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Packs from "@/components/Packs";
import AIAutomation from "@/components/AIAutomation";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight selection:bg-gold selection:text-midnight">
      <Navbar />
      <Hero />
      <Expertise />
      <Packs />
      <AIAutomation />
      <Process />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
