import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import {
  PublicFormClient,
} from "@/components/forms/public/public-form-client";


type PublicFormField = {
  id: string;
  type: string;
  label: string;
  placeholder: string | null;
  required: boolean;
  settings: unknown;
};
export const dynamic = "force-dynamic";



const FormStatus = {

  PUBLISHED: "PUBLISHED",

} as const;





type PublicFormPageProps = {

  params: Promise<{

    slug: string;

  }>;

};







export default async function PublicFormPage({

  params,

}: PublicFormPageProps) {



  const {

    slug,

  } = await params;







  const form =

    await prisma.form.findFirst({

      where: {

        slug,

        status:

          FormStatus.PUBLISHED,

      },



      include: {

        fields: {

          orderBy: {

            position:

              "asc",

          },

        },

      },

    });







  if (!form) {

    notFound();

  }









  return (

    <main

      className="
        min-h-screen
        bg-muted/20
        px-6
        py-10
      "

    >



      <PublicFormClient

        form={{



          id:

            form.id,



          title:

            form.title,



          description:

            form.description,





          fields:
  form.fields.map(

    (field: PublicFormField) => ({



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

                        options?: string[];

                        min?: number;

                        max?: number;

                        maxSize?: number;

                      }



                    : undefined,



              })

            ),



        }}



      />



    </main>

  );

}