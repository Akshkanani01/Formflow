import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function CTA() {
  return (
    <section className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-primary px-8 py-20 text-center text-primary-foreground lg:px-20">
          {/* Background Glow */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
              Ready to get started?
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
              Build your first form today.
            </h2>

            <p className="mt-6 text-lg leading-8 text-primary-foreground/80">
              Create unlimited forms, collect unlimited responses, and
              collaborate with your team—all from one beautiful workspace.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  variant="secondary"
                >
                  Build Your Form →

                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  Explore Features
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/70">
              <span>✓ Unlimited Forms</span>
              <span>✓ Unlimited Responses</span>
              <span>✓ No Credit Card</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}