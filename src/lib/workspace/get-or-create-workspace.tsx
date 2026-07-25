import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getOrCreateWorkspace(user: {
  id: string;
  name?: string | null;
  email: string;
}) {
  const existingWorkspace = await prisma.workspace.findFirst({
    where: {
      OR: [
        {
          ownerId: user.id,
        },
        {
          members: {
            some: {
              userId: user.id,
            },
          },
        },
      ],
    },
  });

  if (existingWorkspace) {
    return existingWorkspace;
  }

  const baseSlug = slugify(
    user.name || user.email.split("@")[0] || "workspace"
  );

  let slug = baseSlug;
  let counter = 1;

  while (
    await prisma.workspace.findUnique({
      where: {
        slug,
      },
    })
  ) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  return prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: {
        name: `${user.name ?? "My"} Workspace`,
        slug,
        ownerId: user.id,
      },
    });

    await tx.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: user.id,
        role: "OWNER",
      },
    });

    return workspace;
  });
}