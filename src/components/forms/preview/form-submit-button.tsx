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


  const [loading,setLoading] =

    useState(false);



  const [success,setSuccess] =

    useState(false);








  async function handleSubmit(){


    setLoading(true);




    const answers =

      fields.map(

        (field)=>({

          fieldId:

            field.id,


          value:

            null,

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
          rounded-xl
          border
          bg-emerald-50
          p-4
          text-center
          text-sm
          text-emerald-700

          dark:bg-emerald-950/20
          dark:text-emerald-400
        "

      >

        Response submitted successfully.

      </div>

    );

  }








  return (

    <Button

      type="button"

      disabled={loading}

      onClick={handleSubmit}

      className="
        h-12
        w-full
        rounded-xl
        text-sm
        font-semibold
      "

    >

      {
        loading

          ? "Submitting..."

          : "Submit"
      }


    </Button>

  );

}