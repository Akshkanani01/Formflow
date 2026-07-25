import { prisma } from "@/lib/prisma";

type GetLayoutDataParams = {
  userId: string;
};

export async function getLayoutData({
  userId,
}: GetLayoutDataParams) {
  const workspace = await prisma.workspace.findFirst({
    where: {
      OR: [
        {
          ownerId: userId,
        },
        {
          members: {
            some: {
              userId,
            },
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  const notificationCount =
    await prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    });

  return {
    workspace,
    notificationCount,
  };
}