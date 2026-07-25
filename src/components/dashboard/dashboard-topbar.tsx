"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import {
  Bell,
  ChevronDown,
  Command,
  LogOut,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

type DashboardTopbarProps = {
  notificationCount?: number;
  user: {
    name: string;
    email: string;
  };
};

export default function DashboardTopbar({
  notificationCount = 0,
  user,
}: DashboardTopbarProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/";
          },
        },
      });
    });
  }

  return (
    <header className="sticky top-0 z-40 rounded-[32px] border border-border bg-card/80 px-8 py-5 backdrop-blur-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="flex-1">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search forms, responses, templates..."
              className="h-12 w-full rounded-2xl border border-border bg-background pl-12 pr-16 outline-none transition-all focus:border-primary"
            />

            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-lg border border-border bg-card px-2 py-1 text-xs text-muted-foreground">
              <Command className="h-3 w-3" />
              K
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          

          <button
            className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background transition-colors hover:bg-accent"
          >
            <Bell className="h-5 w-5" />

            {notificationCount > 0 && (
              <span className="absolute right-2 top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen((value) => !value)}
              className="flex items-center gap-3 rounded-2xl border border-border bg-background px-3 py-2 transition-colors hover:bg-accent"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="hidden text-left lg:block">
                <p className="text-sm font-semibold">
                  {user.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>

              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                <div className="border-b border-border p-4">
                  <p className="font-semibold">
                    {user.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>

                <div className="p-2">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors hover:bg-accent"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>

                  <Link
                    href="/dashboard/settings"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors hover:bg-accent"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    disabled={pending}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-red-500 transition-colors hover:bg-accent disabled:opacity-60"
                  >
                    <LogOut className="h-4 w-4" />

                    {pending ? "Signing out..." : "Logout"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}