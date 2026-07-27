"use client";

import { useMemo, useState } from "react";

import {
  Archive,
  CheckCircle2,
  Trash2,
  X,
} from "lucide-react";

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

  id: string;

  title: string;

  description: string | null;

  status: FormStatusType;

  updatedAt: Date;

  _count: {

    submissions: number;

  };

};





type FormsListProps = {

  forms: FormItem[];

  page: number;

  total: number;

  totalPages: number;

  pageSize: number;

};







export function FormsList({

  forms,

  page,

  total,

  totalPages,

  pageSize,

}: FormsListProps) {




  const [selectedIds, setSelectedIds] =

    useState<string[]>([]);






  const allSelected = useMemo(() => {


    return (

      forms.length > 0 &&

      selectedIds.length === forms.length

    );


  }, [

    forms.length,

    selectedIds,

  ]);








  function toggle(id:string) {


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








  function toggleAll() {



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








  return (

    <div

      className="
        min-w-0
        space-y-5
        sm:space-y-6
      "

    >








      {/* Bulk Actions */}

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
                "

              >

                <CheckCircle2
                  className="h-4 w-4"
                />

                Publish

              </button>







              <button

                type="button"

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
                "

              >

                <Archive
                  className="h-4 w-4"
                />

                Archive

              </button>







              <button

                type="button"

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
                "

              >

                <Trash2
                  className="h-4 w-4"
                />

                Delete

              </button>








              <button

                type="button"

                onClick={()=>

                  setSelectedIds([])

                }

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









      {/* Forms Table */}

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