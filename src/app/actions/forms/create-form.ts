"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getOrCreateWorkspace } from "@/lib/workspace/get-or-create-workspace";

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





function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}






async function generateUniqueSlug(
  workspaceId: string,
  title: string
) {
  const baseSlug = slugify(title);

  let slug = baseSlug;

  let counter = 2;

  while (
    await prisma.form.findFirst({

      where: {

        workspaceId,

        slug,

      },

      select: {

        id: true,

      },

    })
  ) {

    slug = `${baseSlug}-${counter}`;

    counter++;

  }


  return slug;
}







type CreateFormInput = {

  title: string;

  description?: string;

};









export async function createForm({

  title,

  description,

}: CreateFormInput) {



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







  const cleanTitle =
    title.trim();






  if (!cleanTitle) {

    throw new Error(
      "Form title is required."
    );

  }








  const slug =
    await generateUniqueSlug(

      workspace.id,

      cleanTitle

    );








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
                cleanTitle,



              description:
                description?.trim() || null,



              slug,



              status:
                FormStatus.DRAFT,



              createdById:
                session.user.id,



              updatedById:
                session.user.id,


            },

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
              `Created form "${createdForm.title}"`,


          },

        });








        return createdForm;


      }

    );








  return {

    success: true as const,

    formId:
      form.id,

  };

}