import { ReactNode } from "react";

import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardTopbar from "@/components/dashboard/dashboard-topbar";

type DashboardShellProps = {
  children: ReactNode;
  notificationCount?: number;
  user: {
    name: string;
    email: string;
  };
};

export default function DashboardShell({
  children,
  notificationCount = 0,
  user,
}: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1800px] p-6">
        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <DashboardSidebar />

          <div className="min-w-0 space-y-6">
            <DashboardTopbar
              notificationCount={notificationCount}
              user={user}
            />

            <div className="space-y-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}