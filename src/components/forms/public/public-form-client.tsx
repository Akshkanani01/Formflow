"use client";

import {
  useState,
} from "react";

import {
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  PublicFieldRenderer,
} from "./public-field-renderer";

async function publicSubmit({
  formId,
  answers,
}: {
  formId: string;
  answers: {
    fieldId: string;
    value: unknown;
  }[];
}) {
  await fetch(`/api/forms/${formId}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  });
}



type PublicFormClientProps = {

  form: {

    id:string;

    title:string;

    description:string | null;

    fields: {

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

    }[];

  };

};





export function PublicFormClient({

  form,

}:PublicFormClientProps){



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



    setErrors((previous)=>({

      ...previous,

      [fieldId]:
        "",

    }));

  }







  function validateForm(){


    const validationErrors:
      Record<string,string> = {};





    form.fields.forEach((field)=>{


      const value =
        values[field.id];





      if(

        field.required &&

        (

          value === undefined ||

          value === "" ||

          value === null ||

          (

            Array.isArray(value) &&

            value.length === 0

          )

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



        const valid =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          .test(email);




        if(!valid){

          validationErrors[field.id] =
            "Enter a valid email address";

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








  async function submit(){


    const valid =
      validateForm();




    if(!valid){

      return;

    }





    try {


      setLoading(true);





      await publicSubmit({

        formId:
          form.id,


        answers:

          form.fields.map(

            (field)=>({

              fieldId:
                field.id,


              value:
                values[field.id] ?? "",


            })

          ),


      });





      setSuccess(true);



    } finally {


      setLoading(false);


    }


  }







  function resetForm(){


    setValues({});


    setErrors({});


    setSuccess(false);


  }







  if(success){


    return (

      <main
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
          px-6
        "
      >

        <div
          className="
            w-full
            max-w-xl
            rounded-3xl
            border
            bg-background
            p-10
            text-center
            shadow-xl
          "
        >

          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-emerald-100
            "
          >

            <CheckCircle2
              className="
                h-8
                w-8
                text-emerald-600
              "
            />

          </div>



          <h1
            className="
              mt-6
              text-3xl
              font-bold
            "
          >

            Thank You!

          </h1>




          <p
            className="
              mt-3
              text-muted-foreground
            "
          >

            Your response has been submitted
            successfully.

          </p>




          <Button

            variant="outline"

            className="
              mt-8
            "

            onClick={resetForm}

          >

            <RotateCcw
              className="
                mr-2
                h-4
                w-4
              "
            />

            Submit another response


          </Button>


        </div>


      </main>

    );

  }







  return (

    <div
      className="
        mx-auto
        max-w-2xl
      "
    >

      <div
        className="
          rounded-3xl
          border
          bg-background
          p-8
          shadow-xl
        "
      >


        <div
          className="
            border-b
            pb-6
          "
        >

          <h1
            className="
              text-3xl
              font-bold
            "
          >

            {form.title}

          </h1>



          {form.description && (

            <p
              className="
                mt-3
                text-muted-foreground
              "
            >

              {form.description}

            </p>

          )}


        </div>






        <div
          className="
            mt-8
            space-y-7
          "
        >

          {form.fields.map(

            (field)=>(


              <div
                key={field.id}
                className="
                  space-y-3
                "
              >


                <label
                  className="
                    text-sm
                    font-semibold
                  "
                >

                  {field.label}



                  {field.required && (

                    <span
                      className="
                        ml-1
                        text-destructive
                      "
                    >
                      *
                    </span>

                  )}

                </label>





                <PublicFieldRenderer

                  field={field}

                  value={
                    values[field.id]
                  }

                  error={
                    errors[field.id]
                  }

                  onChange={(value:unknown)=>

                    updateValue(

                      field.id,

                      value

                    )

                  }

                />



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


        </div>







        <div
          className="
            mt-10
            border-t
            pt-6
          "
        >

          <Button

            className="
              h-11
              w-full
              rounded-xl
            "

            disabled={loading}

            onClick={submit}

          >

            {
              loading
                ? "Submitting..."
                : "Submit Response"
            }


          </Button>


        </div>



      </div>


    </div>

  );

}