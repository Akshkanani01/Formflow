import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

const faqs = [
  {
    question: "Is FormFlow completely free?",
    answer:
      "Yes. You can create unlimited forms and collect unlimited responses without paying.",
  },
  {
    question: "Do I need coding knowledge?",
    answer:
      "No. FormFlow is built for everyone. You can create professional forms using the visual builder.",
  },
  {
    question: "Can I share my forms anywhere?",
    answer:
      "Yes. Every form gets a shareable link that works on desktop and mobile devices.",
  },
  {
    question: "Are responses stored securely?",
    answer:
      "Yes. Responses are securely stored and designed with privacy and reliability in mind.",
  },
  {
    question: "Can teams collaborate?",
    answer:
      "Yes. Invite team members, organize forms, and manage everything together from one workspace.",
  },
  {
    question: "Will more features be added?",
    answer:
      "Absolutely. FormFlow is continuously evolving with new templates, integrations, and collaboration features.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="bg-muted/20 py-24"
    >
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know before getting started."
        />

        <div className="mx-auto mt-16 max-w-4xl space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-lg font-semibold">
                {faq.question}
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}