import { BuilderPreview } from "@/components/marketing/builder-preview";
import { CTA } from "@/components/marketing/cta";
import { FAQ } from "@/components/marketing/faq";
import { Features } from "@/components/marketing/features";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { Navbar } from "@/components/marketing/navbar";
import { TemplatesShowcase } from "@/components/marketing/templates-showcase";
import { Testimonials } from "@/components/marketing/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Hero />

      <LogoCloud />

      <Features />

      <HowItWorks />

      <BuilderPreview />

      <TemplatesShowcase />

      <Testimonials />

      <FAQ />

      <CTA />

      <Footer />
    </main>
  );
}