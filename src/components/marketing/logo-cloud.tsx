import { Container } from "@/components/layout/container";

const companies = [
  "Acme",
  "Nova",
  "Pixel",
  "Vertex",
  "Orbit",
  "Nimbus",
];

export function LogoCloud() {
  return (
    <section className="border-y border-border/60 bg-muted/30 py-12">
      <Container>
        <div className="flex flex-col items-center gap-8">
          <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by modern teams
          </p>

          <div className="grid w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {companies.map((company) => (
              <div
                key={company}
                className="flex h-14 items-center justify-center rounded-xl border border-border bg-card text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}