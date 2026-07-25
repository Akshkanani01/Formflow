import {
  TrendingUp,
  Eye,
  Send,
  FileText,
} from "lucide-react";

type AnalyticsOverviewProps = {
  totalForms: number;
  totalResponses: number;
  totalViews: number;
  publishedForms: number;
};

function percentage(value: number, total: number) {
  if (total === 0) return 0;

  return Math.round((value / total) * 100);
}

export default function AnalyticsOverview({
  totalForms,
  totalResponses,
  totalViews,
  publishedForms,
}: AnalyticsOverviewProps) {
  const averageResponses =
    totalForms === 0
      ? 0
      : Math.round(totalResponses / totalForms);

  const publishRate = percentage(
    publishedForms,
    totalForms
  );

  const averageViews =
    totalForms === 0
      ? 0
      : Math.round(totalViews / totalForms);

  const cards = [
    {
      title: "Publish Rate",
      value: `${publishRate}%`,
      subtitle: "Forms currently published",
      icon: TrendingUp,
    },
    {
      title: "Avg Responses",
      value: averageResponses,
      subtitle: "Per form",
      icon: Send,
    },
    {
      title: "Avg Views",
      value: averageViews,
      subtitle: "Per form",
      icon: Eye,
    },
    {
      title: "Live Forms",
      value: publishedForms,
      subtitle: "Currently collecting data",
      icon: FileText,
    },
  ];

  return (
    <section className="rounded-[32px] border border-border bg-card">
      <div className="border-b border-border px-8 py-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          Analytics Overview
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Live performance metrics from your workspace.
        </p>
      </div>

      <div className="grid gap-6 p-8 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>

                <h3 className="mt-2 text-4xl font-bold tracking-tight">
                  {card.value}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}