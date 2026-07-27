"use client";

import {
  useState,
} from "react";

import {
  Trash2,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  deleteForm,
} from "@/app/actions/forms/delete-form";

import {
  Button,
} from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";





type DeleteFormButtonProps = {

  formId:string;

  formTitle:string;

};









export function DeleteFormButton({

  formId,

  formTitle,

}:DeleteFormButtonProps){



  const router = useRouter();



  const [open,setOpen] =

    useState(false);



  const [loading,setLoading] =

    useState(false);









  async function handleDelete(){



    try{


      setLoading(true);





      await deleteForm({

        formId,

      });





      setOpen(false);



      router.refresh();




    }finally{


      setLoading(false);


    }


  }









  return (

    <Dialog

      open={open}

      onOpenChange={setOpen}

    >



      <DialogTrigger

  render={

    <Button

      type="button"

      variant="ghost"

      size="icon"

      title="Delete form"

      className="
        text-destructive
        hover:bg-destructive/10
      "

    >

      <Trash2

        className="
          h-4
          w-4
        "

      />

    </Button>

  }

/>









      <DialogContent>


        <DialogHeader>


          <DialogTitle>

            Delete form?

          </DialogTitle>




          <DialogDescription>


            Are you sure you want to delete{" "}

            <span className="font-semibold">

              {formTitle}

            </span>

            ?

            This action cannot be undone.

            All responses and fields will be removed.


          </DialogDescription>



        </DialogHeader>









        <DialogFooter>


          <Button

            type="button"

            variant="outline"

            disabled={loading}

            onClick={()=>setOpen(false)}

          >

            Cancel

          </Button>






          <Button

            type="button"

            variant="destructive"

            disabled={loading}

            onClick={handleDelete}

          >


            {
              loading

                ? "Deleting..."

                : "Delete"

            }


          </Button>



        </DialogFooter>





      </DialogContent>





    </Dialog>

  );

}