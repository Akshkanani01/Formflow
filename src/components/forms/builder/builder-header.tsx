"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Eye,
  Rocket,
  Undo2,
  Redo2,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  useBuilder,
} from "./builder-context";


type BuilderHeaderProps = {
  title: string;
};



export function BuilderHeader({
  title,
}: BuilderHeaderProps) {


  const {
    undo,
    redo,
    canUndo,
    canRedo,
  } = useBuilder();



  return (

    <header
      className="
        flex
        h-16
        shrink-0
        items-center
        justify-between
        border-b
        bg-background
        px-6
      "
    >


      {/* Left */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <Link
          href="/dashboard/forms"
          className="
            inline-flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            transition
            hover:bg-muted
          "
        >

          <ArrowLeft
            className="
              h-4
              w-4
            "
          />

        </Link>




        <div>

          <h1
            className="
              text-sm
              font-semibold
            "
          >

            {title}

          </h1>


          <div
            className="
              mt-1
              flex
              items-center
              gap-1
              text-xs
              text-muted-foreground
            "
          >

            <CheckCircle2
              className="
                h-3
                w-3
                text-emerald-500
              "
            />

            Saved

          </div>


        </div>


      </div>





      {/* Right */}

      <div
        className="
          flex
          items-center
          gap-2
        "
      >


        {/* Undo */}

        <Button

          type="button"

          variant="ghost"

          size="icon"

          disabled={
            !canUndo
          }

          onClick={undo}

        >

          <Undo2
            className="
              h-4
              w-4
            "
          />

        </Button>





        {/* Redo */}

        <Button

          type="button"

          variant="ghost"

          size="icon"

          disabled={
            !canRedo
          }

          onClick={redo}

        >

          <Redo2
            className="
              h-4
              w-4
            "
          />

        </Button>





        {/* Preview */}

        <Button

          type="button"

          variant="outline"

          size="sm"

        >

          <Eye
            className="
              mr-2
              h-4
              w-4
            "
          />

          Preview

        </Button>





        {/* Publish */}

        <Button

          type="button"

          size="sm"

        >

          <Rocket
            className="
              mr-2
              h-4
              w-4
            "
          />

          Publish

        </Button>


      </div>


    </header>

  );
}