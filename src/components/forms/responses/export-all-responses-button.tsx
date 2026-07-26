"use client";


import {
  useState,
} from "react";


import {
  Download,
  Loader2,
} from "lucide-react";


import {
  Button,
} from "@/components/ui/button";


import {
  getAllResponsesForExport,
} from "@/app/actions/forms/get-all-responses-for-export";





type ExportAllResponsesButtonProps = {

  formId:string;

};







export function ExportAllResponsesButton({

  formId,

}:ExportAllResponsesButtonProps){



  const [loading,setLoading] =

    useState(false);







  async function exportResponses(){


    try {


      setLoading(true);



      const responses =

        await getAllResponsesForExport({

          formId,

        });






      if(!responses.length){

        return;

      }







      const headers = [

        "Submitted At",

        ...responses[0].fields,

      ];








      const rows = responses.map(

        (response)=>(

          [

            response.submittedAt,

            ...response.values,

          ]

        )

      );








      const csv = [

        headers,

        ...rows,

      ]

      .map(

        (row)=>

          row

          .map(

            (item)=>

              `"${String(item ?? "")

                .replaceAll('"','""')}"`

          )

          .join(",")

      )

      .join("\n");








      const blob =

        new Blob(

          [

            csv

          ],

          {

            type:

              "text/csv;charset=utf-8;",

          }

        );







      const url =

        URL.createObjectURL(blob);






      const link =

        document.createElement("a");



      link.href = url;



      link.download =

        "form-responses.csv";



      link.click();




      URL.revokeObjectURL(url);



    } finally {


      setLoading(false);


    }


  }







  return (

    <Button

      onClick={exportResponses}

      disabled={loading}

      className="
        rounded-xl
      "

    >

      {
        loading ? (

          <Loader2

            className="
              mr-2
              h-4
              w-4
              animate-spin
            "

          />

        ) : (

          <Download

            className="
              mr-2
              h-4
              w-4
            "

          />

        )
      }


      Export All


    </Button>

  );

}