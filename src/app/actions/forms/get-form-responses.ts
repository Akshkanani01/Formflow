"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


type GetFormResponsesInput = {
  formId: string;
};



export async function getFormResponses({
  formId,
}: GetFormResponsesInput) {


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

      },

    });





  if (!form) {

    return {

      form: null,

      responses: [],

    };

  }







  const responses =
    await prisma.formSubmission.findMany({

      where: {

        formId: form.id,

      },


      orderBy: {

        submittedAt:
          "desc",

      },


      include: {

        answers: {

          orderBy: {

            id:
              "asc",

          },


          include: {

            field: {

              select: {

                id: true,

                label: true,

                type: true,

              },

            },

          },

        },

      },

    });







  return {

    form,

    responses,

  };


}