import {
  Calendar,
  CheckSquare,
  ChevronDown,
  GripVertical,
  Mail,
  MousePointerClick,
  Settings2,
  Type,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

const fields = [
  {
    icon: Type,
    label: "Full Name",
  },
  {
    icon: Mail,
    label: "Email Address",
  },
  {
    icon: Calendar,
    label: "Date",
  },
  {
    icon: CheckSquare,
    label: "Checkbox",
  },
];

export function BuilderPreview() {
  return (
    <section
      id="builder"
      className="py-24"
    >
      <Container>
        <SectionHeading
          badge="Visual Builder"
          title="Design forms visually."
          description="A clean drag-and-drop experience that helps you build forms in minutes."
        />

        <div className="mt-16 overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          {/* Browser Bar */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="rounded-full bg-muted px-5 py-2 text-sm text-muted-foreground">
              app.formflow.com
            </div>

            <Settings2 className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="grid lg:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <aside className="border-r border-border bg-muted/20 p-6">
              <h3 className="mb-5 font-semibold">
                Form Fields
              </h3>

              <div className="space-y-3">
                {fields.map((field) => {
                  const Icon = field.icon;

                  return (
                    <div
                      key={field.label}
                      className="flex cursor-grab items-center gap-3 rounded-xl border border-border bg-background p-3 transition hover:border-primary"
                    >
                      <Icon className="h-5 w-5 text-primary" />

                      <span className="flex-1 text-sm">
                        {field.label}
                      </span>

                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* Canvas */}
            <div className="p-8">
              <div className="mx-auto max-w-xl rounded-2xl border border-border bg-background p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold">
                    Customer Feedback
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    Help us improve our service.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Full Name
                    </label>

                    <div className="rounded-xl border border-border px-4 py-3 text-muted-foreground">
                      Rahul Sharma
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Email
                    </label>

                    <div className="rounded-xl border border-border px-4 py-3 text-muted-foreground">
                      rahulsharma@gmail.com
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Satisfaction
                    </label>

                    <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                      <span className="text-muted-foreground">
                        Excellent
                      </span>

                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>

                  <button className="flex w-full items-center justify-center rounded-xl bg-primary py-3 font-medium text-primary-foreground">
                    <MousePointerClick className="mr-2 h-4 w-4" />
                    Submit Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}