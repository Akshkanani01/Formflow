"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

type FormsPaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
};

export function FormsPagination({
  page,
  totalPages,
  total,
  pageSize,
}: FormsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  function goToPage(nextPage: number) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", String(nextPage));

    router.replace(
      `${pathname}?${params.toString()}`
    );
  }

  const start =
    total === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const end = Math.min(
    page * pageSize,
    total
  );

  return (
    <div className="flex flex-col gap-4 border-t pt-6 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {start}–{end} of {total} forms
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            goToPage(page - 1)
          }
          disabled={page === 1}
          className="rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-3 text-sm font-medium">
          {page} / {totalPages}
        </span>

        <button
          onClick={() =>
            goToPage(page + 1)
          }
          disabled={page === totalPages}
          className="rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}