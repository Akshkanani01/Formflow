import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionHeaderProps = {
  title: string;
  description?: string;
  href?: string;
  actionLabel?: string;
};

export default function SectionHeader({
  title,
  description,
  href,
  actionLabel,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border px-8 py-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {href && actionLabel && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          {actionLabel}

          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}