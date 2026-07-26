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
          p-10
          text-center
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

    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        bg-background
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


            <th
              className="
                px-5
                py-4
                text-left
              "
            >

              #

            </th>



            <th
              className="
                px-5
                py-4
                text-left
              "
            >

              Submitted

            </th>



            <th
              className="
                px-5
                py-4
                text-left
              "
            >

              Answers

            </th>



            <th
              className="
                px-5
                py-4
                text-right
              "
            >

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



                  <td
                    className="
                      px-5
                      py-4
                      font-medium
                    "
                  >

                    {index + 1}

                  </td>







                  <td
                    className="
                      px-5
                      py-4
                      text-muted-foreground
                    "
                  >

                    {
  (() => {

    const date =
      new Date(
        response.submittedAt
      );


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "-";
    }


    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }
    ).format(date);


  })()
}

                  </td>







                  <td
                    className="
                      max-w-md
                      px-5
                      py-4
                    "
                  >

                    <div
                      className="
                        space-y-2
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
                                truncate
                              "

                            >

                              <span
                                className="
                                  font-medium
                                "
                              >

                                {
                                  answer.field.label
                                }:

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




                      {
                        response.answers.length > 3 && (

                          <span
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

                          </span>

                        )
                      }


                    </div>


                  </td>








                  <td
                    className="
                      px-5
                      py-4
                      text-right
                    "
                  >

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

  );

}