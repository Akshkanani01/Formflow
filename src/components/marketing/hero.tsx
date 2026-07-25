import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="mb-6 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
            ✨ Beautiful Forms. Zero Code.
          </span>

          <h1 className="max-w-4xl text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Build professional forms
            <br />
            in{" "}
            <span className="text-primary">
              seconds
            </span>
            .
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
            Create surveys, contact forms, registrations,
            feedback forms and workflows with an elegant builder
            that anyone can use.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/login">
  <Button size="lg">
    Build Your Form
    <ArrowRight className="ml-2 h-4 w-4" />
  </Button>
</Link>

            <Link href="#features">
  <Button
    size="lg"
    variant="outline"
  >
    Explore Features
  </Button>
</Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>✓ Unlimited Forms</span>
            <span>✓ Unlimited Responses</span>
            <span>✓ No Credit Card</span>
          </div>
        </div>
      </Container>
    </section>
  );
}