import * as React from "react";

import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionSpacing = "sm" | "md" | "lg" | "xl";

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-12",
  md: "py-16",
  lg: "py-24",
  xl: "py-32",
};

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  spacing?: SectionSpacing;
  contained?: boolean;
}

export function Section({
  as: Component = "section",
  spacing = "lg",
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  const content = contained ? (
    <Container>{children}</Container>
  ) : (
    children
  );

  return (
    <Component
      className={cn(
        "relative w-full",
        spacingClasses[spacing],
        className
      )}
      {...props}
    >
      {content}
    </Component>
  );
}