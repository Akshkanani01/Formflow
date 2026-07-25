"use client";

import {
  Star,
} from "lucide-react";

import type {
  BuilderField,
} from "./builder-context";


type FieldRendererProps = {
  field: BuilderField;
};



export function FieldRenderer({
  field,
}: FieldRendererProps) {


  const options =
    field.settings?.options ?? [];



  switch (field.type) {


    case "short-text":

      return (
        <input
          type="text"
          disabled
          placeholder={
            field.placeholder ||
            "Short text answer"
          }
          className="
            h-10
            w-full
            rounded-lg
            border
            bg-muted/30
            px-3
            text-sm
          "
        />
      );



    case "paragraph":

      return (
        <textarea
          disabled
          rows={4}
          placeholder={
            field.placeholder ||
            "Long answer"
          }
          className="
            w-full
            rounded-lg
            border
            bg-muted/30
            p-3
            text-sm
          "
        />
      );



    case "email":

      return (
        <input
          type="email"
          disabled
          placeholder={
            field.placeholder ||
            "example@email.com"
          }
          className="
            h-10
            w-full
            rounded-lg
            border
            bg-muted/30
            px-3
            text-sm
          "
        />
      );



    case "phone":

      return (
        <input
          type="tel"
          disabled
          placeholder={
            field.placeholder ||
            "+91 Phone number"
          }
          className="
            h-10
            w-full
            rounded-lg
            border
            bg-muted/30
            px-3
            text-sm
          "
        />
      );



    case "number":

      return (
        <input
          type="number"
          disabled
          placeholder={
            field.placeholder ||
            "0"
          }
          min={
            field.settings?.min
          }
          max={
            field.settings?.max
          }
          className="
            h-10
            w-full
            rounded-lg
            border
            bg-muted/30
            px-3
            text-sm
          "
        />
      );



    case "date":

      return (
        <input
          type="date"
          disabled
          className="
            h-10
            w-full
            rounded-lg
            border
            bg-muted/30
            px-3
            text-sm
          "
        />
      );



    case "dropdown":

      return (
        <select
          disabled
          className="
            h-10
            w-full
            rounded-lg
            border
            bg-muted/30
            px-3
            text-sm
          "
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



    case "radio":

      return (
        <div
          className="
            space-y-3
          "
        >

          {options.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Add options from properties
            </p>
          )}


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
                  disabled
                />

                {option}

              </label>

            )
          )}

        </div>
      );



    case "checkbox":

      return (
        <div
          className="
            space-y-3
          "
        >

          {options.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Add options from properties
            </p>
          )}


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
                  disabled
                />

                {option}

              </label>

            )
          )}

        </div>
      );



    case "rating":

      return (
        <div
          className="
            flex
            gap-1
          "
        >

          {[1,2,3,4,5].map(
            (item)=>(
              <Star
                key={item}
                className="
                  h-6
                  w-6
                  text-muted-foreground
                "
              />
            )
          )}

        </div>
      );



    case "file":

      return (
        <div
          className="
            rounded-lg
            border
            border-dashed
            p-6
            text-center
          "
        >

          <p className="text-sm text-muted-foreground">
            Upload file
          </p>


          {field.settings?.maxSize && (
            <p
              className="
                mt-1
                text-xs
                text-muted-foreground
              "
            >
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
            bg-muted/30
            p-4
            text-sm
            text-muted-foreground
          "
        >
          Field preview
        </div>
      );

  }

}