"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  useRouter,
} from "next/navigation";


import {
  Search,
  FileText,
  FolderOpen,
} from "lucide-react";







type SearchResult = {

  forms:{
    id:string;

    title:string;

    slug:string;

  }[];

  templates:{

    id:string;

    title:string;

  }[];

};







export default function GlobalSearch(){



  const router = useRouter();



  const [query,setQuery] =

    useState("");



  const [results,setResults] =

    useState<SearchResult>({

      forms:[],

      templates:[],

    });



  const [open,setOpen] =

    useState(false);







  useEffect(()=>{


    const timer =

      setTimeout(async()=>{



        if(!query.trim()){

          setResults({

            forms:[],

            templates:[],

          });

          setOpen(false);

          return;

        }






        const response =

          await fetch(

            `/api/search?q=${encodeURIComponent(query)}`

          );



        const data =

          await response.json();




        setResults(data);

        setOpen(true);



      },500);




    return ()=>{

      clearTimeout(timer);

    };


  },[query]);









  return (

    <div

      className="
        relative
        flex-1
      "

    >



      <div

        className="
          relative
          max-w-xl
        "

      >


        <Search

          className="
            absolute
            left-4
            top-1/2
            h-5
            w-5
            -translate-y-1/2
            text-muted-foreground
          "

        />



        <input


          value={query}


          onChange={(event)=>{

            setQuery(

              event.target.value

            );

          }}


          placeholder="Search forms, templates..."


          className="
            h-12
            w-full
            rounded-2xl
            border
            border-border
            bg-background
            pl-12
            pr-5
            outline-none
            transition
            focus:border-primary
          "


        />



      </div>








      {
        open && (

          <div

            className="
              absolute
              left-0
              top-14
              z-50
              w-full
              max-w-xl
              overflow-hidden
              rounded-2xl
              border
              bg-card
              shadow-2xl
            "

          >





            {
              results.forms.length > 0 && (

                <div

                  className="
                    border-b
                    p-3
                  "

                >

                  <p

                    className="
                      mb-2
                      px-3
                      text-xs
                      font-semibold
                      text-muted-foreground
                    "

                  >

                    Forms

                  </p>




                  {
                    results.forms.map(

                      (form)=>(

                        <button

                          key={
                            form.id
                          }


                          onClick={()=>{

                            router.push(

                              `/dashboard/forms/${form.id}`

                            );

                            setOpen(false);

                          }}


                          className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-left
                            hover:bg-accent
                          "

                        >

                          <FileText

                            className="
                              h-4
                              w-4
                            "

                          />


                          {form.title}


                        </button>


                      )

                    )
                  }


                </div>

              )
            }








            {
              results.templates.length > 0 && (

                <div

                  className="
                    p-3
                  "

                >

                  <p

                    className="
                      mb-2
                      px-3
                      text-xs
                      font-semibold
                      text-muted-foreground
                    "

                  >

                    Templates

                  </p>





                  {
                    results.templates.map(

                      (template)=>(

                        <button

                          key={
                            template.id
                          }


                          onClick={()=>{

                            router.push(

                              `/dashboard/templates/${template.id}`

                            );

                            setOpen(false);

                          }}


                          className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-left
                            hover:bg-accent
                          "

                        >

                          <FolderOpen

                            className="
                              h-4
                              w-4
                            "

                          />


                          {template.title}


                        </button>


                      )

                    )
                  }


                </div>

              )
            }







            {
              results.forms.length === 0
              &&
              results.templates.length === 0
              && (

                <div

                  className="
                    p-6
                    text-center
                    text-sm
                    text-muted-foreground
                  "

                >

                  No results found

                </div>

              )
            }





          </div>

        )
      }





    </div>

  );

}