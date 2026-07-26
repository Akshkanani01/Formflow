import {
  getResponseDetail,
} from "@/app/actions/forms/get-response-detail";



type ResponseDetailPageProps = {

  params: Promise<{

    id:string;

    submissionId:string;

  }>;

};





export default async function ResponseDetailPage({

  params,

}:ResponseDetailPageProps){



  const {

    id,

    submissionId,

  } = await params;





  console.log(
    "RESPONSE PAGE FORM ID:",
    id
  );


  console.log(
    "RESPONSE PAGE SUBMISSION ID:",
    submissionId
  );






  const data =

    await getResponseDetail({

      formId:id,

      submissionId,

    });



if(!data){

  return (

    <div>
      Data not found
    </div>

  );

}


  console.log(
    "RESPONSE DETAIL DATA:",
    data
  );







  if(!data.submission){

    return (

      <main
        className="
          p-6
        "
      >

        <div
          className="
            rounded-2xl
            border
            bg-background
            p-8
          "
        >

          <h1
            className="
              text-xl
              font-bold
            "
          >

            Response not found

          </h1>


          <p
            className="
              mt-2
              text-sm
              text-muted-foreground
            "
          >

            No submission data available.

          </p>


        </div>


      </main>

    );

  }








  return (

    <main
      className="
        space-y-8
        p-6
      "
    >


      <section
        className="
          rounded-3xl
          border
          bg-background
          p-8
          shadow-sm
        "
      >

        <h1
          className="
            text-3xl
            font-bold
          "
        >

          Response Details

        </h1>



        <p
          className="
            mt-2
            text-muted-foreground
          "
        >

          {data.form.title}

        </p>



        <div
          className="
            mt-6
            grid
            gap-4
            md:grid-cols-3
          "
        >


          <div
            className="
              rounded-2xl
              border
              bg-muted/20
              p-4
            "
          >

            <p className="text-xs text-muted-foreground">
              Submitted At
            </p>


            <p className="mt-1 text-sm font-medium">

              {
                new Date(
                  data.submission.submittedAt
                ).toLocaleString()
              }

            </p>


          </div>





          <div
            className="
              rounded-2xl
              border
              bg-muted/20
              p-4
            "
          >

            <p className="text-xs text-muted-foreground">
              Submission ID
            </p>


            <p
              className="
                mt-1
                truncate
                text-sm
                font-medium
              "
            >

              {
                data.submission.id
              }

            </p>


          </div>






          <div
            className="
              rounded-2xl
              border
              bg-muted/20
              p-4
            "
          >

            <p className="text-xs text-muted-foreground">
              Total Answers
            </p>


            <p className="mt-1 text-2xl font-bold">

              {
                data.submission.answers.length
              }

            </p>


          </div>



        </div>


      </section>








      <section
        className="
          rounded-3xl
          border
          bg-background
          p-8
        "
      >

        <h2
          className="
            text-xl
            font-semibold
          "
        >

          Answers

        </h2>





        <div
          className="
            mt-6
            space-y-5
          "
        >

          {
            data.submission.answers.map(

              (answer)=>(

                <div
                  key={answer.id}
                  className="
                    rounded-2xl
                    border
                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <h3
                      className="
                        font-semibold
                      "
                    >

                      {
                        answer.field.label
                      }

                    </h3>



                    <span
                      className="
                        rounded-full
                        bg-muted
                        px-3
                        py-1
                        text-xs
                      "
                    >

                      {
                        answer.field.type
                      }

                    </span>


                  </div>





                  <div
                    className="
                      mt-4
                      rounded-xl
                      bg-muted/30
                      p-4
                    "
                  >

                    {
                      typeof answer.value === "string"

                        ? answer.value

                        : JSON.stringify(
                            answer.value,
                            null,
                            2
                          )
                    }


                  </div>


                </div>

              )

            )
          }


        </div>


      </section>



    </main>

  );

}