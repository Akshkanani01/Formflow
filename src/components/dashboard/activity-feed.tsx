import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Clock,
} from "lucide-react";

type ActivityItem = {
  id: string;
  action:
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | "PUBLISH"
    | "UNPUBLISH"
    | "ARCHIVE"
    | "RESTORE"
    | "INVITE"
    | "REMOVE";
  entityType: string;
  entityId: string;
  description: string | null;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
};

type ActivityFeedProps = {
  activities: ActivityItem[];
};

function formatRelative(date: Date) {
  const diff = Date.now() - new Date(date).getTime();

  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function actionColor(action: ActivityItem["action"]) {
  switch (action) {
    case "CREATE":
      return "bg-emerald-500";
    case "UPDATE":
      return "bg-blue-500";
    case "DELETE":
      return "bg-red-500";
    case "PUBLISH":
      return "bg-green-500";
    case "ARCHIVE":
      return "bg-orange-500";
    default:
      return "bg-primary";
  }
}

export default function ActivityFeed({
  activities,
}: ActivityFeedProps) {
  return (
    <section className="rounded-[32px] border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-8 py-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Activity Feed
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest workspace activity.
          </p>
        </div>

        <Link
          href="/dashboard/activity"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          View All

          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-8 py-20">
          <Activity className="h-14 w-14 text-primary" />

          <h3 className="mt-6 text-xl font-semibold">
            No activity yet
          </h3>

          <p className="mt-2 text-center text-muted-foreground">
            Workspace activity will appear here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 px-8 py-6 transition-colors hover:bg-accent/40"
            >
              <div
                className={`mt-1 h-3 w-3 rounded-full ${actionColor(
                  activity.action
                )}`}
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">
                    {activity.user.name ?? activity.user.email}
                  </p>

                  <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                    {activity.action}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {activity.description ??
                    `${activity.action} ${activity.entityType}`}
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />

                  {formatRelative(activity.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}