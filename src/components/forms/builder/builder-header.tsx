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
  formId: string;
};



export function BuilderHeader({
  title,
  formId,
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
        gap-3
        border-b
        bg-background
        px-3
        sm:px-6
      "

    >



      {/* Left */}

      <div

        className="
          flex
          min-w-0
          items-center
          gap-3
        "

      >

        <Link

          href="/dashboard/forms"

          className="
            inline-flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            hover:bg-muted
          "

        >

          <ArrowLeft
            className="h-4 w-4"
          />

        </Link>





        <div
          className="
            min-w-0
          "
        >

          <h1

            className="
              max-w-[160px]
              truncate
              text-sm
              font-semibold
              sm:max-w-none
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







      {/* Actions */}

      <div

        className="
          flex
          shrink-0
          items-center
          gap-1
          sm:gap-2
        "

      >


        <Button

          type="button"

          variant="ghost"

          size="icon"

          disabled={!canUndo}

          onClick={undo}

        >

          <Undo2
            className="h-4 w-4"
          />

        </Button>





        <Button

          type="button"

          variant="ghost"

          size="icon"

          disabled={!canRedo}

          onClick={redo}

        >

          <Redo2
            className="h-4 w-4"
          />

        </Button>







        <Link

          href={`/dashboard/forms/${formId}/preview`}

        >

          <Button

            type="button"

            variant="outline"

            size="sm"

          >

            <Eye

              className="
                h-4
                w-4
                sm:mr-2
              "

            />

            <span
              className="
                hidden
                sm:inline
              "
            >
              Preview
            </span>


          </Button>


        </Link>







        <Button

          type="button"

          size="sm"

        >

          <Rocket

            className="
              h-4
              w-4
              sm:mr-2
            "

          />

          <span
            className="
              hidden
              sm:inline
            "
          >
            Publish
          </span>


        </Button>





      </div>


    </header>

  );

}