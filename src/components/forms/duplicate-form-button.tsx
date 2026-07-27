"use client";

import {
  useState,
} from "react";

import {
  Copy,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  duplicateForm,
} from "@/app/actions/forms/duplicate-form";

import {
  Button,
} from "@/components/ui/button";





type DuplicateFormButtonProps = {

  formId:string;

};









export function DuplicateFormButton({

  formId,

}:DuplicateFormButtonProps){



  const router = useRouter();



  const [loading,setLoading] =

    useState(false);







  async function handleDuplicate(){



    try{


      setLoading(true);




      const result =

        await duplicateForm({

          formId,

        });





      router.push(

        `/dashboard/forms/${result.formId}/builder`

      );




    }finally{


      setLoading(false);


    }


  }









  return (

    <Button

      type="button"

      variant="ghost"

      size="icon"

      disabled={loading}

      onClick={handleDuplicate}

      title="Duplicate form"

    >

      <Copy

        className="
          h-4
          w-4
        "

      />

    </Button>

  );

}