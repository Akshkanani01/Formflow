import { headers } from "next/headers";
import { redirect } from "next/navigation";

import DashboardShell from "@/components/dashboard/dashboard-shell";

import { auth } from "@/lib/auth";
import { getLayoutData } from "@/lib/dashboard/get-layout-data";
import { getOrCreateWorkspace } from "@/lib/workspace/get-or-create-workspace";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  await getOrCreateWorkspace({
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  });

  const data = await getLayoutData({
    userId: session.user.id,
  });

  return (
    <DashboardShell
      notificationCount={data.notificationCount}
      user={{
        name: session.user.name ?? "User",
        email: session.user.email,
      }}
    >
      {children}
    </DashboardShell>
  );
}