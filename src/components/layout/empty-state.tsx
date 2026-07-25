import * as React from "react";

import { cn } from "@/lib/utils";

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card px-8 py-16 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          {icon}
        </div>
      )}

      <h3 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>

      {description && (
        <p className="mt-3 max-w-md text-pretty text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-8">
          {action}
        </div>
      )}
    </div>
  );
}