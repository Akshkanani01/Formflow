"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { mapFieldType } from "@/lib/forms/field-type-map";



type TransactionClient =
  Parameters<
    Parameters<
      typeof prisma.$transaction
    >[0]
  >[0];



type BuilderFieldInput = {

  id?: string;

  type: string;

  label: string;

  description?: string;

  placeholder?: string;

  required: boolean;

  settings?: {

    options?: string[];

    min?: number;

    max?: number;

    maxSize?: number;

    allowedTypes?: string[];

  };

};



type SaveBuilderFieldsInput = {

  formId: string;

  fields: BuilderFieldInput[];

};









export async function saveBuilderFields({

  formId,

  fields,

}: SaveBuilderFieldsInput) {



  const session =

    await auth.api.getSession({

      headers:
        await headers(),

    });





  if (!session) {

    redirect("/login");

  }







  const form =

    await prisma.form.findFirst({

      where: {

        id: formId,

        workspace: {

          members: {

            some: {

              userId:
                session.user.id,

            },

          },

        },

      },


      select: {

        id: true,

        workspaceId: true,

      },


    });







  if (!form) {

    throw new Error(

      "Form not found."

    );

  }









  await prisma.$transaction(

    async (tx: TransactionClient) => {



      const existingFields =

        await tx.formField.findMany({

          where: {

            formId,

          },


          select: {

            id: true,

          },


        });







      const existingIds =

  new Set<string>(

    existingFields.map(

      (field: { id: string }) =>

        field.id

    )

  );






      const incomingDbIds =

        fields

          .map(

            (field) =>

              field.id

          )

          .filter(

            (id): id is string =>

              typeof id === "string"

              &&

              existingIds.has(id)

          );







      const deletedIds =

        existingFields

          .map(

            (field) =>

              field.id

          )

          .filter(

            (id) =>

              !incomingDbIds.includes(id)

          );







      if (

        deletedIds.length > 0

      ) {



        await tx.formField.deleteMany({

          where: {

            id: {

              in: deletedIds,

            },

          },

        });


      }









      for (

        const [

          index,

          field,

        ]

        of fields.entries()

      ) {



        const data = {



          type:

            mapFieldType(

              field.type

            ),



          label:

            field.label,



          placeholder:

            field.placeholder || null,



          helpText:

            field.description || null,



          required:

            field.required,



          position:

            index,



          settings:

            field.settings ?? {},



        };







        if (

          typeof field.id === "string"

          &&

          existingIds.has(field.id)

        ) {



          await tx.formField.update({

            where: {

              id:

                field.id,

            },


            data,


          });





        } else {



          await tx.formField.create({

            data: {

              formId,


              ...data,


            },

          });


        }


      }









      await tx.auditLog.create({

        data: {



          workspaceId:

            form.workspaceId,



          userId:

            session.user.id,



          action:

            "UPDATE",



          entityType:

            "FORM",



          entityId:

            form.id,



          description:

            "Updated form builder fields",



        },


      });





    }

  );









  return {

    success: true,

  };


}