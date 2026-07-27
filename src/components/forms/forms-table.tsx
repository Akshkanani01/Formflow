"use client";

import Link from "next/link";

import {
  DeleteFormButton,
} from "./delete-form-button";

import {
  DuplicateFormButton,
} from "./duplicate-form-button";

import {
  RestoreFormButton,
} from "./restore-form-button";





const FormStatus = {

  DRAFT:"DRAFT",

  PUBLISHED:"PUBLISHED",

  ARCHIVED:"ARCHIVED",

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







type FormsTableProps = {

  forms:FormItem[];

  selectedIds:string[];

  allSelected:boolean;

  onToggle:(id:string)=>void;

  onToggleAll:()=>void;

};









function getStatusClasses(

  status:FormStatusType

){


  switch(status){


    case FormStatus.PUBLISHED:

      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";



    case FormStatus.ARCHIVED:

      return "bg-muted text-muted-foreground";



    default:

      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";


  }


}









function formatDate(date:Date){


  return new Intl.DateTimeFormat(

    "en-IN",

    {

      day:"2-digit",

      month:"short",

      year:"numeric",

    }

  ).format(date);


}









export function FormsTable({

  forms,

  selectedIds,

  allSelected,

  onToggle,

  onToggleAll,

}:FormsTableProps){





  if(forms.length===0){

    return (

      <div

        className="
          rounded-2xl
          border
          border-dashed
          p-8
          text-center
          sm:p-12
        "

      >

        <h3 className="text-lg font-semibold">

          No forms found

        </h3>


        <p className="mt-2 text-sm text-muted-foreground">

          Create your first form to get started.

        </p>


      </div>

    );

  }









  return (

    <>





      {/* Mobile */}


      <div

        className="
          space-y-3
          lg:hidden
        "

      >


        <div

          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            bg-card
            p-4
          "

        >

          <input

            type="checkbox"

            checked={allSelected}

            onChange={onToggleAll}

            className="h-4 w-4 rounded"

          />


          <span className="text-sm font-medium">

            Select all

          </span>


        </div>







        {
          forms.map((form)=>{


            const checked =

              selectedIds.includes(form.id);



            return (

              <div

                key={form.id}

                className="
                  rounded-2xl
                  border
                  bg-card
                  p-4
                "

              >




                <div

                  className="
                    flex
                    items-start
                    gap-3
                  "

                >

                  <input

                    type="checkbox"

                    checked={checked}

                    onChange={()=>onToggle(form.id)}

                    className="
                      mt-1
                      h-4
                      w-4
                      rounded
                    "

                  />





                  <Link

                    href={`/dashboard/forms/${form.id}/builder`}

                    className="
                      flex-1
                      min-w-0
                    "

                  >

                    <h3 className="truncate font-semibold">

                      {form.title}

                    </h3>



                    {
                      form.description && (

                        <p

                          className="
                            mt-1
                            line-clamp-2
                            text-sm
                            text-muted-foreground
                          "

                        >

                          {form.description}

                        </p>

                      )
                    }


                  </Link>


                </div>
                                <div

                  className="
                    mt-4
                    flex
                    items-center
                    justify-between
                  "

                >



                  <span

                    className={`

                      inline-flex

                      rounded-full

                      px-2.5

                      py-1

                      text-xs

                      font-medium

                      ${getStatusClasses(form.status)}

                    `}

                  >

                    {form.status}

                  </span>







                  <div

                    className="
                      flex
                      items-center
                      gap-1
                    "

                  >


                    {
                      form.status === FormStatus.ARCHIVED && (

                        <RestoreFormButton

                          formId={form.id}

                        />

                      )
                    }





                    <DuplicateFormButton

                      formId={form.id}

                    />





                    <DeleteFormButton

                      formId={form.id}

                      formTitle={form.title}

                    />



                  </div>



                </div>








                <p

                  className="
                    mt-3
                    text-xs
                    text-muted-foreground
                  "

                >

                  Updated {formatDate(form.updatedAt)}

                </p>



              </div>


            );


          })
        }



      </div>












      {/* Desktop Table */}


      <div

        className="
          hidden
          overflow-hidden
          rounded-2xl
          border
          lg:block
        "

      >


        <table className="w-full">


          <thead className="bg-muted/50">


            <tr className="border-b text-left">


              <th className="w-12 px-4 py-4">


                <input

                  type="checkbox"

                  checked={allSelected}

                  onChange={onToggleAll}

                  className="h-4 w-4 rounded"

                />


              </th>





              <th className="px-6 py-4 text-sm font-medium">

                Form

              </th>





              <th className="px-6 py-4 text-sm font-medium">

                Status

              </th>





              <th className="px-6 py-4 text-sm font-medium">

                Responses

              </th>





              <th className="px-6 py-4 text-sm font-medium">

                Updated

              </th>





              <th className="px-6 py-4 text-right text-sm font-medium">

                Action

              </th>


            </tr>


          </thead>








          <tbody>


            {
              forms.map((form)=>{


                const checked =

                  selectedIds.includes(form.id);





                return (

                  <tr

                    key={form.id}

                    className="
                      border-b
                      transition
                      hover:bg-muted/40
                    "

                  >



                    <td className="px-4 py-4">


                      <input

                        type="checkbox"

                        checked={checked}

                        onChange={()=>onToggle(form.id)}

                        className="h-4 w-4 rounded"

                      />


                    </td>









                    <td className="px-6 py-4">


                      <Link

                        href={`/dashboard/forms/${form.id}/builder`}

                      >

                        <div className="font-medium">

                          {form.title}

                        </div>





                        {
                          form.description && (

                            <p

                              className="
                                mt-1
                                line-clamp-1
                                text-sm
                                text-muted-foreground
                              "

                            >

                              {form.description}

                            </p>

                          )
                        }


                      </Link>


                    </td>









                    <td className="px-6 py-4">


                      <span

                        className={`

                          inline-flex

                          rounded-full

                          px-2.5

                          py-1

                          text-xs

                          font-medium

                          ${getStatusClasses(form.status)}

                        `}

                      >

                        {form.status}


                      </span>


                    </td>









                    <td className="px-6 py-4 text-sm">


                      {form._count.submissions}


                    </td>









                    <td className="px-6 py-4 text-sm text-muted-foreground">


                      {formatDate(form.updatedAt)}


                    </td>









                    <td className="px-6 py-4">


                      <div

                        className="
                          flex
                          justify-end
                          gap-1
                        "

                      >



                        {
                          form.status === FormStatus.ARCHIVED && (

                            <RestoreFormButton

                              formId={form.id}

                            />

                          )
                        }







                        <DuplicateFormButton

                          formId={form.id}

                        />







                        <DeleteFormButton

                          formId={form.id}

                          formTitle={form.title}

                        />




                      </div>


                    </td>



                  </tr>


                );


              })
            }



          </tbody>


        </table>


      </div>




    </>

  );

}