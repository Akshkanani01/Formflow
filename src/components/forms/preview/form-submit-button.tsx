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

  id:string;

  type:string;

  label:string;

  placeholder?:string | null;

  required:boolean;

  settings?:{

    min?:number;

    max?:number;

    options?:string[];

  };

};





type FormSubmitButtonProps = {

  formId:string;

  fields:FormField[];

};








export function FormSubmitButton({

  formId,

  fields,

}:FormSubmitButtonProps){



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

      [fieldId]:value,

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

          value === null

        )

      ){

        validationErrors[field.id] =

          `${field.label} is required`;

      }



    });






    setErrors(validationErrors);



    return (

      Object.keys(validationErrors).length === 0

    );

  }









  async function handleSubmit(){



    if(!validate()){

      return;

    }



    try{


      setLoading(true);





      await createSubmission({

        formId,

        answers:

          fields.map((field)=>({

            fieldId:field.id,

            value:

              values[field.id] ?? "",

          })),

      });





      setSuccess(true);



    }finally{


      setLoading(false);


    }


  }







  if(success){

    return (

      <div

        className="
          rounded-xl
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
        space-y-6
      "

    >



      {
        fields.map((field)=>(


          <div

            key={field.id}

            className="
              space-y-2
            "

          >



            {
              field.type === "TEXT" && (

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

              )
            }






            {
              field.type === "EMAIL" && (

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

              )
            }






            {
              field.type === "NUMBER" && (

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

              )
            }







            {
              errors[field.id] && (

                <p

                  className="
                    text-xs
                    text-destructive
                  "

                >

                  {errors[field.id]}

                </p>

              )
            }



          </div>


        ))
      }







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