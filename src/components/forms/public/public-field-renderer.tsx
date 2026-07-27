"use client";

import {
  useState,
} from "react";

import {
  UploadButton,
} from "@/lib/uploadthing";

import {
  Star,
  Loader2,
  FileText,
} from "lucide-react";



type PublicFieldRendererProps = {

  field: {

    id:string;

    type:string;

    label:string;

    placeholder?:string|null;

    required:boolean;

    settings?:{

      options?:string[];

      min?:number;

      max?:number;

      maxSize?:number;

    };

  };


  value:unknown;


  error?:string;


  onChange:(value:unknown)=>void;

};








export function PublicFieldRenderer({

  field,

  value,

  error,

  onChange,

}:PublicFieldRendererProps){



  const [uploading,setUploading] =

    useState(false);





  const options =

    field.settings?.options ?? [];







  const inputClass = `

    h-12

    w-full

    rounded-xl

    border

    bg-background

    px-4

    text-sm

    outline-none

    transition

    focus:ring-2

    ${
      error

      ? "border-destructive focus:ring-destructive"

      : "focus:ring-primary/20"

    }

  `;







  switch(field.type){



    case "TEXT":

    case "short-text":

    case "EMAIL":

    case "PHONE":

    case "phone":

      return (

        <input

          type={

            field.type === "EMAIL"

            ? "email"

            : field.type === "PHONE" ||

              field.type === "phone"

              ? "tel"

              : "text"

          }


          value={String(value ?? "")}


          onChange={(e)=>

            onChange(
              e.target.value
            )

          }


          placeholder={

            field.placeholder ?? ""

          }


          className={inputClass}

        />

      );








    case "TEXTAREA":

    case "paragraph":

      return (

        <textarea

          value={String(value ?? "")}


          onChange={(e)=>

            onChange(
              e.target.value
            )

          }


          rows={5}


          placeholder={

            field.placeholder ?? ""

          }


          className={`

            min-h-32

            w-full

            rounded-xl

            border

            bg-background

            p-4

            text-sm

            outline-none

            transition

            focus:ring-2

            ${
              error

              ? "border-destructive focus:ring-destructive"

              : "focus:ring-primary/20"

            }

          `}

        />

      );









    case "NUMBER":

      return (

        <input

          type="number"


          value={String(value ?? "")}


          min={field.settings?.min}


          max={field.settings?.max}


          onChange={(e)=>

            onChange(
              e.target.value
            )

          }


          className={inputClass}

        />

      );









    case "SELECT":

    case "dropdown":

      return (

        <select

          value={String(value ?? "")}


          onChange={(e)=>

            onChange(
              e.target.value
            )

          }


          className={inputClass}

        >

          <option value="">

            Select option

          </option>


          {
            options.map((option,index)=>(

              <option

                key={index}

                value={option}

              >

                {option}

              </option>

            ))
          }


        </select>

      );









    case "RADIO":

    case "radio":

      return (

        <div className="space-y-3">

          {
            options.map((option,index)=>(

              <label

                key={index}

                className="

                  flex

                  min-h-12

                  cursor-pointer

                  items-center

                  gap-3

                  rounded-xl

                  border

                  px-4

                  text-sm

                  transition

                  hover:bg-muted/40

                "

              >

                <input

                  type="radio"

                  checked={
                    value === option
                  }

                  onChange={()=>{

                    onChange(option);

                  }}

                  className="h-4 w-4"

                />


                {option}


              </label>

            ))
          }

        </div>

      );









    case "CHECKBOX":

    case "checkbox":

      return (

        <div className="space-y-3">


          {
            options.map((option,index)=>(

              <label

                key={index}

                className="

                  flex

                  min-h-12

                  cursor-pointer

                  items-center

                  gap-3

                  rounded-xl

                  border

                  px-4

                  text-sm

                  transition

                  hover:bg-muted/40

                "

              >

                <input

                  type="checkbox"


                  checked={

                    Array.isArray(value)

                    &&

                    value.includes(option)

                  }


                  onChange={(e)=>{


                    const current =

                      Array.isArray(value)

                      ? value

                      : [];



                    onChange(

                      e.target.checked

                      ? [

                          ...current,

                          option,

                        ]

                      : current.filter(

                          (item)=>

                            item !== option

                        )

                    );


                  }}


                  className="h-4 w-4"

                />


                {option}


              </label>

            ))
          }


        </div>

      );









    case "DATE":

      return (

        <input

          type="date"

          value={String(value ?? "")}

          onChange={(e)=>

            onChange(
              e.target.value
            )

          }

          className={inputClass}

        />

      );









    case "RATING":

    case "rating":

      return (

        <div

          className="
            flex
            flex-wrap
            gap-2
          "

        >

          {
            [1,2,3,4,5].map((item)=>(

              <button

                key={item}

                type="button"

                onClick={()=>{

                  onChange(item);

                }}

              >

                <Star

                  className={`

                    h-8

                    w-8


                    ${
                      Number(value) >= item

                      ? "fill-current"

                      : ""

                    }


                    ${
                      error

                      ? "text-destructive"

                      : ""

                    }

                  `}

                />

              </button>

            ))
          }


        </div>

      );









    case "FILE":

      return (

        <div className="space-y-4">


          <UploadButton

            endpoint="formUploader"


            appearance={{

              button:

                "rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90",

            }}


            onUploadBegin={()=>{

              setUploading(true);

            }}


            onClientUploadComplete={(files)=>{


              setUploading(false);


              const file = files[0];


              onChange({

                url:file.url,

                fileName:file.name,

                size:file.size,

                type:file.type,

              });


            }}


            onUploadError={(error)=>{


              setUploading(false);


              console.error(
                "UploadThing Error:",
                error
              );


            }}

          />






          {
            uploading && (

              <div

                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-muted-foreground
                "

              >

                <Loader2

                  className="
                    h-4
                    w-4
                    animate-spin
                  "

                />

                Uploading...

              </div>

            )
          }








          {
            typeof value === "object"

            &&

            value !== null

            &&

            "fileName" in value

            && (

              <div

                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  bg-muted/30
                  p-4
                "

              >

                <FileText

                  className="
                    h-5
                    w-5
                    text-primary
                  "

                />

                <div className="min-w-0">

                  <p

                    className="
                      truncate
                      text-sm
                      font-medium
                    "

                  >

                    {
                      String(

                        (

                          value as {

                            fileName?:string;

                          }

                        ).fileName ?? ""

                      )
                    }

                  </p>


                  <p

                    className="
                      text-xs
                      text-muted-foreground
                    "

                  >

                    {
                      String(

                        (

                          value as {

                            type?:string;

                          }

                        ).type ?? ""

                      )
                    }

                  </p>


                </div>


              </div>

            )
          }


        </div>

      );









    default:

      return null;


  }


}