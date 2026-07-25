"use client";

import Link from "next/link";

import { FormStatus } from "@prisma/client";

type FormItem = {
  id: string;
  title: string;
  description: string | null;
  status: FormStatus;
  updatedAt: Date;
  _count: {
    submissions: number;
  };
};

type FormsTableProps = {
  forms: FormItem[];
  selectedIds: string[];
  allSelected: boolean;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
};

function getStatusClasses(status: FormStatus) {
  switch (status) {
    case FormStatus.PUBLISHED:
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case FormStatus.ARCHIVED:
      return "bg-muted text-muted-foreground";

    default:
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
  }
}

export function FormsTable({
  forms,
  selectedIds,
  allSelected,
  onToggle,
  onToggleAll,
}: FormsTableProps) {
  if (forms.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center">
        <h3 className="text-lg font-semibold">
          No forms found
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Create your first form to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr className="border-b text-left">
            <th className="w-12 px-4 py-4">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleAll}
                className="h-4 w-4 rounded border-border"
              />
            </th>

            <th className="px-6 py-4 text-sm font-medium">
              Form
            </th>

            <th className="px-6 py-4 text-sm font-medium">
              Status
            </th>

            <th className="px-6 py-4 text-sm font-medium">
              Responses
            </th>

            <th className="px-6 py-4 text-sm font-medium">
              Updated
            </th>
          </tr>
        </thead>

        <tbody>
          {forms.map((form) => {
            const checked = selectedIds.includes(form.id);

            return (
              <tr
                key={form.id}
                className="border-b transition-colors hover:bg-muted/40"
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(form.id)}
                    className="h-4 w-4 rounded border-border"
                  />
                </td>

                <td className="px-6 py-4">
                  <Link
  href={`/dashboard/forms/${form.id}/builder`}
  className="block"
>
                    <div className="font-medium">
                      {form.title}
                    </div>

                    {form.description && (
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                        {form.description}
                      </p>
                    )}
                  </Link>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                      form.status
                    )}`}
                  >
                    {form.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm">
                  {form._count.submissions}
                </td>

                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(form.updatedAt)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}