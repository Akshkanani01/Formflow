"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  FIELD_TYPES,
} from "@/components/forms/builder/field-types";

import {
  useBuilder,
} from "./builder-context";


export function BuilderSidebar() {

  const {
    addField,
  } = useBuilder();



  function handleAddField(
    type: string,
    label: string
  ) {

    addField({

      id:
        crypto.randomUUID(),

      type,

      label,

      description:
        "",

      placeholder:
        "",

      required:
        false,

    });

  }



  return (
    <aside
      className="
        overflow-y-auto
        border-r
        bg-card
      "
    >

      <div
        className="
          border-b
          px-5
          py-4
        "
      >

        <h2
          className="
            text-sm
            font-semibold
          "
        >
          Components
        </h2>


        <p
          className="
            mt-1
            text-xs
            text-muted-foreground
          "
        >
          Add fields to your form
        </p>

      </div>



      <div
        className="
          space-y-2
          p-4
        "
      >

        {FIELD_TYPES.map(
          (field) => (

            <Button
              key={field.type}
              variant="outline"
              className="
                h-10
                w-full
                justify-start
                rounded-lg
                font-normal
              "
              onClick={() =>
                handleAddField(
                  field.type,
                  field.label
                )
              }
            >

              <Plus
                className="
                  mr-2
                  h-4
                  w-4
                "
              />

              {field.label}

            </Button>

          )
        )}

      </div>

    </aside>
  );
}