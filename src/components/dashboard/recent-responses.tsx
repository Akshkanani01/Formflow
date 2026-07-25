import Link from "next/link";
import {
  ArrowRight,
  Inbox,
} from "lucide-react";

type ResponseItem = {
  id: string;
  submittedAt: Date;
  form: {
    id: string;
    title: string;
  };
};

type RecentResponsesProps = {
  responses: ResponseItem[];
};

function formatRelative(date: Date) {
  const diff = Date.now() - new Date(date).getTime();

  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);

  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function RecentResponses({
  responses,
}: RecentResponsesProps) {
  return (
    <section className="rounded-[32px] border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-8 py-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Recent Responses
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest submissions across all forms.
          </p>
        </div>

        <Link
          href="/dashboard/responses"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          View All

          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {responses.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-8 py-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
            <Inbox className="h-10 w-10 text-primary" />
          </div>

          <h3 className="mt-6 text-xl font-semibold">
            No responses yet
          </h3>

          <p className="mt-2 max-w-sm text-center text-muted-foreground">
            Responses will appear here once someone submits your forms.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {responses.map((response) => (
            <Link
              key={response.id}
              href={`/dashboard/forms/${response.form.id}`}
              className="flex items-center justify-between px-8 py-6 transition-colors hover:bg-accent/40"
            >
              <div>
                <h3 className="font-semibold">
                  {response.form.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  New submission received
                </p>
              </div>

              <span className="text-sm text-muted-foreground">
                {formatRelative(response.submittedAt)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}