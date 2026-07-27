"use client";

import {
  useState,
} from "react";

import {
  RotateCcw,
} from "lucide-react";

import {
  restoreForm,
} from "@/app/actions/forms/restore-form";

import {
  Button,
} from "@/components/ui/button";





type RestoreFormButtonProps = {

  formId:string;

};








export function RestoreFormButton({

  formId,

}:RestoreFormButtonProps){



  const [loading,setLoading] =

    useState(false);







  async function handleRestore(){



    const confirmed =

      window.confirm(

        "Restore this form?"

      );





    if(!confirmed){

      return;

    }








    try{


      setLoading(true);



      await restoreForm({

        formId,

      });





      window.location.reload();




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

      onClick={handleRestore}

      title="Restore form"

    >

      <RotateCcw

        className="
          h-4
          w-4
        "

      />

    </Button>

  );

}