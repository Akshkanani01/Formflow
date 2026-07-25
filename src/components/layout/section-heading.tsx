import * as React from "react";

import { cn } from "@/lib/utils";

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  maxWidth?: "md" | "lg" | "xl";
}

const maxWidthClasses = {
  md: "max-w-2xl",
  lg: "max-w-3xl",
  xl: "max-w-4xl",
};

export function SectionHeading({
  badge,
  title,
  description,
  align = "left",
  maxWidth = "lg",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-4",
        align === "center" && "items-center text-center",
        maxWidthClasses[maxWidth],
        className
      )}
      {...props}
    >
      {badge && (
        <div className="flex">
          {badge}
        </div>
      )}

      <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="text-pretty text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}