import {
  FilePlus2,
  Send,
  BarChart3,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

const steps = [
  {
    icon: FilePlus2,
    title: "Create your form",
    description:
      "Choose a blank form or start from a professionally designed template.",
  },
  {
    icon: Send,
    title: "Share anywhere",
    description:
      "Publish your form instantly and share it with a simple link.",
  },
  {
    icon: BarChart3,
    title: "Collect responses",
    description:
      "View submissions in a clean dashboard and export them anytime.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-muted/20 py-24">
      <Container>
        <SectionHeading
          badge="How it works"
          title="Three simple steps."
          description="From idea to published form in just a few minutes."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-border bg-card p-8"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>

                  <span className="text-4xl font-bold text-border">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}