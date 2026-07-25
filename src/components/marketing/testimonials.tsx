import { Star } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Operations Manager",
    company: "NextBridge Solutions",
    quote:
      "FormFlow helped us digitize our client onboarding process. We created and shared our first form in under 15 minutes.",
  },
  {
    name: "Priya Shah",
    role: "HR Manager",
    company: "Elevate Technologies",
    quote:
      "Hiring forms, employee requests, and internal approvals are now managed in one place. The experience is clean and incredibly easy to use.",
  },
  {
    name: "Rohan Patel",
    role: "Founder",
    company: "GrowthHive Labs",
    quote:
      "We switched from multiple form tools to FormFlow. The builder is intuitive, the interface is modern, and our team adopted it immediately.",
  },
];
export function Testimonials() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          badge="Testimonials"
          title="Loved by modern teams."
          description="See why businesses choose FormFlow to collect information faster."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-xl"
            >
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-current text-primary"
                  />
                ))}
              </div>

              <p className="leading-7 text-muted-foreground">
                "{item.quote}"
              </p>

              <div className="mt-8 border-t border-border pt-6">
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.role}
                </p>

                <p className="text-sm text-primary">
                  {item.company}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}