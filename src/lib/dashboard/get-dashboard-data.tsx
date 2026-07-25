import { prisma } from "@/lib/prisma";

type DashboardDataParams = {
  userId: string;
};

export async function getDashboardData({
  userId,
}: DashboardDataParams) {
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

  if (!workspace) {
    return {
      workspace: null,
      stats: {
        totalForms: 0,
        draftForms: 0,
        publishedForms: 0,
        archivedForms: 0,
        totalResponses: 0,
        totalViews: 0,
      },
      recentForms: [],
      recentResponses: [],
      recentNotifications: [],
      recentActivity: [],
    };
  }

  const [
    totalForms,
    draftForms,
    publishedForms,
    archivedForms,
    totalResponses,
    totalViews,
    recentForms,
    recentResponses,
    recentNotifications,
    recentActivity,
  ] = await Promise.all([
    prisma.form.count({
      where: {
        workspaceId: workspace.id,
      },
    }),

    prisma.form.count({
      where: {
        workspaceId: workspace.id,
        status: "DRAFT",
      },
    }),

    prisma.form.count({
      where: {
        workspaceId: workspace.id,
        status: "PUBLISHED",
      },
    }),

    prisma.form.count({
      where: {
        workspaceId: workspace.id,
        status: "ARCHIVED",
      },
    }),

    prisma.formSubmission.count({
      where: {
        form: {
          workspaceId: workspace.id,
        },
      },
    }),

    prisma.formView.count({
      where: {
        form: {
          workspaceId: workspace.id,
        },
      },
    }),

    prisma.form.findMany({
      where: {
        workspaceId: workspace.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
      include: {
        _count: {
          select: {
            submissions: true,
            views: true,
          },
        },
      },
    }),

    prisma.formSubmission.findMany({
      orderBy: {
        submittedAt: "desc",
      },
      take: 8,
      include: {
        form: {
          select: {
            id: true,
            title: true,
            workspaceId: true,
          },
        },
      },
      where: {
        form: {
          workspaceId: workspace.id,
        },
      },
    }),

    prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
    }),

    prisma.auditLog.findMany({
      where: {
        workspaceId: workspace.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    }),
  ]);

  return {
    workspace,

    stats: {
      totalForms,
      draftForms,
      publishedForms,
      archivedForms,
      totalResponses,
      totalViews,
    },

    recentForms,
    recentResponses,
    recentNotifications,
    recentActivity,
  };
}