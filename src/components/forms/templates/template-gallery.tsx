"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";


import {
  Search,
} from "lucide-react";


import {
  TemplateCard,
} from "./template-card";


import {
  formTemplates,
  type FormTemplate,
} from "@/lib/forms/templates/templates";


import {
  createFormFromTemplate,
} from "@/app/actions/forms/create-form-from-template";





type TemplateGalleryProps = {};







export function TemplateGallery(){




  const router =
    useRouter();




  const [search,setSearch] =
    useState("");



  const [category,setCategory] =
    useState("All");



  const [loadingId,setLoadingId] =
    useState<string | null>(null);








  const categories = useMemo(()=>{


    return [

      "All",

      ...Array.from(

        new Set(

          formTemplates.map(

            (template)=>

              template.category

          )

        )

      ),

    ];


  },[]);









  const filteredTemplates = useMemo(()=>{


    return formTemplates.filter(

      (template)=>{


        const matchesSearch =

          template.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

          ||

          template.description
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );





        const matchesCategory =

          category === "All"

          ||

          template.category === category;




        return (

          matchesSearch

          &&

          matchesCategory

        );


      }

    );


  },[
    search,
    category,
  ]);










  async function handleUseTemplate(

    template:FormTemplate

  ){


    try {


      setLoadingId(
        template.id
      );




      const result =

        await createFormFromTemplate({

          templateId:
            template.id,

        });





      router.push(

        `/dashboard/forms/${result.formId}/builder`

      );



    } finally {


      setLoadingId(null);


    }


  }









  return (

    <div
      className="
        space-y-8
      "
    >



      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >

          Form Templates

        </h1>



        <p
          className="
            mt-2
            text-muted-foreground
          "
        >

          Start quickly with professional templates.

        </p>


      </div>








      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
        "
      >



        <div
          className="
            relative
            flex-1
          "
        >

          <Search

            className="
              absolute
              left-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-muted-foreground
            "

          />



          <input

            value={search}

            onChange={(event)=>

              setSearch(
                event.target.value
              )

            }


            placeholder="Search templates..."

            className="
              h-11
              w-full
              rounded-xl
              border
              bg-background
              pl-10
              pr-4
              text-sm
            "

          />


        </div>







        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >

          {
            categories.map(

              (item)=>(

                <button

                  key={item}

                  type="button"

                  onClick={()=>


                    setCategory(item)


                  }

                  className={`

                    rounded-xl

                    border

                    px-4

                    py-2

                    text-sm

                    ${
                      category === item

                      ? "bg-primary text-primary-foreground"

                      : "bg-background"

                    }

                  `}

                >

                  {item}

                </button>


              )

            )
          }


        </div>



      </div>









      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >


        {
          filteredTemplates.map(

            (template)=>(


              <TemplateCard

                key={
                  template.id
                }


                template={
                  template
                }


                onUse={

                  handleUseTemplate

                }


              />


            )

          )
        }



      </div>



    </div>

  );

}