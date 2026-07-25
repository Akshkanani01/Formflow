import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  BarChart3,
  Eye,
  FileText,
  Send,
} from "lucide-react";

import DashboardShell from "@/components/dashboard/dashboard-shell";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import StatsCard from "@/components/dashboard/stats-card";
import AnalyticsOverview from "@/components/dashboard/analytics-overview";
import QuickActions from "@/components/dashboard/quick-actions";
import RecentForms from "@/components/dashboard/recent-forms";
import RecentResponses from "@/components/dashboard/recent-responses";
import ActivityFeed from "@/components/dashboard/activity-feed";

import { auth } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard/get-dashboard-data";
import { getOrCreateWorkspace } from "@/lib/workspace/get-or-create-workspace";

export default async function DashboardPage() {
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

  const data = await getDashboardData({
    userId: session.user.id,
  });

  return (
  <>
    <DashboardHeader
      workspaceName={
        data.workspace?.name ??
        "Personal Workspace"
      }
    />

    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Forms"
        value={data.stats.totalForms}
        subtitle={`${data.stats.publishedForms} Published`}
        icon={FileText}
      />

      <StatsCard
        title="Responses"
        value={data.stats.totalResponses}
        subtitle="Total submissions"
        icon={Send}
      />

      <StatsCard
        title="Views"
        value={data.stats.totalViews}
        subtitle="Total visits"
        icon={Eye}
      />

      <StatsCard
        title="Drafts"
        value={data.stats.draftForms}
        subtitle="Ready to publish"
        icon={BarChart3}
      />
    </section>

    <AnalyticsOverview
      totalForms={data.stats.totalForms}
      totalResponses={data.stats.totalResponses}
      totalViews={data.stats.totalViews}
      publishedForms={data.stats.publishedForms}
    />

    <QuickActions />

    <div className="grid gap-6 xl:grid-cols-2">
      <RecentForms forms={data.recentForms} />

      <RecentResponses
        responses={data.recentResponses}
      />
    </div>

    <ActivityFeed
      activities={data.recentActivity}
    />
  </>
);
    
}