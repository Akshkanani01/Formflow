import {
  CheckCircle2,
  FileText,
  LayoutTemplate,
  MousePointerClick,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

const features = [
  {
    icon: MousePointerClick,
    title: "Drag & Drop Builder",
    description:
      "Create beautiful forms visually without writing a single line of code.",
  },
  {
    icon: LayoutTemplate,
    title: "Ready-made Templates",
    description:
      "Start with professionally designed templates for every use case.",
  },
  {
    icon: FileText,
    title: "Unlimited Forms",
    description:
      "Build as many forms as you need with unlimited questions and fields.",
  },
  {
    icon: BarChart3,
    title: "Real-time Responses",
    description:
      "View submissions instantly with a clean and organized dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Default",
    description:
      "Spam protection, validation and secure data handling built in.",
  },
  {
    icon: CheckCircle2,
    title: "No Coding Required",
    description:
      "Anyone can publish forms in minutes without technical knowledge.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-24"
    >
      <Container>
        <SectionHeading
          badge="Features"
          title="Everything you need to build forms."
          description="Powerful features designed for businesses, creators and teams."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}