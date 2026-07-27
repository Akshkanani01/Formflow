"use client";

import {
  Plus,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  FIELD_TYPES,
} from "@/components/forms/builder/field-types";

import {
  useBuilder,
} from "./builder-context";



export function BuilderSidebar() {


  const {
    addField,
    isSidebarOpen,
    closeSidebar,
  } = useBuilder();





  function handleAddField(
    type: string,
    label: string
  ) {


    addField({

      id:
        crypto.randomUUID(),

      type,

      label,

      description:
        "",

      placeholder:
        "",

      required:
        false,

    });


    closeSidebar();

  }






  return (

    <>


      {/* Mobile Overlay */}

      {
        isSidebarOpen && (

          <div

            onClick={closeSidebar}

            className="
              fixed
              inset-0
              z-40
              bg-black/40
              lg:hidden
            "

          />

        )
      }







      <aside

        className="
          h-full
          overflow-y-auto
          border-r
          bg-card

          fixed
          inset-y-0
          left-0
          z-50
          w-72
          -translate-x-full
          transition-transform
          duration-300

          lg:static
          lg:z-auto
          lg:w-auto
          lg:translate-x-0

          data-[open=true]:translate-x-0
        "

        data-open={
          isSidebarOpen
        }

      >





        {/* Mobile Header */}

        <div

          className="
            flex
            items-center
            justify-between
            border-b
            px-4
            py-4
            lg:hidden
          "

        >

          <div>

            <h2
              className="
                text-sm
                font-semibold
              "
            >
              Components
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-muted-foreground
              "
            >
              Add fields to your form
            </p>

          </div>



          <button

            onClick={closeSidebar}

            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              hover:bg-muted
            "

          >

            <X
              className="
                h-4
                w-4
              "
            />

          </button>


        </div>









        {/* Desktop Header */}

        <div

          className="
            hidden
            border-b
            px-4
            py-4
            sm:px-5
            lg:block
          "

        >

          <h2

            className="
              text-sm
              font-semibold
            "

          >

            Components

          </h2>



          <p

            className="
              mt-1
              text-xs
              text-muted-foreground
            "

          >

            Add fields to your form

          </p>


        </div>









        <div

          className="
            space-y-2
            p-3
            sm:p-4
          "

        >

          {
            FIELD_TYPES.map(

              (field) => (

                <Button


                  key={
                    field.type
                  }



                  variant="outline"



                  className="
                    h-10
                    w-full
                    justify-start
                    rounded-lg
                    text-sm
                    font-normal
                  "



                  onClick={() =>

                    handleAddField(

                      field.type,

                      field.label

                    )

                  }


                >

                  <Plus

                    className="
                      mr-2
                      h-4
                      w-4
                    "

                  />


                  {field.label}


                </Button>


              )

            )
          }


        </div>



      </aside>


    </>

  );

}