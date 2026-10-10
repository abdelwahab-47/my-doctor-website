import { Hero } from "@/components/Hero";
import { PlatformStrip } from "@/components/PlatformStrip";
import { ProblemSolution } from "@/components/ProblemSolution";
import { AppsSection } from "@/components/AppShowcase";
import { HowItWorks } from "@/components/HowItWorks";
import { EcosystemSection } from "@/components/EcosystemSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ContextSection } from "@/components/ContextSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaSection } from "@/components/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <PlatformStrip />
      <ProblemSolution />
      <AppsSection />
      <HowItWorks />
      <EcosystemSection />
      <FeaturesSection />
      <ContextSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}