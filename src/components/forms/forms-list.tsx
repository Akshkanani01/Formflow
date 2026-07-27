"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Archive,
  CheckCircle2,
  Trash2,
  X,
} from "lucide-react";

import {
  bulkDeleteForms,
} from "@/app/actions/forms/bulk-delete-forms";

import {
  bulkPublishForms,
} from "@/app/actions/forms/bulk-publish-forms";

import {
  bulkArchiveForms,
} from "@/app/actions/forms/bulk-archive-forms";


import { FormsTable } from "./forms-table";
import { FormsPagination } from "./forms-pagination";





const FormStatus = {

  DRAFT: "DRAFT",

  PUBLISHED: "PUBLISHED",

  ARCHIVED: "ARCHIVED",

} as const;





type FormStatusType =
  typeof FormStatus[keyof typeof FormStatus];






type FormItem = {

  id:string;

  title:string;

  description:string | null;

  status:FormStatusType;

  updatedAt:Date;

  _count:{

    submissions:number;

  };

};







type FormsListProps = {

  forms:FormItem[];

  page:number;

  total:number;

  totalPages:number;

  pageSize:number;

};









export function FormsList({

  forms,

  page,

  total,

  totalPages,

  pageSize,

}:FormsListProps){





  const [selectedIds,setSelectedIds] =

    useState<string[]>([]);





  const [loading,setLoading] =

    useState(false);









  const allSelected = useMemo(()=>{


    return (

      forms.length > 0 &&

      selectedIds.length === forms.length

    );


  },[

    forms.length,

    selectedIds,

  ]);











  function toggle(id:string){


    setSelectedIds((current)=>

      current.includes(id)

        ? current.filter(

            (item)=>item !== id

          )

        : [

            ...current,

            id,

          ]

    );


  }









  function toggleAll(){


    if(allSelected){

      setSelectedIds([]);

      return;

    }





    setSelectedIds(

      forms.map(

        (form)=>form.id

      )

    );


  }









  async function handlePublish(){


    const confirmed =

      window.confirm(

        `Publish ${selectedIds.length} form(s)?`

      );





    if(!confirmed){

      return;

    }





    try{


      setLoading(true);




      await bulkPublishForms({

        formIds:selectedIds,

      });





      setSelectedIds([]);



      window.location.reload();



    }finally{


      setLoading(false);


    }


  }









  async function handleArchive(){


    const confirmed =

      window.confirm(

        `Archive ${selectedIds.length} form(s)?`

      );





    if(!confirmed){

      return;

    }





    try{


      setLoading(true);




      await bulkArchiveForms({

        formIds:selectedIds,

      });





      setSelectedIds([]);



      window.location.reload();



    }finally{


      setLoading(false);


    }


  }












  async function handleDelete(){


    const confirmed =

      window.confirm(

        `Delete ${selectedIds.length} form(s) permanently?`

      );





    if(!confirmed){

      return;

    }





    try{


      setLoading(true);




      await bulkDeleteForms({

        formIds:selectedIds,

      });





      setSelectedIds([]);



      window.location.reload();



    }finally{


      setLoading(false);


    }


  }













  return (

    <div

      className="
        min-w-0
        space-y-5
        sm:space-y-6
      "

    >








      {
        selectedIds.length > 0 && (


          <div

            className="
              flex
              flex-col
              gap-4
              rounded-2xl
              border
              bg-card
              p-4
              shadow-sm

              sm:p-5

              lg:flex-row
              lg:items-center
              lg:justify-between
            "

          >





            <div

              className="
                text-sm
                font-medium
              "

            >

              {selectedIds.length}

              {" "}

              {
                selectedIds.length === 1
                  ? "form"
                  : "forms"
              }

              {" selected"}


            </div>









            <div

              className="
                grid
                grid-cols-2
                gap-2
                sm:flex
                sm:flex-wrap
              "

            >







              <button

                type="button"

                disabled={loading}

                onClick={handlePublish}

                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  px-3
                  py-2
                  text-sm
                  transition
                  hover:bg-muted
                  disabled:opacity-50
                "

              >

                <CheckCircle2

                  className="h-4 w-4"

                />

                Publish


              </button>









              <button

                type="button"

                disabled={loading}

                onClick={handleArchive}

                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  px-3
                  py-2
                  text-sm
                  transition
                  hover:bg-muted
                  disabled:opacity-50
                "

              >

                <Archive

                  className="h-4 w-4"

                />

                Archive


              </button>









              <button

                type="button"

                disabled={loading}

                onClick={handleDelete}

                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-destructive/30
                  px-3
                  py-2
                  text-sm
                  text-destructive
                  transition
                  hover:bg-destructive/10
                  disabled:opacity-50
                "

              >

                <Trash2

                  className="h-4 w-4"

                />

                {
                  loading
                    ? "Processing..."
                    : "Delete"
                }


              </button>









              <button

                type="button"

                disabled={loading}

                onClick={()=>setSelectedIds([])}

                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  px-3
                  py-2
                  text-sm
                  transition
                  hover:bg-muted
                  disabled:opacity-50
                "

              >

                <X

                  className="h-4 w-4"

                />

                Clear


              </button>





            </div>




          </div>


        )

      }









      <div

        className="
          min-w-0
          overflow-hidden
        "

      >

        <FormsTable

          forms={forms}

          selectedIds={selectedIds}

          allSelected={allSelected}

          onToggle={toggle}

          onToggleAll={toggleAll}

        />


      </div>









      <FormsPagination

        page={page}

        totalPages={totalPages}

        total={total}

        pageSize={pageSize}

      />




    </div>

  );

}