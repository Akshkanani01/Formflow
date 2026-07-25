"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";

import { authClient } from "@/lib/auth-client";

type UserMenuProps = {
  name: string;
  email: string;
};

export default function UserMenu({
  name,
  email,
}: UserMenuProps) {
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
    <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
        {name.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1">
        <p className="font-medium">
          {name}
        </p>

        <p className="text-sm text-muted-foreground">
          {email}
        </p>
      </div>

      <button
        onClick={handleLogout}
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-accent"
      >
        <LogOut className="h-4 w-4" />
        {pending ? "Signing out..." : "Logout"}
      </button>
    </div>
  );
}