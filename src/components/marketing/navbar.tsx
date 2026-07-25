"use client";

import Link from "next/link";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary font-bold text-primary-foreground">
              F
            </div>

            <span className="text-lg font-semibold tracking-tight">
              FormFlow
            </span>
          </Link>

          {/* Desktop */}

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>

            <Link
              href="#templates"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Templates
            </Link>

            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>

            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>

          {/* Right */}

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button className="hidden md:inline-flex">
                Build Your Form
              </Button>
            </Link>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}