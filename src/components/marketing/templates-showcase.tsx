import {
  Briefcase,
  CalendarDays,
  ClipboardList,
  MessageSquare,
  UserPlus,
  Users,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

const templates = [
  {
    icon: MessageSquare,
    title: "Customer Feedback",
    description: "Collect valuable customer opinions and ratings.",
    category: "Feedback",
  },
  {
    icon: UserPlus,
    title: "Contact Form",
    description: "Simple contact forms for websites and businesses.",
    category: "Business",
  },
  {
    icon: CalendarDays,
    title: "Event Registration",
    description: "Accept registrations for webinars and events.",
    category: "Events",
  },
  {
    icon: ClipboardList,
    title: "Survey",
    description: "Create surveys with multiple question types.",
    category: "Research",
  },
  {
    icon: Briefcase,
    title: "Job Application",
    description: "Receive applications from candidates online.",
    category: "HR",
  },
  {
    icon: Users,
    title: "Team Request",
    description: "Internal request forms for your organization.",
    category: "Internal",
  },
];

export function TemplatesShowcase() {
  return (
    <section
      id="templates"
      className="bg-muted/20 py-24"
    >
      <Container>
        <SectionHeading
          badge="Templates"
          title="Start faster with ready-made templates."
          description="Choose a template, customize it, and publish your form in minutes."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => {
            const Icon = template.icon;

            return (
              <div
                key={template.title}
                className="group rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>

                <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {template.category}
                </span>

                <h3 className="mt-5 text-xl font-semibold">
                  {template.title}
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {template.description}
                </p>

                <div className="mt-8 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Use Template →
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}