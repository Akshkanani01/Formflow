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

    h-11

    w-full

    rounded-lg

    border

    bg-background

    px-3

    text-sm

    outline-none

    transition

    ${
      error
        ? "border-destructive focus:ring-destructive"
        : "focus:ring-2 focus:ring-primary"
    }

  `;




  switch (field.type) {


    case "TEXT":

      return (

        <div className="space-y-2">

          <input

            type="text"

            placeholder={
              field.placeholder ?? ""
            }

            className={inputClass}

          />

          {error && (

            <p className="text-xs text-destructive">
              {error}
            </p>

          )}

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
              w-full
              rounded-lg
              border
              bg-background
              p-3
              text-sm
              outline-none

              ${
                error
                  ? "border-destructive"
                  : ""
              }
            `}

          />


          {error && (

            <p className="text-xs text-destructive">
              {error}
            </p>

          )}

        </div>

      );




    case "EMAIL":

      return (

        <input

          type="email"

          placeholder="email@example.com"

          className={inputClass}

        />

      );





    case "PHONE":

      return (

        <input

          type="tel"

          placeholder="+91 Phone number"

          className={inputClass}

        />

      );





    case "NUMBER":

      return (

        <input

          type="number"

          min={
            field.settings?.min
          }

          max={
            field.settings?.max
          }

          placeholder="0"

          className={inputClass}

        />

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


          {options.map(

            (option,index)=>(

              <option
                key={index}
              >
                {option}
              </option>

            )

          )}

        </select>

      );








    case "RADIO":

      return (

        <div className="space-y-3">

          {options.map(

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

                  name={field.label}

                />

                {option}

              </label>

            )

          )}

        </div>

      );







    case "CHECKBOX":

      return (

        <div className="space-y-3">

          {options.map(

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

                />

                {option}

              </label>

            )

          )}

        </div>

      );







    case "RATING":

      return (

        <div
          className="
            flex
            gap-2
          "
        >

          {[1,2,3,4,5].map(

            (item)=>(

              <Star

                key={item}

                className="
                  h-7
                  w-7
                  text-muted-foreground
                "

              />

            )

          )}

        </div>

      );







    case "FILE":

      return (

        <div className="space-y-2">

          <input

            type="file"

            className="
              w-full
              rounded-lg
              border
              p-3
              text-sm
            "

          />


          {field.settings?.maxSize && (

            <p className="text-xs text-muted-foreground">

              Max size:
              {" "}
              {field.settings.maxSize}
              MB

            </p>

          )}

        </div>

      );







    default:

      return (

        <div
          className="
            rounded-lg
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