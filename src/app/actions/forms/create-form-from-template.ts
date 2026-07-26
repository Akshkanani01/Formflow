"use server";

import {
  headers,
} from "next/headers";

import {
  redirect,
} from "next/navigation";

import {
  auth,
} from "@/lib/auth";

import {
  prisma,
} from "@/lib/prisma";

import {
  getOrCreateWorkspace,
} from "@/lib/workspace/get-or-create-workspace";

import {
  formTemplates,
} from "@/lib/forms/templates/templates";

import {
  mapFieldType,
} from "@/lib/forms/field-type-map";



type TransactionClient =
  Parameters<
    Parameters<
      typeof prisma.$transaction
    >[0]
  >[0];



const FormStatus = {
  DRAFT: "DRAFT",
} as const;



const AuditAction = {
  CREATE: "CREATE",
} as const;





type CreateFormFromTemplateInput = {
  templateId: string;
};







export async function createFormFromTemplate({
  templateId,
}: CreateFormFromTemplateInput) {



  const session =
    await auth.api.getSession({

      headers:
        await headers(),

    });





  if (!session) {

    redirect("/login");

  }






  const workspace =
    await getOrCreateWorkspace({

      id:
        session.user.id,

      name:
        session.user.name,

      email:
        session.user.email,

    });







  const template =
    formTemplates.find(

      (item) =>
        item.id === templateId

    );






  if (!template) {

    throw new Error(
      "Template not found."
    );

  }








  const form =
    await prisma.$transaction(

      async (
        tx: TransactionClient
      ) => {



        const createdForm =
          await tx.form.create({

            data: {


              workspaceId:
                workspace.id,



              title:
                template.title,



              description:
                template.description,



              slug:
                `${template.id}-${Date.now()}`,



              status:
                FormStatus.DRAFT,



              createdById:
                session.user.id,



              updatedById:
                session.user.id,


            },

          });









        await tx.formField.createMany({

          data:

            template.fields.map(

              (field, index) => ({



                formId:
                  createdForm.id,



                type:
                  mapFieldType(
                    field.type
                  ),



                label:
                  field.label,



                placeholder:
                  field.placeholder ?? null,



                helpText:
                  field.description ?? null,



                required:
                  field.required,



                position:
                  index,



                settings:
                  field.settings ?? {},



              })

            ),

        });









        await tx.auditLog.create({

          data: {


            workspaceId:
              workspace.id,



            userId:
              session.user.id,



            action:
              AuditAction.CREATE,



            entityType:
              "FORM",



            entityId:
              createdForm.id,



            description:
              `Created form from template "${template.title}"`,


          },

        });







        return createdForm;


      }

    );








  return {

    success: true,

    formId:
      form.id,

  };


}