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

};




export function PublishButton({

  formId,

}:PublishButtonProps){



  const [loading,setLoading] =
    useState(false);


  const [published,setPublished] =
    useState(false);


  const [url,setUrl] =
    useState("");



  const [copied,setCopied] =
    useState(false);





  async function handlePublish(){


    try {

      setLoading(true);



      const result =
        await publishForm({

          formId,

        });




      const fullUrl =
        `${window.location.origin}${result.publicUrl}`;



      setUrl(fullUrl);


      setPublished(true);



    } finally {


      setLoading(false);


    }

  }





  async function copyUrl(){


    if(!url){
      return;
    }


    await navigator.clipboard.writeText(
      url
    );


    setCopied(true);



    setTimeout(()=>{

      setCopied(false);

    },2000);


  }






  if(published){


    return (

      <div
        className="
          flex
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
              max-w-sm
              truncate
              text-xs
              text-muted-foreground
            "
          >
            {url}
          </span>


        </div>





        <Button

          type="button"

          size="icon"

          variant="ghost"

          onClick={copyUrl}

        >

          <Copy
            className="
              h-4
              w-4
            "
          />

        </Button>





        <a

          href={url}

          target="_blank"

          rel="noreferrer"

        >

          <Button

            type="button"

            size="icon"

            variant="ghost"

          >

            <ExternalLink
              className="
                h-4
                w-4
              "
            />

          </Button>


        </a>





        {copied && (

          <span
            className="
              text-xs
              text-emerald-600
            "
          >
            Copied
          </span>

        )}


      </div>

    );

  }






  return (

    <Button

      size="sm"

      onClick={handlePublish}

      disabled={loading}

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