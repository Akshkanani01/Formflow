import Link from "next/link";

import { Container } from "@/components/layout/container";

const links = [
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Terms",
    href: "/terms",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-8 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
              F
            </div>

            <span className="font-medium text-foreground">
              FormFlow
            </span>

            <span>© {new Date().getFullYear()}</span>
          </div>

          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}