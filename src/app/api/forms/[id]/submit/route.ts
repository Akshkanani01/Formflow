import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";



type SubmitAnswer = {

  fieldId:string;

  value:unknown;

};



type SubmitBody = {

  answers:SubmitAnswer[];

};





const FormStatus = {

  PUBLISHED:"PUBLISHED",

} as const;









export async function POST(

  request:Request,

  context:{

    params:Promise<{

      id:string;

    }>;

  }

){


  try {


    const {

      id:formId,

    } = await context.params;









    const body =

      await request.json() as SubmitBody;









    if(

      !body.answers ||

      !Array.isArray(body.answers)

    ){


      return NextResponse.json(

        {

          error:

            "Invalid answers",

        },

        {

          status:400,

        }

      );

    }









    const form =

      await prisma.form.findFirst({

        where:{

          id:formId,


          status:

            FormStatus.PUBLISHED,

        },


        include:{

          fields:{

            select:{

              id:true,

              label:true,

              required:true,

            },

          },

        },

      });









    if(!form){


      return NextResponse.json(

        {

          error:

            "Form not available",

        },

        {

          status:404,

        }

      );


    }









    const fieldMap =

      new Map(

        form.fields.map(

          (field)=>

            [

              field.id,

              field,

            ]

        )

      );









    for(const answer of body.answers){



      const field =

        fieldMap.get(

          answer.fieldId

        );





      if(!field){


        return NextResponse.json(

          {

            error:

              "Invalid field",

          },

          {

            status:400,

          }

        );


      }







      if(

        field.required &&

        (

          answer.value === undefined ||

          answer.value === null ||

          answer.value === "" ||

          (

            Array.isArray(answer.value) &&

            answer.value.length === 0

          )

        )

      ){



        return NextResponse.json(

          {

            error:

              `${field.label} is required`,

          },

          {

            status:400,

          }

        );


      }


    }









    const submission =

      await prisma.formSubmission.create({

        data:{



          formId:

            form.id,





          answers:{



            create:



              body.answers.map(

                (answer)=>(

                {



                  field:{


                    connect:{


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


                }

              )

            ),



          },


        },



        select:{


          id:true,


        },


      });









    return NextResponse.json(

      {

        success:true,


        submissionId:

          submission.id,


      },

      {

        status:201,

      }

    );







  }catch(error){



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

        status:500,

      }

    );


  }


}