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
  formId:string;

  answers:{
    fieldId:string;
    value:unknown;
  }[];
}) {

  await fetch(
    `/api/forms/${formId}/submit`,
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify({
        answers,
      }),
    }
  );

}





type PublicFormClientProps = {

  form:{

    id:string;

    title:string;

    description:string|null;

    fields:{

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

      [fieldId]:value,

    }));



    setErrors((previous)=>({

      ...previous,

      [fieldId]:"",

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



        if(
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
          .test(email)
        ){

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





    try{


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
          px-4
          sm:px-6
        "

      >


        <div

          className="
            w-full
            max-w-xl

            rounded-2xl

            border

            bg-background

            p-6

            text-center

            shadow-xl

            sm:rounded-3xl
            sm:p-10
          "

        >


          <div

            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-emerald-100

              sm:h-16
              sm:w-16
            "

          >

            <CheckCircle2

              className="
                h-7
                w-7
                text-emerald-600

                sm:h-8
                sm:w-8
              "

            />

          </div>





          <h1

            className="
              mt-5
              text-2xl
              font-bold

              sm:text-3xl
            "

          >

            Thank You!

          </h1>






          <p

            className="
              mt-3
              text-sm
              text-muted-foreground

              sm:text-base
            "

          >

            Your response has been submitted successfully.

          </p>







          <Button

            variant="outline"

            className="
              mt-7
              w-full
              rounded-xl

              sm:w-auto
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
        w-full
        max-w-2xl
      "

    >



      <div

        className="
          rounded-2xl
          border
          bg-background
          p-5
          shadow-xl

          sm:rounded-3xl
          sm:p-8
        "

      >





        <div

          className="
            border-b
            pb-5

            sm:pb-6
          "

        >



          <h1

            className="
              break-words
              text-2xl
              font-bold

              sm:text-3xl
            "

          >

            {form.title}

          </h1>






          {
            form.description && (

              <p

                className="
                  mt-3
                  text-sm
                  text-muted-foreground

                  sm:text-base
                "

              >

                {form.description}

              </p>

            )
          }





        </div>









        <div

          className="
            mt-6
            space-y-6

            sm:mt-8
            sm:space-y-7
          "

        >



          {
            form.fields.map(

              (field)=>(


                <div

                  key={field.id}

                  className="
                    space-y-2
                  "

                >



                  <label

                    className="
                      text-sm
                      font-semibold
                    "

                  >

                    {field.label}


                    {
                      field.required && (

                        <span

                          className="
                            ml-1
                            text-destructive
                          "

                        >

                          *

                        </span>

                      )
                    }


                  </label>







                  <PublicFieldRenderer

                    field={field}

                    value={
                      values[field.id]
                    }

                    error={
                      errors[field.id]
                    }

                    onChange={(value)=>

                      updateValue(

                        field.id,

                        value

                      )

                    }

                  />







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


              )

            )
          }



        </div>









        <div

          className="
            mt-8
            border-t
            pt-5

            sm:mt-10
            sm:pt-6
          "

        >



          <Button

            className="
              h-12
              w-full
              rounded-xl
              text-sm
              font-semibold
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