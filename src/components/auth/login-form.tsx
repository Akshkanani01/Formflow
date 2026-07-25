"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await authClient.signIn.magicLink({
        email,
        callbackURL: "/dashboard",
      });

      if (error) {
        setError(error.message ?? "Something went wrong.");
        return;
      }

      setSuccess("Magic link sent! Check your email.");
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border bg-card p-8 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-bold">
          Sign in
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email to receive a secure magic link.
        </p>
      </div>

      <input
        type="email"
        required
        value={email}
        disabled={loading}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-lg border bg-background px-4 py-3 outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-primary-foreground"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Continue with Magic Link"
        )}
      </button>

      {success && (
        <p className="text-sm text-green-600">
          {success}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}