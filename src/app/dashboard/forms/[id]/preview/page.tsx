import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  PublishButton,
} from "@/components/forms/preview/publish-button";
import {
  ArrowLeft,
  Rocket,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { getForm } from "@/lib/forms/get-form";
import { getOrCreateWorkspace } from "@/lib/workspace/get-or-create-workspace";

import {
  FormFieldPreview,
} from "@/components/forms/preview/form-field-preview";

import {
  FormSubmitButton,
} from "@/components/forms/preview/form-submit-button";



type PreviewPageProps = {
  params: Promise<{
    id: string;
  }>;
};



export default async function PreviewPage({
  params,
}: PreviewPageProps) {


  const session =
    await auth.api.getSession({
      headers: await headers(),
    });



  if (!session) {
    redirect("/login");
  }




  const workspace =
    await getOrCreateWorkspace({
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    });




  const { id } =
    await params;




  const form =
    await getForm({
      workspaceId: workspace.id,
      formId: id,
    });




  if (!form) {
    notFound();
  }




  const fields =
    await prisma.formField.findMany({

      where: {
        formId: form.id,
      },

      orderBy: {
        position: "asc",
      },

    });





  const submitFields =
    fields.map((field)=>({

      id:
        field.id,

      type:
        field.type,

      label:
        field.label,

      placeholder:
        field.placeholder,

      required:
        field.required,

      settings:
        field.settings &&
        typeof field.settings === "object" &&
        !Array.isArray(field.settings)

          ? field.settings as {
              min?: number;
              max?: number;
              options?: string[];
            }

          : undefined,

    }));





  return (

    <main
      className="
        min-h-screen
        bg-muted/20
        px-6
        py-10
      "
    >


      {/* Top Bar */}

      <div
        className="
          mx-auto
          mb-6
          flex
          max-w-3xl
          items-center
          justify-between
        "
      >


        <Link
          href={`/dashboard/forms/${form.id}/builder`}
        >

          <Button
            variant="outline"
            size="sm"
          >

            <ArrowLeft
              className="
                mr-2
                h-4
                w-4
              "
            />

            Back to Builder

          </Button>

        </Link>





        <PublishButton
  formId={form.id}
/>



      </div>







      <div
        className="
          mx-auto
          max-w-3xl
          rounded-3xl
          border
          bg-background
          p-8
          shadow-sm
        "
      >



        {/* Header */}

        <div
          className="
            border-b
            pb-6
          "
        >

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            {form.title}
          </h1>



          {form.description && (

            <p
              className="
                mt-3
                text-muted-foreground
              "
            >
              {form.description}
            </p>

          )}

        </div>







        {/* Fields */}

        <div
          className="
            mt-8
            space-y-8
          "
        >

          {fields.map(
            (field)=>(

              <div
                key={field.id}
                className="
                  space-y-3
                "
              >

                <label
                  className="
                    text-sm
                    font-semibold
                  "
                >

                  {field.label}


                  {field.required && (

                    <span
                      className="
                        ml-1
                        text-destructive
                      "
                    >
                      *
                    </span>

                  )}

                </label>




                <FormFieldPreview

                  field={{

                    type:
                      field.type,

                    label:
                      field.label,

                    placeholder:
                      field.placeholder,

                    required:
                      field.required,

                    settings:
                      submitFields.find(
                        (item)=>
                          item.id === field.id
                      )?.settings,

                  }}

                />

              </div>

            )
          )}


        </div>






        {/* Submit */}

        <div
          className="
            mt-10
            border-t
            pt-6
          "
        >

          <FormSubmitButton

            formId={
              form.id
            }

            fields={
              submitFields
            }

          />

        </div>



      </div>


    </main>

  );

}