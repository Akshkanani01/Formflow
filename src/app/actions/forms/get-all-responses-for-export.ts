"use server";

import {
  prisma,
} from "@/lib/prisma";





type GetAllResponsesInput = {

  formId: string;

};





type SubmissionAnswer = {

  fieldId: string;

  value: unknown;

};





type SubmissionWithAnswers = {

  submittedAt: Date;

  answers: SubmissionAnswer[];

};





type FormField = {

  id: string;

  label: string;

};









export async function getAllResponsesForExport({

  formId,

}: GetAllResponsesInput) {



  const submissions: SubmissionWithAnswers[] =

    await prisma.formSubmission.findMany({

      where: {

        formId,

      },


      orderBy: {

        submittedAt: "desc",

      },


      include: {

        answers: {

          select: {

            fieldId: true,

            value: true,

          },

        },

      },


    });







  const fields: FormField[] =

    await prisma.formField.findMany({

      where: {

        formId,

      },


      orderBy: {

        createdAt: "asc",

      },


      select: {

        id: true,

        label: true,

      },


    });









  return submissions.map(

    (submission) => ({

      submittedAt:

        new Intl.DateTimeFormat(

          "en-IN",

          {

            day: "2-digit",

            month: "short",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit",

            hour12: true,

          }

        ).format(

          submission.submittedAt

        ),





      fields:

        fields.map(

          (field: FormField) =>

            field.label

        ),





      values:

        fields.map(

          (field: FormField) => {



            const answer =

              submission.answers.find(

                (item) =>

                  item.fieldId === field.id

              );





            if (!answer) {

              return "";

            }







            if (

              typeof answer.value === "object"

              &&

              answer.value !== null

              &&

              "fileName" in answer.value

            ) {



              const file =

                answer.value as {

                  fileName?: string;

                  url?: string;

                };





              return (

                `${file.fileName ?? ""} ${file.url ?? ""}`

              );

            }







            return String(

              answer.value ?? ""

            );


          }

        ),


    })

  );


}