"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";



const FormStatus = {
  PUBLISHED: "PUBLISHED",
} as const;



const AuditAction = {
  PUBLISH: "PUBLISH",
} as const;





type PublishFormInput = {
  formId: string;
};





function slugify(value: string) {

  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

}







async function generateUniqueSlug(
  title: string,
  currentFormId: string
) {

  const baseSlug =
    slugify(title);


  let slug =
    baseSlug;


  let counter =
    2;





  while (

    await prisma.form.findFirst({

      where: {

        slug,

        NOT: {

          id:
            currentFormId,

        },

      },


      select: {

        id: true,

      },


    })

  ) {


    slug =
      `${baseSlug}-${counter}`;


    counter++;


  }



  return slug;

}









export async function publishForm({

  formId,

}: PublishFormInput) {



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

        title: true,

        slug: true,

        workspaceId: true,

      },


    });







  if (!form) {

    throw new Error(
      "Form not found."
    );

  }








  let finalSlug =
    form.slug;





  if (!finalSlug) {


    finalSlug =

      await generateUniqueSlug(

        form.title,

        form.id

      );


  }








  const updatedForm =

    await prisma.form.update({

      where: {

        id:
          form.id,

      },


      data: {

        slug:
          finalSlug,


        status:
          FormStatus.PUBLISHED,


        publishedAt:
          new Date(),

      },


      select: {

        id: true,

        slug: true,

        status: true,

        publishedAt: true,

      },


    });









  await prisma.auditLog.create({

    data: {

      workspaceId:
        form.workspaceId,


      userId:
        session.user.id,


      action:
        AuditAction.PUBLISH,


      entityType:
        "FORM",


      entityId:
        form.id,


      description:
        "Published form",

    },

  });









  return {

    success: true,


    publicUrl:
      `/forms/${updatedForm.slug}`,


    form:
      updatedForm,

  };


}