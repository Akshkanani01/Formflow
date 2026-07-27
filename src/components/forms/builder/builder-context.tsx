"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { saveBuilderFields } from "@/app/actions/forms/save-builder-fields";



export type BuilderField = {

  id: string;

  type: string;

  label: string;

  description?: string;

  placeholder?: string;

  required: boolean;


  settings?: {

    options?: string[];

    min?: number;

    max?: number;

    maxSize?: number;

    allowedTypes?: string[];

  };

};





type BuilderContextType = {

  fields: BuilderField[];

  selectedFieldId: string | null;



  addField: (
    field: BuilderField
  ) => void;



  selectField: (
    id: string
  ) => void;



  updateField: (
    id: string,
    data: Partial<BuilderField>
  ) => void;



  removeField: (
    id: string
  ) => void;



  duplicateField: (
    id: string
  ) => void;



  reorderFields: (
    startIndex: number,
    endIndex: number
  ) => void;



  undo: () => void;



  redo: () => void;



  canUndo: boolean;



  canRedo: boolean;



  // Mobile Drawer State

  isSidebarOpen: boolean;

  isPropertiesOpen: boolean;



  openSidebar: () => void;

  closeSidebar: () => void;



  openProperties: () => void;

  closeProperties: () => void;

};






type BuilderProviderProps = {

  children: ReactNode;

  formId: string;

  initialFields: BuilderField[];

};






const BuilderContext =
  createContext<BuilderContextType | null>(
    null
  );








export function BuilderProvider({

  children,

  formId,

  initialFields,

}: BuilderProviderProps) {



  const [fields, setFields] =
    useState<BuilderField[]>(
      initialFields
    );




  const [selectedFieldId, setSelectedFieldId] =
    useState<string | null>(
      null
    );




  const [history, setHistory] =
    useState<BuilderField[][]>([
      initialFields,
    ]);




  const [historyIndex, setHistoryIndex] =
    useState(0);




  const [hydrated, setHydrated] =
    useState(false);





  // Mobile Drawer States

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);



  const [isPropertiesOpen, setIsPropertiesOpen] =
    useState(false);





  const canUndo =
    historyIndex > 0;



  const canRedo =
    historyIndex <
    history.length - 1;





  useEffect(() => {

    setHydrated(true);

  }, []);





  useEffect(() => {


    if (!hydrated) {

      return;

    }



    const timeout =

      setTimeout(() => {


        saveBuilderFields({

          formId,

          fields,

        }).catch((error)=>{


          console.error(

            "Builder save failed:",

            error

          );


        });



      },800);




    return () =>

      clearTimeout(timeout);



  }, [

    fields,

    formId,

    hydrated,

  ]);





  function openSidebar() {

    setIsSidebarOpen(true);

  }





  function closeSidebar() {

    setIsSidebarOpen(false);

  }





  function openProperties() {

    setIsPropertiesOpen(true);

  }





  function closeProperties() {

    setIsPropertiesOpen(false);

  }
    function saveHistory(
    updatedFields: BuilderField[]
  ) {


    const nextHistory =

      history.slice(

        0,

        historyIndex + 1

      );



    nextHistory.push(

      updatedFields

    );



    setHistory(

      nextHistory

    );



    setHistoryIndex(

      nextHistory.length - 1

    );



    setFields(

      updatedFields

    );

  }







  function addField(

    field: BuilderField

  ) {


    saveHistory([

      ...fields,

      field,

    ]);



    setSelectedFieldId(

      field.id

    );


    closeSidebar();

    openProperties();

  }







  function selectField(

    id: string

  ) {


    setSelectedFieldId(id);


    openProperties();


  }








  function updateField(

    id: string,

    data: Partial<BuilderField>

  ) {


    const updated =

      fields.map(

        (field) =>

          field.id === id

            ? {

                ...field,

                ...data,

              }

            : field

      );



    saveHistory(

      updated

    );

  }







  function removeField(

    id: string

  ) {


    const updated =

      fields.filter(

        (field) =>

          field.id !== id

      );



    saveHistory(

      updated

    );



    if (

      selectedFieldId === id

    ) {

      setSelectedFieldId(null);

      closeProperties();

    }

  }







  function duplicateField(

    id: string

  ) {



    const field =

      fields.find(

        (item) =>

          item.id === id

      );



    if (!field) {

      return;

    }





    const duplicated: BuilderField = {


      ...field,


      id:

        crypto.randomUUID(),



      label:

        `${field.label} Copy`,


    };





    const index =

      fields.findIndex(

        (item) =>

          item.id === id

      );





    const updated = [


      ...fields.slice(

        0,

        index + 1

      ),



      duplicated,



      ...fields.slice(

        index + 1

      ),



    ];





    saveHistory(

      updated

    );



    setSelectedFieldId(

      duplicated.id

    );


    openProperties();

  }








  function reorderFields(

    startIndex: number,

    endIndex: number

  ) {



    const updated =

      Array.from(fields);





    const [removed] =

      updated.splice(

        startIndex,

        1

      );





    updated.splice(

      endIndex,

      0,

      removed

    );





    saveHistory(

      updated

    );

  }








  function undo() {



    if (!canUndo) {

      return;

    }





    const previous =

      history[

        historyIndex - 1

      ];





    setHistoryIndex(

      historyIndex - 1

    );





    setFields(

      previous

    );



  }








  function redo() {



    if (!canRedo) {

      return;

    }





    const next =

      history[

        historyIndex + 1

      ];





    setHistoryIndex(

      historyIndex + 1

    );





    setFields(

      next

    );



  }








  return (

    <BuilderContext.Provider

      value={{

        fields,


        selectedFieldId,


        addField,


        selectField,


        updateField,


        removeField,


        duplicateField,


        reorderFields,


        undo,


        redo,


        canUndo,


        canRedo,



        isSidebarOpen,


        isPropertiesOpen,


        openSidebar,


        closeSidebar,


        openProperties,


        closeProperties,


      }}

    >

      {children}

    </BuilderContext.Provider>

  );

}








export function useBuilder() {


  const context =

    useContext(

      BuilderContext

    );



  if (!context) {


    throw new Error(

      "useBuilder must be used inside BuilderProvider"

    );


  }



  return context;

}