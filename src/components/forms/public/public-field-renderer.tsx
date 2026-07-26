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

    placeholder?:string | null;

    required:boolean;

    settings?: {

      options?:string[];

      min?:number;

      max?:number;

      maxSize?:number;

    };

  };


  value:unknown;


  error?:string;


  onChange:(

    value:unknown

  )=>void;

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

    h-11

    w-full

    rounded-xl

    border

    bg-background

    px-4

    text-sm

    outline-none

    transition

    ${
      error
        ? "border-destructive focus:ring-destructive"
        : "focus:ring-2 focus:ring-primary/20"
    }

  `;







  switch(field.type){



    case "TEXT":

    case "short-text":

      return (

        <input

          value={
            String(value ?? "")
          }


          onChange={(event)=>

            onChange(
              event.target.value
            )

          }


          placeholder={
            field.placeholder ?? ""
          }


          className={
            inputClass
          }


        />

      );







    case "TEXTAREA":

    case "paragraph":

      return (

        <textarea

          value={
            String(value ?? "")
          }


          onChange={(event)=>

            onChange(
              event.target.value
            )

          }


          rows={5}


          placeholder={
            field.placeholder ?? ""
          }


          className={`

            w-full

            rounded-xl

            border

            bg-background

            p-4

            text-sm

            outline-none


            ${
              error
                ? "border-destructive"
                : ""
            }


            focus:ring-2

            focus:ring-primary/20

          `}

        />

      );







    case "EMAIL":

      return (

        <input

          type="email"


          value={
            String(value ?? "")
          }


          onChange={(event)=>

            onChange(
              event.target.value
            )

          }


          placeholder="email@example.com"


          className={
            inputClass
          }


        />

      );







    case "PHONE":

    case "phone":

      return (

        <input

          type="tel"


          value={
            String(value ?? "")
          }


          onChange={(event)=>

            onChange(
              event.target.value
            )

          }


          placeholder="+91 Phone number"


          className={
            inputClass
          }


        />

      );







    case "NUMBER":

      return (

        <input

          type="number"


          value={
            String(value ?? "")
          }


          min={
            field.settings?.min
          }


          max={
            field.settings?.max
          }


          onChange={(event)=>

            onChange(
              event.target.value
            )

          }


          className={
            inputClass
          }


        />

      );
          case "SELECT":

    case "dropdown":

      return (

        <select

          value={
            String(value ?? "")
          }


          onChange={(event)=>

            onChange(
              event.target.value
            )

          }


          className={
            inputClass
          }


        >

          <option value="">

            Select option

          </option>


          {
            options.map(

              (option,index)=>(

                <option

                  key={index}

                  value={option}

                >

                  {option}

                </option>

              )

            )
          }


        </select>

      );







    case "RADIO":

    case "radio":

      return (

        <div
          className="
            space-y-3
          "
        >

          {
            options.map(

              (option,index)=>(

                <label

                  key={index}

                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                  "

                >

                  <input

                    type="radio"


                    checked={
                      value === option
                    }


                    onChange={()=>{

                      onChange(
                        option
                      );

                    }}


                  />


                  {option}


                </label>

              )

            )
          }


        </div>

      );







    case "CHECKBOX":

    case "checkbox":

      return (

        <div
          className="
            space-y-3
          "
        >

          {
            options.map(

              (option,index)=>(

                <label

                  key={index}

                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                  "

                >

                  <input

                    type="checkbox"


                    checked={

                      Array.isArray(value)

                      &&

                      value.includes(option)

                    }


                    onChange={(event)=>{


                      const current =

                        Array.isArray(value)

                          ? value

                          : [];



                      if(event.target.checked){


                        onChange([

                          ...current,

                          option,

                        ]);


                      }else{


                        onChange(

                          current.filter(

                            (item)=>

                              item !== option

                          )

                        );


                      }


                    }}


                  />


                  {option}


                </label>

              )

            )
          }


        </div>

      );







    case "DATE":

      return (

        <input

          type="date"


          value={
            String(value ?? "")
          }


          onChange={(event)=>

            onChange(
              event.target.value
            )

          }


          className={
            inputClass
          }


        />

      );







    case "RATING":

    case "rating":

      return (

        <div
          className="
            flex
            gap-2
          "
        >

          {
            [1,2,3,4,5].map(

              (item)=>(

                <button

                  key={item}

                  type="button"

                  onClick={()=>{

                    onChange(
                      item
                    );

                  }}

                >

                  <Star

                    className={`

                      h-7

                      w-7


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

              )

            )
          }


        </div>

      );
          case "FILE":

      return (

        <div
          className="
            space-y-4
          "
        >

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


    const file =
      files[0];


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




                <div>

                  <p
                    className="
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