"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";



type PublicSubmitInput = {

  formId: string;

  answers: {

    fieldId: string;

    value: unknown;

  }[];

};





function normalizeAnswerValue(
  value: unknown
): Prisma.InputJsonValue | Prisma.JsonNullValueInput {


  if (value instanceof File) {

    return {

      fileName:
        value.name,

      size:
        value.size,

      type:
        value.type,

    };

  }



  if (
    Array.isArray(value)
  ) {

    return value.map(
      (item)=>
        normalizeAnswerValue(item)
    ) as Prisma.InputJsonValue;

  }





  if (
    value !== null
    &&
    typeof value === "object"
  ) {

    return JSON.parse(
      JSON.stringify(value)
    ) as Prisma.InputJsonValue;

  }





  if (
    value === null
  ) {

    return Prisma.JsonNull;

  }




  return value as Prisma.InputJsonValue;

}







export async function publicSubmit({

  formId,

  answers,

}: PublicSubmitInput) {




  const form =
    await prisma.form.findFirst({

      where: {

        id: formId,

        status:
          "PUBLISHED",

      },


      select: {

        id:true,

        title:true,

        workspaceId:true,

        createdById:true,

      },

    });







  if(!form){

    throw new Error(
      "Published form not found."
    );

  }








  const submission =

    await prisma.formSubmission.create({

      data:{


        formId:
          form.id,



        answers:{

          create:

            answers.map(

              (answer)=>({

                field:{

                  connect:{

                    id:
                      answer.fieldId,

                  },

                },


                value:

                  normalizeAnswerValue(
                    answer.value
                  ),


              })

            ),


        },


      },

    });









  await prisma.notification.create({

    data:{


      userId:
        form.createdById,



      type:
        "RESPONSE",



      title:
        "New response received",



      message:
        `New response for ${form.title}`,



      metadata:{

        formId:
          form.id,


        submissionId:
          submission.id,

      },


    },

  });









  await prisma.auditLog.create({

    data:{


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
        "New public form submission received",


    },

  });







  return {

    success:true,


    submissionId:
      submission.id,

  };


}