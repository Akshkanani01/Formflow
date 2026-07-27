import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";



type SubmitAnswer = {

  fieldId: string;

  value: unknown;

};



type SubmitBody = {

  answers: SubmitAnswer[];

};







export async function POST(

  request: Request,

  context: {

    params: Promise<{

      id: string;

    }>;

  }

) {


  try {


    const {

      id: formId,

    } = await context.params;





    const body =

      await request.json() as SubmitBody;






    if (

      !body.answers ||

      !Array.isArray(body.answers)

    ) {


      return NextResponse.json(

        {

          error:

            "Invalid answers",

        },

        {

          status: 400,

        }

      );

    }







    const form =

      await prisma.form.findUnique({

        where: {

          id: formId,

        },

        select: {

          id: true,

          status: true,

        },

      });







    if (!form) {


      return NextResponse.json(

        {

          error:

            "Form not found",

        },

        {

          status: 404,

        }

      );


    }









    const submission =

      await prisma.formSubmission.create({

        data: {


          formId:

            form.id,





          answers: {


            create:


              body.answers.map(

                (answer) => ({



                  field: {


                    connect: {


                      id:

                        answer.fieldId,


                    },


                  },





                  value:


                    answer.value === undefined

                      ? null

                      : JSON.parse(

                          JSON.stringify(

                            answer.value

                          )

                        ),



                })

              ),


          },


        },



        select: {


          id: true,


        },


      });









    return NextResponse.json(

      {


        success: true,


        submissionId:

          submission.id,


      },

      {


        status: 201,


      }


    );







  }

  catch(error){


    console.error(

      "FORM SUBMISSION ERROR:",

      error

    );





    return NextResponse.json(

      {


        error:

          "Something went wrong",



      },

      {


        status: 500,


      }


    );


  }


}