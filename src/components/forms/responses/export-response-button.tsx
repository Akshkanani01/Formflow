"use client";

import {
  Download,
} from "lucide-react";


import {
  Button,
} from "@/components/ui/button";



type ExportResponseButtonProps = {

  title:string;

  answers: {

    field:{

      label:string;

    };

    value:unknown;

  }[];

};







export function ExportResponseButton({

  title,

  answers,

}:ExportResponseButtonProps){





  function exportCSV(){



    const rows = [

      [
        "Field",
        "Answer",
      ],


      ...answers.map(

        (answer)=>([

          answer.field.label,

          typeof answer.value === "string"

            ? answer.value

            : JSON.stringify(
                answer.value
              ),

        ])

      ),

    ];






    const csv =

      rows

        .map(

          (row)=>

            row

              .map(

                (value)=>{

                  const escaped =

                    String(value ?? "")

                    .replace(
                      /"/g,
                      '""'
                    );


                  return `"${escaped}"`;

                }

              )

              .join(",")

        )

        .join("\n");







    const blob =

      new Blob(

        [

          csv,

        ],

        {

          type:
            "text/csv;charset=utf-8;",

        }

      );







    const url =

      URL.createObjectURL(
        blob
      );





    const link =

      document.createElement(
        "a"
      );


    link.href =
      url;



    link.download =

      `${title}-response.csv`;




    document.body.appendChild(
      link
    );



    link.click();




    document.body.removeChild(
      link
    );



    URL.revokeObjectURL(
      url
    );


  }







  return (

    <Button

      variant="outline"

      onClick={exportCSV}

    >

      <Download

        className="
          mr-2
          h-4
          w-4
        "

      />


      Export CSV


    </Button>

  );

}