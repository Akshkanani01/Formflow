"use client";

import {
  useState,
} from "react";

import {
  Loader2,
  X,
  FileText,
  Download,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  getResponseDetail,
} from "@/app/actions/forms/get-response-detail";



type ResponseDialogProps = {

  formId:string;

  submissionId:string;

};



type ResponseData = Awaited<
  ReturnType<typeof getResponseDetail>
>;







export function ResponseDialog({

  formId,

  submissionId,

}:ResponseDialogProps){


  const [open,setOpen] =
    useState(false);


  const [loading,setLoading] =
    useState(false);


  const [data,setData] =
    useState<ResponseData | null>(null);





  async function openDialog(){


    setOpen(true);



    if(data){
      return;
    }



    try{

      setLoading(true);



      const result =
        await getResponseDetail({

          formId,

          submissionId,

        });



      setData(result);



    }finally{

      setLoading(false);

    }


  }






  function closeDialog(){

    setOpen(false);

  }






  function formatDate(value:unknown){

    if(!value){
      return "-";
    }


    const date =
      new Date(
        String(value)
      );



    if(
      Number.isNaN(
        date.getTime()
      )
    ){
      return "-";
    }



    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day:"2-digit",
        month:"short",
        year:"numeric",
        hour:"2-digit",
        minute:"2-digit",
        hour12:true,
      }
    ).format(date);

  }








  function renderAnswerValue(
    value:unknown
  ){



    if(typeof value === "string"){

      return value;

    }







    if(
      typeof value === "object"
      &&
      value !== null
      &&
      "fileName" in value
    ){


      const file =
        value as {
          url?:string;
          fileName:string;
          size:number;
          type:string;
        };



      return (

        <div
          className="
            rounded-xl
            border
            bg-background
            p-4
          "
        >

          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >



            <div
              className="
                flex
                min-w-0
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                "
              >

                <FileText
                  className="
                    h-5
                    w-5
                    text-primary
                  "
                />

              </div>




              <div
                className="
                  min-w-0
                "
              >

                <p
                  className="
                    truncate
                    text-sm
                    font-medium
                  "
                >

                  {file.fileName}

                </p>



                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >

                  {file.type}

                  {" • "}

                  {
                    Math.round(
                      file.size / 1024
                    )
                  }

                  KB

                </p>


              </div>


            </div>






            {
              file.url && (

                <a

                  href={file.url}

                  download={file.fileName}

                  target="_blank"

                  rel="noreferrer"

                  className="
                    inline-flex
                    h-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    px-3
                    text-sm
                    font-medium
                    hover:bg-muted
                  "

                >

                  <Download
                    className="
                      mr-2
                      h-4
                      w-4
                    "
                  />

                  Download


                </a>

              )
            }


          </div>


        </div>

      );

    }







    return (

      <pre
        className="
          whitespace-pre-wrap
          break-words
          text-sm
        "
      >

        {
          JSON.stringify(
            value,
            null,
            2
          )
        }

      </pre>

    );

  }







  return (

    <>

      <Button

        size="sm"

        variant="outline"

        onClick={openDialog}

      >

        View

      </Button>





      {
        open && (

          <div

            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/50
              p-3
              sm:p-6
            "

            onClick={closeDialog}

          >



            <div

              className="
                flex
                max-h-[92vh]
                w-full
                max-w-4xl
                flex-col
                overflow-hidden
                rounded-2xl
                border
                bg-background
                shadow-2xl
                sm:rounded-3xl
              "

              onClick={(e)=>
                e.stopPropagation()
              }

            >




              {/* Header */}

              <div

                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                  border-b
                  px-4
                  py-4
                  sm:px-8
                  sm:py-6
                "

              >

                <div className="min-w-0">

                  <h2
                    className="
                      truncate
                      text-xl
                      font-bold
                      sm:text-2xl
                    "
                  >

                    Response Details

                  </h2>


                  {
                    data?.form && (

                      <p
                        className="
                          mt-1
                          truncate
                          text-sm
                          text-muted-foreground
                        "
                      >

                        {data.form.title}

                      </p>

                    )
                  }


                </div>





                <Button

                  size="icon"

                  variant="ghost"

                  onClick={closeDialog}

                >

                  <X
                    className="
                      h-5
                      w-5
                    "
                  />

                </Button>


              </div>







              {/* Body */}

              <div

                className="
                  flex-1
                  overflow-y-auto
                  p-4
                  sm:p-8
                "

              >


                {
                  loading && (

                    <div
                      className="
                        flex
                        h-60
                        items-center
                        justify-center
                      "
                    >

                      <Loader2
                        className="
                          h-8
                          w-8
                          animate-spin
                        "
                      />

                    </div>

                  )
                }







                {
                  !loading &&
                  data?.submission && (

                    <div
                      className="
                        space-y-6
                      "
                    >



                      <div
                        className="
                          rounded-2xl
                          border
                          bg-muted/20
                          p-4
                          sm:p-6
                        "
                      >

                        <p
                          className="
                            text-xs
                            text-muted-foreground
                          "
                        >

                          Submitted At

                        </p>


                        <p
                          className="
                            mt-2
                            font-semibold
                          "
                        >

                          {
                            formatDate(
                              data.submission.submittedAt
                            )
                          }

                        </p>


                      </div>







                      <div className="space-y-4">


                        <h3
                          className="
                            text-lg
                            font-semibold
                          "
                        >

                          Answers

                        </h3>





                        {
                          data.submission.answers.map(

                            (answer)=>(
                              
                              <div

                                key={answer.id}

                                className="
                                  rounded-2xl
                                  border
                                  bg-card
                                  p-4
                                  sm:p-6
                                "

                              >

                                <div
                                  className="
                                    flex
                                    flex-col
                                    gap-2
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                  "
                                >

                                  <p
                                    className="
                                      font-semibold
                                    "
                                  >

                                    {
                                      answer.field?.label ??
                                      "Unknown field"
                                    }

                                  </p>



                                  <span
                                    className="
                                      w-fit
                                      rounded-full
                                      bg-muted
                                      px-3
                                      py-1
                                      text-xs
                                    "
                                  >

                                    {
                                      answer.field?.type ?? ""
                                    }

                                  </span>


                                </div>





                                <div
                                  className="
                                    mt-4
                                    rounded-xl
                                    bg-muted/30
                                    p-3
                                    sm:p-4
                                  "
                                >

                                  {
                                    renderAnswerValue(
                                      answer.value
                                    )
                                  }

                                </div>


                              </div>

                            )

                          )
                        }


                      </div>


                    </div>

                  )
                }


              </div>


            </div>


          </div>

        )
      }


    </>

  );

}