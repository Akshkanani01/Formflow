"use client";

import {
  ResponseDialog,
} from "./response-dialog";



type ResponseTableProps = {

  formId:string;

  responses: {

    id:string;

    submittedAt:Date;

    answers: {

      id:string;

      value:unknown;

      field:{

        label:string;

        type:string;

      };

    }[];

  }[];

};







export function ResponsesTable({

  formId,

  responses,

}:ResponseTableProps){





  if(responses.length === 0){

    return (

      <div
        className="
          rounded-2xl
          border
          border-dashed
          bg-background
          p-8
          text-center
          sm:p-10
        "
      >

        <h3
          className="
            text-lg
            font-semibold
          "
        >

          No responses yet

        </h3>


        <p
          className="
            mt-2
            text-sm
            text-muted-foreground
          "
        >

          Submitted responses will appear here.

        </p>


      </div>

    );

  }









  return (

    <>

      {/* Mobile Cards */}

      <div
        className="
          space-y-4
          lg:hidden
        "
      >

        {
          responses.map(

            (response,index)=>(


              <div

                key={response.id}

                className="
                  rounded-2xl
                  border
                  bg-background
                  p-5
                  shadow-sm
                "

              >



                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <p
                    className="
                      text-sm
                      font-semibold
                    "
                  >

                    Response #{index + 1}

                  </p>


                  <ResponseDialog

                    formId={formId}

                    submissionId={
                      response.id
                    }

                  />


                </div>






                <p

                  className="
                    mt-2
                    text-xs
                    text-muted-foreground
                  "

                >

                  {
                    new Intl.DateTimeFormat(
                      "en-IN",
                      {
                        day:"2-digit",
                        month:"short",
                        year:"numeric",
                        hour:"2-digit",
                        minute:"2-digit",
                      }
                    ).format(
                      new Date(
                        response.submittedAt
                      )
                    )
                  }


                </p>







                <div

                  className="
                    mt-4
                    space-y-3
                  "

                >

                  {
                    response.answers
                    .slice(0,3)
                    .map(

                      (answer)=>(


                        <div

                          key={answer.id}

                          className="
                            rounded-xl
                            bg-muted/30
                            p-3
                          "

                        >


                          <p
                            className="
                              text-xs
                              font-medium
                              text-muted-foreground
                            "
                          >

                            {
                              answer.field.label
                            }

                          </p>



                          <p
                            className="
                              mt-1
                              break-words
                              text-sm
                            "
                          >

                            {
                              typeof answer.value === "string"

                              ? answer.value

                              : JSON.stringify(
                                  answer.value
                                )
                            }

                          </p>


                        </div>


                      )

                    )
                  }




                  {
                    response.answers.length > 3 && (

                      <p
                        className="
                          text-xs
                          text-muted-foreground
                        "
                      >

                        +

                        {
                          response.answers.length - 3
                        }

                        {" "}
                        more answers

                      </p>

                    )
                  }


                </div>


              </div>


            )

          )
        }


      </div>









      {/* Desktop Table */}

      <div

        className="
          hidden
          overflow-hidden
          rounded-2xl
          border
          bg-background
          lg:block
        "

      >

        <table
          className="
            w-full
            text-sm
          "
        >

          <thead
            className="
              border-b
              bg-muted/40
            "
          >

            <tr>

              <th className="px-5 py-4 text-left">
                #
              </th>


              <th className="px-5 py-4 text-left">
                Submitted
              </th>


              <th className="px-5 py-4 text-left">
                Answers
              </th>


              <th className="px-5 py-4 text-right">
                Action
              </th>


            </tr>

          </thead>





          <tbody>

            {
              responses.map(

                (response,index)=>(


                  <tr

                    key={response.id}

                    className="
                      border-b
                      last:border-0
                      hover:bg-muted/20
                    "

                  >


                    <td className="px-5 py-4 font-medium">

                      {index + 1}

                    </td>




                    <td className="px-5 py-4 text-muted-foreground">

                      {
                        new Intl.DateTimeFormat(
                          "en-IN",
                          {
                            day:"2-digit",
                            month:"2-digit",
                            year:"numeric",
                            hour:"2-digit",
                            minute:"2-digit",
                          }
                        ).format(
                          new Date(
                            response.submittedAt
                          )
                        )
                      }

                    </td>





                    <td className="max-w-md px-5 py-4">

                      <div className="space-y-2">

                        {
                          response.answers
                          .slice(0,3)
                          .map(

                            (answer)=>(

                              <div
                                key={answer.id}
                                className="truncate"
                              >

                                <span className="font-medium">

                                  {answer.field.label}:

                                </span>

                                {" "}

                                {
                                  typeof answer.value === "string"

                                  ? answer.value

                                  : JSON.stringify(
                                      answer.value
                                    )
                                }


                              </div>

                            )

                          )
                        }


                      </div>


                    </td>





                    <td className="px-5 py-4 text-right">


                      <ResponseDialog

                        formId={formId}

                        submissionId={
                          response.id
                        }

                      />


                    </td>


                  </tr>


                )

              )
            }


          </tbody>


        </table>


      </div>


    </>

  );

}