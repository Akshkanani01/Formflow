import * as React from "react";

import { cn } from "@/lib/utils";

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-start lg:justify-between",
        className
      )}
      {...props}
    >
      <div className="min-w-0 flex-1 space-y-3">
        {eyebrow && (
          <div className="flex items-center gap-2">
            {eyebrow}
          </div>
        )}

        <div className="space-y-2">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>

          {description && (
            <p className="max-w-3xl text-pretty text-base leading-7 text-muted-foreground md:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {actions}
        </div>
      )}
    </header>
  );
}