"use client";

import {
  useState,
} from "react";

import {
  CheckCircle2,
  Copy,
  ExternalLink,
  Rocket,
} from "lucide-react";


import {
  Button,
} from "@/components/ui/button";


import {
  publishForm,
} from "@/app/actions/forms/publish-form";





type PublishButtonProps = {

  formId:string;

  initialStatus:string;

  initialUrl:string;

};








export function PublishButton({

  formId,

  initialStatus,

  initialUrl,

}:PublishButtonProps){



  const [loading,setLoading] =

    useState(false);



  const [published,setPublished] =

    useState(

      initialStatus === "PUBLISHED"

    );



  const [url,setUrl] =

    useState(initialUrl);



  const [copied,setCopied] =

    useState(false);








  async function handlePublish(){



    try{


      setLoading(true);





      const result =

        await publishForm({

          formId,

        });





      setUrl(

        result.publicUrl

      );



      setPublished(true);



    }finally{


      setLoading(false);


    }


  }









  async function copyUrl(){


    if(!url){

      return;

    }




    const fullUrl =

      `${window.location.origin}${url}`;




    await navigator.clipboard.writeText(

      fullUrl

    );





    setCopied(true);




    setTimeout(()=>{

      setCopied(false);

    },2000);



  }








  if(published){



    const fullUrl =

      `${window.location.origin}${url}`;




    return (

      <div

        className="
          flex
          flex-wrap
          items-center
          gap-3
          rounded-xl
          border
          bg-background
          px-4
          py-3
        "

      >


        <CheckCircle2

          className="
            h-5
            w-5
            text-emerald-500
          "

        />



        <div

          className="
            flex
            min-w-0
            flex-1
            flex-col
          "

        >

          <span

            className="
              text-sm
              font-medium
            "

          >

            Published

          </span>



          <span

            className="
              truncate
              text-xs
              text-muted-foreground
            "

          >

            {fullUrl}

          </span>


        </div>





        <Button

          size="icon"

          variant="ghost"

          type="button"

          onClick={copyUrl}

        >

          <Copy className="h-4 w-4"/>

        </Button>





        <a

          href={fullUrl}

          target="_blank"

          rel="noreferrer"

        >

          <Button

            size="icon"

            variant="ghost"

            type="button"

          >

            <ExternalLink className="h-4 w-4"/>

          </Button>


        </a>






        {
          copied && (

            <span

              className="
                text-xs
                text-emerald-600
              "

            >

              Copied

            </span>

          )
        }



      </div>

    );

  }









  return (

    <Button

      size="sm"

      disabled={loading}

      onClick={handlePublish}

    >

      <Rocket

        className="
          mr-2
          h-4
          w-4
        "

      />


      {
        loading

          ? "Publishing..."

          : "Publish"

      }


    </Button>

  );


}