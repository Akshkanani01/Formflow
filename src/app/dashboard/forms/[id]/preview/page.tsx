import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import {
  PublishButton,
} from "@/components/forms/preview/publish-button";

import {
  ArrowLeft,
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



type PreviewField = {

  id: string;

  type: string;

  label: string;

  placeholder: string | null;

  required: boolean;

  settings: unknown;

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







  const fields: PreviewField[] =

    await prisma.formField.findMany({

      where: {

        formId: form.id,

      },

      orderBy: {

        position: "asc",

      },

    });








  const submitFields =

    fields.map(

      (field: PreviewField) => ({

        id: field.id,

        type: field.type,

        label: field.label,

        placeholder: field.placeholder,

        required: field.required,

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

      })

    );








  return (


    <main

      className="
        min-h-screen

        bg-muted/20

        px-4

        py-6

        sm:px-6

        sm:py-10
      "

    >







      {/* Top Actions */}

      <div

        className="
          mx-auto
          mb-5

          flex
          max-w-3xl

          flex-col
          gap-3

          sm:flex-row
          sm:items-center
          sm:justify-between
        "

      >



        <Link

          href={`/dashboard/forms/${form.id}/builder`}

          className="
            w-full

            sm:w-auto
          "

        >

          <Button

            variant="outline"

            size="sm"

            className="
              w-full

              sm:w-auto
            "

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









      {/* Form Card */}

      <div

        className="
          mx-auto

          max-w-3xl

          rounded-2xl

          border

          bg-background

          p-5

          shadow-sm

          sm:rounded-3xl

          sm:p-8
        "

      >








        <div

          className="
            border-b

            pb-5

            sm:pb-6
          "

        >


          <h1

            className="
              break-words

              text-2xl

              font-bold

              sm:text-3xl
            "

          >

            {form.title}


          </h1>







          {
            form.description && (

              <p

                className="
                  mt-3

                  text-sm

                  text-muted-foreground

                  sm:text-base
                "

              >

                {form.description}


              </p>

            )
          }



        </div>









        <div

          className="
            mt-6

            space-y-6

            sm:mt-8

            sm:space-y-8
          "

        >



          {
            fields.map(

              (field: PreviewField) => (


                <div

                  key={field.id}

                  className="
                    space-y-2
                  "

                >




                  <label

                    className="
                      text-sm

                      font-semibold
                    "

                  >

                    {field.label}



                    {
                      field.required && (

                        <span

                          className="
                            ml-1

                            text-destructive
                          "

                        >

                          *

                        </span>

                      )
                    }


                  </label>








                  <FormFieldPreview

                    field={{

                      type: field.type,

                      label: field.label,

                      placeholder: field.placeholder,

                      required: field.required,

                      settings:

                        submitFields.find(

                          (item) =>

                            item.id === field.id

                        )?.settings,

                    }}

                  />



                </div>


              )

            )
          }



        </div>









        <div

          className="
            mt-8

            border-t

            pt-5

            sm:mt-10

            sm:pt-6
          "

        >

          <FormSubmitButton


            formId={form.id}


            fields={submitFields}


          />


        </div>






      </div>





    </main>


  );

}