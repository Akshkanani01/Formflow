import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Activity,
  ShieldCheck,
} from "lucide-react";

type DashboardHeaderProps = {
  workspaceName: string;
};

export default function DashboardHeader({
  workspaceName,
}: DashboardHeaderProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-border bg-card">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 left-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative p-10 lg:p-12">
        <h1 className="mt-7 text-5xl font-bold tracking-tight lg:text-6xl">
          {greeting}
          <span className="text-primary"> 👋</span>
        </h1>

        <p className="mt-5 text-2xl font-semibold">
          {workspaceName}
        </p>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
          Build beautiful forms, collect responses, monitor analytics,
          collaborate with your team, and manage your entire workflow
          from one elegant workspace.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-background/70 p-6 backdrop-blur">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Performance
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Track forms, responses, conversions and workspace growth
              from one dashboard.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-background/70 p-6 backdrop-blur">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <Activity className="h-6 w-6 text-primary" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Live Activity
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Stay updated with recent submissions, edits and team
              activity in real time.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-background/70 p-6 backdrop-blur">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Secure Workspace
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Your forms, responses and workspace remain protected with
              enterprise-grade authentication.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-background/40 px-10 py-5">
        <p className="text-sm text-muted-foreground">
          Everything you need to build, share and analyze forms from one
          place.
        </p>

        <Link
          href="/dashboard/analytics"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          Open Analytics
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}