import { notFound } from "next/navigation";


import {
  getFormResponses,
} from "@/app/actions/forms/get-form-responses";


import {
  ResponsesTable,
} from "@/components/forms/responses/responses-table";


import {
  ExportAllResponsesButton,
} from "@/components/forms/responses/export-all-responses-button";





type ResponsesPageProps = {

  params: Promise<{

    id:string;

  }>;

};







export default async function ResponsesPage({

  params,

}:ResponsesPageProps){



  const {
    id,
  } = await params;







  const data =

    await getFormResponses({

      formId:id,

    });








  if(!data.form){

    notFound();

  }









  return (

    <main

      className="
        space-y-8
        p-6
      "

    >





      {/* Header */}

      <section

        className="
          rounded-3xl
          border
          bg-background
          p-8
          shadow-sm
        "

      >



        <div

          className="
            flex
            items-center
            justify-between
            gap-6
          "

        >




          <div>


            <h1

              className="
                text-3xl
                font-bold
                tracking-tight
              "

            >

              Responses

            </h1>





            <p

              className="
                mt-2
                text-muted-foreground
              "

            >

              {data.form.title}

            </p>



          </div>









          <div

            className="
              flex
              items-center
              gap-4
            "

          >



            <ExportAllResponsesButton

              formId={
                data.form.id
              }

            />





            <div

              className="
                rounded-2xl
                border
                bg-muted/30
                px-6
                py-4
                text-center
              "

            >

              <p

                className="
                  text-xs
                  text-muted-foreground
                "

              >

                Total Responses

              </p>




              <p

                className="
                  mt-1
                  text-3xl
                  font-bold
                "

              >

                {
                  data.responses.length
                }

              </p>



            </div>



          </div>





        </div>





      </section>









      {/* Table */}


      <section>


        <ResponsesTable


          formId={

            data.form.id

          }



          responses={

            data.responses

          }



        />



      </section>





    </main>

  );

}