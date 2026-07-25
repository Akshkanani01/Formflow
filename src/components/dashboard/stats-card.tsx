import {
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";

type StatsCardProps = {
  title: string;
  value: number | string;
  subtitle: string;
  icon: LucideIcon;
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <h3 className="mt-3 text-4xl font-bold tracking-tight">
              {value}
            </h3>

            <p className="mt-3 text-sm text-muted-foreground">
              {subtitle}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-3 transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm font-medium text-primary">
          View Details

          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}