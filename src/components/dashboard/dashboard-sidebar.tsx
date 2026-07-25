import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Inbox,
  BarChart3,
  Settings,
  FolderOpen,
  Bell,
  Sparkles,
} from "lucide-react";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Forms",
    href: "#",
    icon: FileText,
  },
  {
    title: "Responses",
    href: "#",
    icon: Inbox,
  },
  {
    title: "Templates",
    href: "#",
    icon: FolderOpen,
  },
  {
    title: "Analytics",
    href: "#",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    href: "#",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "#",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  return (
    <aside className="sticky top-8 h-[calc(100vh-4rem)] w-72 rounded-[32px] border border-border bg-card">
      <div className="border-b border-border p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="h-7 w-7" />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              FormFlow
            </h2>
          </div>
        </div>
      </div>

      <nav className="space-y-2 p-5">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-medium transition-all duration-300 hover:bg-accent"
            >
              <Icon className="h-5 w-5" />

              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}