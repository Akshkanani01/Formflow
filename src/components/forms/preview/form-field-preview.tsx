"use client";

import {
  Star,
} from "lucide-react";


type FormFieldPreviewProps = {

  field: {

    type: string;

    label: string;

    placeholder?: string | null;

    required: boolean;

    settings?: {

      options?: string[];

      min?: number;

      max?: number;

      maxSize?: number;

    };

  };

  error?: string;

};






export function FormFieldPreview({

  field,

  error,

}: FormFieldPreviewProps) {




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

        : "focus:ring-primary"

    }

  `;







  switch(field.type){



    case "TEXT":

    case "EMAIL":

    case "PHONE":

    case "NUMBER":

      return (

        <div className="space-y-2">

          <input

            type={

              field.type === "EMAIL"

                ? "email"

                : field.type === "PHONE"

                  ? "tel"

                  : field.type === "NUMBER"

                    ? "number"

                    : "text"

            }


            min={field.settings?.min}


            max={field.settings?.max}


            placeholder={

              field.placeholder ?? ""

            }


            className={inputClass}


          />



          {
            error && (

              <p className="text-xs text-destructive">

                {error}

              </p>

            )
          }


        </div>

      );








    case "TEXTAREA":

      return (

        <div className="space-y-2">


          <textarea

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

                  : "focus:ring-primary"

              }

            `}

          />



          {
            error && (

              <p className="text-xs text-destructive">

                {error}

              </p>

            )
          }


        </div>

      );








    case "DATE":

      return (

        <input

          type="date"

          className={inputClass}

        />

      );








    case "SELECT":

      return (

        <select

          className={inputClass}

        >

          <option>

            Select option

          </option>


          {
            options.map(

              (option,index)=>(

                <option

                  key={index}

                >

                  {option}

                </option>

              )

            )
          }


        </select>

      );









    case "RADIO":

      return (

        <div className="space-y-3">


          {
            options.map(

              (option,index)=>(

                <label

                  key={index}

                  className="

                    flex

                    min-h-11

                    items-center

                    gap-3

                    rounded-lg

                    border

                    px-3

                    text-sm

                    cursor-pointer

                  "

                >

                  <input

                    type="radio"

                    name={field.label}

                    className="h-4 w-4"

                  />


                  {option}


                </label>


              )

            )
          }


        </div>

      );









    case "CHECKBOX":

      return (

        <div className="space-y-3">


          {
            options.map(

              (option,index)=>(

                <label

                  key={index}

                  className="

                    flex

                    min-h-11

                    items-center

                    gap-3

                    rounded-lg

                    border

                    px-3

                    text-sm

                    cursor-pointer

                  "

                >

                  <input

                    type="checkbox"

                    className="h-4 w-4"

                  />


                  {option}


                </label>


              )

            )
          }


        </div>

      );









    case "RATING":

      return (

        <div

          className="

            flex

            flex-wrap

            gap-2

          "

        >

          {
            [1,2,3,4,5].map(

              (item)=>(

                <Star

                  key={item}

                  className="

                    h-8

                    w-8

                    text-muted-foreground

                  "

                />

              )

            )
          }


        </div>

      );









    case "FILE":

      return (

        <div className="space-y-2">


          <input

            type="file"


            className="

              w-full

              rounded-xl

              border

              bg-background

              p-3

              text-sm

            "

          />



          {
            field.settings?.maxSize && (

              <p

                className="

                  text-xs

                  text-muted-foreground

                "

              >

                Max size: {field.settings.maxSize} MB


              </p>

            )
          }



        </div>

      );









    default:

      return (

        <div

          className="

            rounded-xl

            border

            p-4

            text-sm

            text-muted-foreground

          "

        >

          Unsupported field

        </div>

      );


  }

}