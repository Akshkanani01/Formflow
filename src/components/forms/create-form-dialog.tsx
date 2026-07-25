"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";

import { createForm } from "@/app/actions/forms/create-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CreateFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateFormDialog({
  open,
  onOpenChange,
}: CreateFormDialogProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setError("");
  };
    async function handleSubmit() {
    setError("");

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setError("Form title is required.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await createForm({
          title: cleanTitle,
          description: description.trim(),
        });

        if (!result?.success) {
          setError("Unable to create form.");
          return;
        }

        resetForm();
        onOpenChange(false);

        router.push(`/dashboard/forms/${result.formId}/builder`);
        router.refresh();
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        );
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isPending && !value) {
          resetForm();
        }

        onOpenChange(value);
      }}
    >
      <DialogContent className="sm:max-w-lg">

                <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>

          <DialogDescription>
            Create a new form and start building it immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium"
            >
              Form Title
            </label>

            <Input
              id="title"
              placeholder="Customer Feedback"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium"
            >
              Description
            </label>

            <Textarea
              id="description"
              placeholder="Optional description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              rows={4}
            />
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>
                <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => {
              resetForm();
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={isPending}
            onClick={handleSubmit}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Form"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}