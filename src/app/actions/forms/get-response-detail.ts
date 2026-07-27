"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";



type GetResponseDetailInput = {

  formId: string;

  submissionId: string;

};







export async function getResponseDetail({

  formId,

  submissionId,

}: GetResponseDetailInput) {



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

      submission: null,

    };

  }







  const submission =
    await prisma.formSubmission.findFirst({

      where: {

        id: submissionId,

        formId: form.id,

      },


      include: {

        answers: {

          orderBy: {

            id: "asc",

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







  if (!submission) {

    return {

      form,

      submission: null,

    };

  }








  return {

    form,

    submission,

  };


}