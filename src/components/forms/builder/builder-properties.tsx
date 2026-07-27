"use client";

import {
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import {
  useBuilder,
} from "./builder-context";



export function BuilderProperties() {


  const {
    fields,
    selectedFieldId,
    updateField,
    isPropertiesOpen,
    closeProperties,
  } = useBuilder();




  const selectedField =
    fields.find(
      (field) =>
        field.id === selectedFieldId
    );





  function updateSettings(
    value: Record<string, unknown>
  ) {


    if (!selectedField) {
      return;
    }


    updateField(

      selectedField.id,

      {
        settings: {

          ...(selectedField.settings ?? {}),

          ...value,

        },

      }

    );

  }





  const options =
    selectedField?.settings?.options ?? [];





  function addOption() {


    updateSettings({

      options: [

        ...options,

        `Option ${options.length + 1}`,

      ],

    });


  }






  function updateOption(
    index:number,
    value:string
  ) {


    const updated =
      [...options];


    updated[index] = value;



    updateSettings({

      options:updated,

    });


  }





  function removeOption(
    index:number
  ) {


    updateSettings({

      options:

        options.filter(

          (_,itemIndex)=>

            itemIndex !== index

        ),

    });


  }






  const content = (


    <>

      <div

        className="
          border-b
          px-4
          py-4
          sm:px-5
        "

      >

        <div

          className="
            flex
            items-center
            justify-between
          "

        >

          <div>

            <h2 className="text-sm font-semibold">
              Properties
            </h2>


            {
              selectedField && (

                <p
                  className="
                    mt-1
                    text-xs
                    text-muted-foreground
                  "
                >
                  {selectedField.type}
                </p>

              )
            }

          </div>



          <button

            onClick={closeProperties}

            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              hover:bg-muted
              lg:hidden
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


      </div>





      {
        !selectedField ? (

          <div className="p-4 sm:p-5">

            <div

              className="
                rounded-xl
                border
                border-dashed
                p-6
                text-center
              "

            >

              <p className="text-sm text-muted-foreground">
                Select a field to edit its properties.
              </p>

            </div>

          </div>


        ) : (


          <div

            className="
              space-y-6
              p-4
              sm:p-5
            "

          >




            <div className="space-y-2">

              <label className="text-sm font-medium">
                Label
              </label>


              <Input

                value={
                  selectedField.label
                }


                onChange={(event)=>

                  updateField(

                    selectedField.id,

                    {

                      label:
                        event.target.value,

                    }

                  )

                }

              />


            </div>







            <div className="space-y-2">


              <label className="text-sm font-medium">
                Description
              </label>



              <Textarea

                value={
                  selectedField.description ?? ""
                }


                onChange={(event)=>

                  updateField(

                    selectedField.id,

                    {

                      description:
                        event.target.value,

                    }

                  )

                }

              />


            </div>







            <div className="space-y-2">


              <label className="text-sm font-medium">
                Placeholder
              </label>



              <Input

                value={
                  selectedField.placeholder ?? ""
                }


                onChange={(event)=>

                  updateField(

                    selectedField.id,

                    {

                      placeholder:
                        event.target.value,

                    }

                  )

                }

              />


            </div>







            <div

              className="
                flex
                items-center
                justify-between
                gap-4
                rounded-lg
                border
                p-3
              "

            >

              <p className="text-sm font-medium">
                Required
              </p>


              <Switch

                checked={
                  selectedField.required
                }


                onCheckedChange={(value)=>

                  updateField(

                    selectedField.id,

                    {

                      required:value,

                    }

                  )

                }

              />


            </div>







            {[
              "dropdown",
              "radio",
              "checkbox",
            ].includes(

              selectedField.type

            ) && (

              <div className="space-y-3">


                <label className="text-sm font-medium">
                  Options
                </label>



                {
                  options.map(

                    (option,index)=>(


                      <div

                        key={index}

                        className="
                          flex
                          gap-2
                        "

                      >

                        <Input

                          value={option}

                          onChange={(event)=>

                            updateOption(

                              index,

                              event.target.value

                            )

                          }

                        />



                        <Button

                          type="button"

                          size="icon"

                          variant="ghost"

                          onClick={()=>

                            removeOption(index)

                          }

                        >

                          <Trash2
                            className="h-4 w-4"
                          />

                        </Button>


                      </div>


                    )

                  )
                }




                <Button

                  type="button"

                  variant="outline"

                  className="w-full"

                  onClick={addOption}

                >

                  <Plus
                    className="
                      mr-2
                      h-4
                      w-4
                    "
                  />

                  Add Option

                </Button>


              </div>

            )}






            {
              selectedField.type === "number" && (

                <div className="space-y-3">

                  <label className="text-sm font-medium">
                    Number Range
                  </label>


                  <Input

                    type="number"

                    placeholder="Minimum"

                    value={
                      selectedField.settings?.min ?? ""
                    }


                    onChange={(event)=>

                      updateSettings({

                        min:Number(
                          event.target.value
                        ),

                      })

                    }

                  />


                  <Input

                    type="number"

                    placeholder="Maximum"

                    value={
                      selectedField.settings?.max ?? ""
                    }


                    onChange={(event)=>

                      updateSettings({

                        max:Number(
                          event.target.value
                        ),

                      })

                    }

                  />


                </div>

              )
            }







            {
              selectedField.type === "file" && (

                <div className="space-y-2">

                  <label className="text-sm font-medium">
                    Maximum File Size (MB)
                  </label>


                  <Input

                    type="number"

                    value={
                      selectedField.settings?.maxSize ?? ""
                    }


                    onChange={(event)=>

                      updateSettings({

                        maxSize:Number(
                          event.target.value
                        ),

                      })

                    }

                  />

                </div>

              )
            }




          </div>


        )
      }


    </>

  );






  return (

    <>


      {
        isPropertiesOpen && (

          <div

            onClick={closeProperties}

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
          border-l
          bg-card

          fixed
          inset-y-0
          right-0
          z-50
          w-80
          translate-x-full
          transition-transform
          duration-300

          lg:static
          lg:z-auto
          lg:w-auto
          lg:translate-x-0

          data-[open=true]:translate-x-0
        "

        data-open={
          isPropertiesOpen
        }

      >

        {content}

      </aside>


    </>

  );

}