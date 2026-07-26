"use client";

import {
  useState,
} from "react";

import {
  createSubmission,
} from "@/app/actions/forms/create-submission";

import {
  Button,
} from "@/components/ui/button";


type FormField = {

  id: string;

  type: string;

  label: string;

  placeholder?: string | null;

  required: boolean;

  settings?: {

    min?: number;

    max?: number;

    options?: string[];

  };

};



type FormSubmitButtonProps = {

  formId: string;

  fields: FormField[];

};







export function FormSubmitButton({

  formId,

  fields,

}: FormSubmitButtonProps) {



  const [values,setValues] =
    useState<Record<string,unknown>>({});



  const [errors,setErrors] =
    useState<Record<string,string>>({});



  const [loading,setLoading] =
    useState(false);



  const [success,setSuccess] =
    useState(false);







  function updateValue(
    fieldId:string,
    value:unknown
  ){

    setValues((previous)=>({

      ...previous,

      [fieldId]:
        value,

    }));

  }








  function validate(){

    const validationErrors:
      Record<string,string> = {};



    fields.forEach((field)=>{


      const value =
        values[field.id];



      if(
        field.required &&
        (
          value === undefined ||
          value === "" ||
          value === false
        )
      ){

        validationErrors[field.id] =
          `${field.label} is required`;

        return;

      }





      if(
        field.type === "EMAIL" &&
        value
      ){

        const email =
          String(value);



        if(
          !email.includes("@")
        ){

          validationErrors[field.id] =
            "Enter valid email";

        }

      }






      if(
        field.type === "NUMBER" &&
        value
      ){

        const number =
          Number(value);



        if(
          field.settings?.min !== undefined &&
          number < field.settings.min
        ){

          validationErrors[field.id] =
            `Minimum value is ${field.settings.min}`;

        }




        if(
          field.settings?.max !== undefined &&
          number > field.settings.max
        ){

          validationErrors[field.id] =
            `Maximum value is ${field.settings.max}`;

        }


      }


    });




    setErrors(
      validationErrors
    );



    return (
      Object.keys(validationErrors).length === 0
    );

  }









  async function handleSubmit(){


    const valid =
      validate();



    if(!valid){

      return;

    }



    setLoading(true);





    const answers =

      fields.map(

        (field)=>({

          fieldId:
            field.id,


          value:
            values[field.id] ?? null,

        })

      );







    await createSubmission({

      formId,

      answers,

    });






    setLoading(false);

    setSuccess(true);


  }









  if(success){

    return (

      <div

        className="
          rounded-lg
          border
          bg-emerald-50
          p-4
          text-sm
          text-emerald-700
        "

      >

        Response submitted successfully.

      </div>

    );

  }








  return (

    <div

      className="
        space-y-8
      "

    >



      {fields.map(

        (field)=>(

          <div

            key={field.id}

            className="
              space-y-2
            "

          >





            {field.type === "TEXT" && (

              <input

                value={
                  String(
                    values[field.id] ?? ""
                  )
                }


                onChange={(event)=>

                  updateValue(
                    field.id,
                    event.target.value
                  )

                }


                placeholder={
                  field.placeholder ?? ""
                }


                className="
                  h-11
                  w-full
                  rounded-lg
                  border
                  px-3
                "

              />

            )}







            {field.type === "EMAIL" && (

              <input

                type="email"

                value={
                  String(
                    values[field.id] ?? ""
                  )
                }


                onChange={(event)=>

                  updateValue(
                    field.id,
                    event.target.value
                  )

                }


                className="
                  h-11
                  w-full
                  rounded-lg
                  border
                  px-3
                "

              />

            )}







            {field.type === "NUMBER" && (

              <input

                type="number"

                value={
                  String(
                    values[field.id] ?? ""
                  )
                }


                onChange={(event)=>

                  updateValue(
                    field.id,
                    event.target.value
                  )

                }


                className="
                  h-11
                  w-full
                  rounded-lg
                  border
                  px-3
                "

              />

            )}








            {errors[field.id] && (

              <p

                className="
                  text-xs
                  text-destructive
                "

              >

                {errors[field.id]}

              </p>

            )}





          </div>

        )

      )}







      <Button

        type="button"

        disabled={loading}

        onClick={handleSubmit}

      >

        {
          loading
            ? "Submitting..."
            : "Submit"
        }

      </Button>



    </div>

  );

}