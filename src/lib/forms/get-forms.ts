import { FormStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type GetFormsOptions = {
  workspaceId: string;
  search?: string;
  status?: FormStatus;
  sort?:
    | "updated-desc"
    | "updated-asc"
    | "created-desc"
    | "created-asc"
    | "title-asc"
    | "title-desc";
  page?: number;
  pageSize?: number;
};

export async function getForms({
  workspaceId,
  search,
  status,
  sort = "updated-desc",
  page = 1,
  pageSize = 10,
}: GetFormsOptions) {
  const currentPage = Math.max(page, 1);
  const take = pageSize;
  const skip = (currentPage - 1) * take;

  const where = {
    workspaceId,

    ...(search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),

    ...(status ? { status } : {}),
  };

  const [forms, total] = await Promise.all([
    prisma.form.findMany({
      where,

      include: {
        _count: {
          select: {
            submissions: true,
          },
        },
      },

      orderBy:
        sort === "updated-asc"
          ? {
              updatedAt: "asc",
            }
          : sort === "created-desc"
          ? {
              createdAt: "desc",
            }
          : sort === "created-asc"
          ? {
              createdAt: "asc",
            }
          : sort === "title-asc"
          ? {
              title: "asc",
            }
          : sort === "title-desc"
          ? {
              title: "desc",
            }
          : {
              updatedAt: "desc",
            },

      skip,
      take,
    }),

    prisma.form.count({
      where,
    }),
  ]);

  return {
    forms,
    total,
    page: currentPage,
    pageSize: take,
    totalPages: Math.ceil(total / take),
  };
}