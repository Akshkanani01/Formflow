import { prisma } from "@/lib/prisma";

type GetFormOptions = {
  workspaceId: string;
  formId: string;
};

export async function getForm({
  workspaceId,
  formId,
}: GetFormOptions) {
  return prisma.form.findFirst({
    where: {
      id: formId,
      workspaceId,
    },
  });
}