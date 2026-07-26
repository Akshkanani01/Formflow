"use server";

import { prisma } from "@/lib/prisma";



type JsonValue =
  | string
  | number
  | boolean
  | JsonValue[]
  | {
      [key: string]: JsonValue;
    };



type CreateSubmissionInput = {

  formId: string;

  answers: {

    fieldId: string;

    value: unknown;

  }[];

};







function normalizeJsonValue(

  value: unknown

): JsonValue | null {



  if (value === null) {

    return null;

  }





  if (

    typeof value === "string" ||

    typeof value === "number" ||

    typeof value === "boolean"

  ) {

    return value;

  }







  if (Array.isArray(value)) {

    return value.map(

      (item) =>

        normalizeJsonValue(item) ?? ""

    );

  }







  if (

    typeof value === "object" &&

    value !== null

  ) {



    const result: {

      [key: string]: JsonValue;

    } = {};




    Object.entries(value).forEach(

      ([key, val]) => {



        result[key] =

          normalizeJsonValue(val) ?? "";



      }

    );




    return result;

  }







  return String(value);

}









export async function createSubmission({

  formId,

  answers,

}: CreateSubmissionInput) {



  const form =

    await prisma.form.findUnique({

      where: {

        id: formId,

      },


      select: {

        id: true,

        title: true,

        workspaceId: true,

        createdById: true,

      },

    });






  if (!form) {

    throw new Error(

      "Form not found."

    );

  }









  const submission =

    await prisma.formSubmission.create({

      data: {



        formId,



        answers: {

          create:

            answers.map(

              (answer) => ({



                field: {

                  connect: {

                    id:

                      answer.fieldId,

                  },

                },



                value:

                  normalizeJsonValue(

                    answer.value

                  ) ?? {},



              })

            ),


        },


      },


    });









  await prisma.notification.create({

    data: {


      userId:

        form.createdById,



      type:

        "RESPONSE",



      title:

        "New form response",



      message:

        `New response received for ${form.title}`,



      metadata: {

        formId:

          form.id,



        submissionId:

          submission.id,

      },


    },


  });











  await prisma.auditLog.create({

    data: {


      workspaceId:

        form.workspaceId,



      userId:

        form.createdById,



      action:

        "CREATE",



      entityType:

        "FORM_SUBMISSION",



      entityId:

        submission.id,



      description:

        "New form submission received",


    },


  });











  return {

    success: true,


    submissionId:

      submission.id,


  };


}