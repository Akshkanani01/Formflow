import Link from "next/link";
import {
  Plus,
  FileText,
  MessageSquare,
  ClipboardList,
  UserPlus,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
  title: "New Form",
  description: "Create a new form from scratch",
  icon: Plus,
  href: "/dashboard/forms",
  featured: true,
},
  {
    title: "Contact Form",
    description: "Collect customer enquiries",
    icon: MessageSquare,
    href: "/dashboard/templates",
  },
  {
    title: "Feedback Form",
    description: "Gather valuable feedback",
    icon: ClipboardList,
    href: "/dashboard/templates",
  },
  {
    title: "Registration",
    description: "Event & user registrations",
    icon: UserPlus,
    href: "/dashboard/templates",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-[32px] border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-8 py-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Start faster using ready-made actions.
          </p>
        </div>

        <Link
          href="/dashboard/templates"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          Browse Templates

          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 p-8 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className={`group rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                action.featured
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-background"
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {action.description}
              </p>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Open

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}