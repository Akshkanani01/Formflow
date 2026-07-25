"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CreateFormDialog } from "./create-form-dialog";

export function CreateFormButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
      >
        <Plus className="size-4" />

        <span>Create Form</span>
      </Button>

      <CreateFormDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}