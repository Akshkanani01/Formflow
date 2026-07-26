"use client";

import {
  FileText,
  ArrowRight,
} from "lucide-react";


import {
  Button,
} from "@/components/ui/button";


import type {
  FormTemplate,
} from "@/lib/forms/templates/templates";





type TemplateCardProps = {

  template: FormTemplate;

  onUse: (
    template: FormTemplate
  ) => void;

};







export function TemplateCard({

  template,

  onUse,

}:TemplateCardProps){



  return (

    <div
      className="
        group
        rounded-3xl
        border
        bg-background
        p-6
        shadow-sm
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
      "
    >



      {/* Icon */}

      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-primary/10
        "
      >

        <FileText
          className="
            h-6
            w-6
            text-primary
          "
        />

      </div>







      {/* Content */}

      <div
        className="
          mt-5
          space-y-3
        "
      >


        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >

          <h3
            className="
              text-lg
              font-semibold
              tracking-tight
            "
          >

            {template.title}

          </h3>



          <span
            className="
              rounded-full
              bg-muted
              px-3
              py-1
              text-xs
              text-muted-foreground
            "
          >

            {template.category}

          </span>


        </div>





        <p
          className="
            text-sm
            leading-6
            text-muted-foreground
          "
        >

          {template.description}

        </p>



      </div>








      {/* Fields Preview */}

      <div
        className="
          mt-5
          rounded-2xl
          bg-muted/30
          p-4
        "
      >

        <p
          className="
            text-xs
            font-medium
            text-muted-foreground
          "
        >

          Includes

        </p>



        <p
          className="
            mt-1
            text-sm
            font-semibold
          "
        >

          {
            template.fields.length
          }

          {" "}

          fields

        </p>


      </div>









      {/* Action */}

      <Button

        className="
          mt-6
          w-full
        "

        onClick={() =>

          onUse(template)

        }

      >

        Use Template


        <ArrowRight
          className="
            ml-2
            h-4
            w-4
            transition-transform
            group-hover:translate-x-1
          "
        />


      </Button>





    </div>

  );

}