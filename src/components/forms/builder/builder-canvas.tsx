"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

import {
  Copy,
  GripVertical,
  Trash2,
} from "lucide-react";

import {
  useBuilder,
} from "./builder-context";

import {
  FieldRenderer,
} from "./field-renderer";


export function BuilderCanvas() {

  const {
    fields,
    selectedFieldId,
    selectField,
    reorderFields,
    duplicateField,
    removeField,
  } = useBuilder();



  function handleDragEnd(
    result: DropResult
  ) {

    if (!result.destination) {
      return;
    }


    if (
      result.destination.index ===
      result.source.index
    ) {
      return;
    }


    reorderFields(
      result.source.index,
      result.destination.index
    );

  }




  if (fields.length === 0) {

    return (

      <main
        className="
          overflow-y-auto
          bg-muted/20
          p-8
        "
      >

        <div
          className="
            mx-auto
            flex
            min-h-full
            w-full
            max-w-3xl
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            bg-background
            p-10
          "
        >

          <div className="text-center">


            <div
              className="
                mx-auto
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                bg-muted
                text-xl
              "
            >
              +
            </div>


            <h2 className="text-lg font-semibold">
              Start Building
            </h2>


            <p
              className="
                mt-2
                max-w-sm
                text-sm
                text-muted-foreground
              "
            >
              Select a component from the left panel
              to create your first form field.
            </p>


          </div>

        </div>

      </main>

    );

  }





  return (

    <main
      className="
        overflow-y-auto
        bg-muted/20
        p-8
      "
    >

      <DragDropContext
        onDragEnd={handleDragEnd}
      >

        <Droppable
          droppableId="form-fields"
        >

          {(provided)=>(


            <div

              ref={
                provided.innerRef
              }

              {...provided.droppableProps}

              className="
                mx-auto
                w-full
                max-w-3xl
                space-y-4
              "

            >


              {fields.map(
                (field,index)=>(


                  <Draggable

                    key={field.id}

                    draggableId={field.id}

                    index={index}

                  >


                    {(provided,snapshot)=>(


                      <div

                        ref={
                          provided.innerRef
                        }

                        {...provided.draggableProps}


                        className={`

                          rounded-xl

                          border

                          bg-background

                          p-5

                          transition

                          ${
                            snapshot.isDragging
                              ? "shadow-xl"
                              : ""
                          }


                          ${
                            selectedFieldId === field.id
                              ? "border-primary ring-2 ring-primary/20"
                              : "hover:border-primary/50"
                          }

                        `}


                        onClick={() =>
                          selectField(
                            field.id
                          )
                        }

                      >



                        <div
                          className="
                            flex
                            gap-3
                          "
                        >



                          {/* Drag */}

                          <div

                            {...provided.dragHandleProps}

                            className="
                              mt-1
                              cursor-grab
                              text-muted-foreground
                            "

                          >

                            <GripVertical
                              className="
                                h-5
                                w-5
                              "
                            />

                          </div>





                          <div
                            className="
                              flex-1
                              space-y-4
                            "
                          >



                            {/* Header */}

                            <div
                              className="
                                flex
                                items-start
                                justify-between
                                gap-4
                              "
                            >


                              <div>

                                <h3
                                  className="
                                    text-base
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

                                </h3>



                                <p
                                  className="
                                    mt-1
                                    text-xs
                                    uppercase
                                    text-muted-foreground
                                  "
                                >

                                  {field.type}

                                </p>


                              </div>





                              {/* Actions */}

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-1
                                "
                              >


                                <button

                                  type="button"

                                  onClick={(event)=>{

                                    event.stopPropagation();

                                    duplicateField(
                                      field.id
                                    );

                                  }}

                                  className="
                                    rounded-md
                                    p-2
                                    text-muted-foreground
                                    hover:bg-muted
                                  "

                                >

                                  <Copy
                                    className="
                                      h-4
                                      w-4
                                    "
                                  />

                                </button>





                                <button

                                  type="button"

                                  onClick={(event)=>{

                                    event.stopPropagation();

                                    removeField(
                                      field.id
                                    );

                                  }}

                                  className="
                                    rounded-md
                                    p-2
                                    text-muted-foreground
                                    hover:bg-destructive/10
                                    hover:text-destructive
                                  "

                                >

                                  <Trash2
                                    className="
                                      h-4
                                      w-4
                                    "
                                  />

                                </button>


                              </div>


                            </div>





                            {/* Preview */}

                            <FieldRenderer
                              field={field}
                            />


                          </div>


                        </div>


                      </div>


                    )}

                  </Draggable>


                )
              )}



              {provided.placeholder}



            </div>


          )}

        </Droppable>


      </DragDropContext>


    </main>

  );
}