"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";



type DeleteFormInput = {
  formId: string;
};





export async function deleteForm({

  formId,

}: DeleteFormInput) {



  const session =

    await auth.api.getSession({

      headers: await headers(),

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

        workspaceId: true,

      },

    });







  if (!form) {

    throw new Error(
      "Form not found."
    );

  }








  await prisma.$transaction(async (tx)=>{



    await tx.submissionAnswer.deleteMany({

      where: {

        submission: {

          formId: form.id,

        },

      },

    });






    await tx.formSubmission.deleteMany({

      where: {

        formId: form.id,

      },

    });







    await tx.formField.deleteMany({

      where: {

        formId: form.id,

      },

    });







    await tx.form.delete({

      where: {

        id: form.id,

      },

    });







    await tx.auditLog.create({

      data: {

        workspaceId:
          form.workspaceId,


        userId:
          session.user.id,


        action:
          "DELETE",


        entityType:
          "FORM",


        entityId:
          form.id,


        description:
          `Deleted form: ${form.title}`,

      },

    });



  });






  return {

    success:true,

  };


}