import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-border bg-card px-8 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
        <Icon className="h-10 w-10 text-primary" />
      </div>

      <h3 className="mt-8 text-2xl font-semibold tracking-tight">
        {title}
      </h3>

      <p className="mt-3 max-w-md text-muted-foreground">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-300 hover:scale-[1.02]"
        >
          {actionLabel}

          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}