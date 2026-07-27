import { notFound } from "next/navigation";
import { headers } from "next/headers";

import { prisma } from "@/lib/prisma";

import {
  PublicFormClient,
} from "@/components/forms/public/public-form-client";



type PublicFormField = {

  id:string;

  type:string;

  label:string;

  placeholder:string | null;

  required:boolean;

  settings:unknown;

};





export const dynamic = "force-dynamic";





const FormStatus = {

  PUBLISHED:"PUBLISHED",

} as const;








type PublicFormPageProps = {

  params:Promise<{

    slug:string;

  }>;

};









export default async function PublicFormPage({

  params,

}:PublicFormPageProps){



  const {

    slug,

  } = await params;









  const form =

    await prisma.form.findFirst({

      where:{

        slug,

        status:

          FormStatus.PUBLISHED,

      },


      include:{

        fields:{

          orderBy:{

            position:"asc",

          },

        },

      },

    });









  if(!form){

    notFound();

  }









  const requestHeaders =

    await headers();









  await prisma.formView.create({

    data:{

      formId:

        form.id,


      userAgent:

        requestHeaders.get(

          "user-agent"

        ),



      referrer:

        requestHeaders.get(

          "referer"

        ),


    },

  });









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



      <div

        className="
          mx-auto
          w-full
          max-w-3xl
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

                (field:PublicFormField)=>({



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

                          options?:string[];

                          min?:number;

                          max?:number;

                          maxSize?:number;

                        }



                      : undefined,


                })

              ),


          }}

        />





      </div>





    </main>

  );

}