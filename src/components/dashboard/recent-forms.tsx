import Link from "next/link";
import {
  ArrowRight,
  FileText,
} from "lucide-react";

type FormItem = {
  id: string;
  title: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  updatedAt: Date;
  _count: {
    submissions: number;
    views: number;
  };
};

type RecentFormsProps = {
  forms: FormItem[];
};

function getStatusClasses(status: FormItem["status"]) {
  switch (status) {
    case "PUBLISHED":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "ARCHIVED":
      return "bg-slate-500/10 text-slate-600 dark:text-slate-400";
    default:
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
  }
}

export default function RecentForms({
  forms,
}: RecentFormsProps) {
  return (
    <section className="rounded-[32px] border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-8 py-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Recent Forms
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Recently updated forms in your workspace.
          </p>
        </div>

        <Link
          href="/dashboard/forms"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          View All

          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {forms.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-8 py-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
            <FileText className="h-10 w-10 text-primary" />
          </div>

          <h3 className="mt-6 text-xl font-semibold">
            No forms yet
          </h3>

          <p className="mt-2 max-w-sm text-center text-muted-foreground">
            Create your first form to start collecting responses.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {forms.map((form) => (
            <Link
              key={form.id}
              href={`/dashboard/forms/${form.id}`}
              className="flex items-center justify-between px-8 py-6 transition-colors hover:bg-accent/40"
            >
              <div>
                <h3 className="font-semibold">
                  {form.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {form._count.submissions} Responses •{" "}
                  {form._count.views} Views
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                  form.status
                )}`}
              >
                {form.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}