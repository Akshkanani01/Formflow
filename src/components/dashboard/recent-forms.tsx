import Link from "next/link";

import {
  ArrowRight,
  FileText,
} from "lucide-react";



type FormItem = {

  id:string;

  title:string;

  status:
    | "DRAFT"
    | "PUBLISHED"
    | "ARCHIVED";

  updatedAt:Date;

  _count:{

    submissions:number;

    views:number;

  };

};



type RecentFormsProps = {

  forms:FormItem[];

};







function getStatusClasses(

  status:FormItem["status"]

){

  switch(status){

    case "PUBLISHED":

      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";


    case "ARCHIVED":

      return "bg-slate-500/10 text-slate-600 dark:text-slate-400";


    default:

      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";

  }

}








export default function RecentForms({

  forms,

}:RecentFormsProps){


  return (

    <section

      className="
        rounded-2xl
        border
        border-border
        bg-card

        sm:rounded-[32px]
      "

    >






      <div

        className="
          flex
          flex-col
          gap-4
          border-b
          border-border
          px-5
          py-5

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-8
          sm:py-6
        "

      >


        <div>


          <h2

            className="
              text-xl
              font-semibold
              tracking-tight

              sm:text-2xl
            "

          >

            Recent Forms

          </h2>




          <p

            className="
              mt-1
              text-sm
              text-muted-foreground
            "

          >

            Recently updated forms in your workspace.

          </p>



        </div>







        <Link

          href="/dashboard/forms"

          className="
            inline-flex
            w-fit
            items-center
            gap-2
            text-sm
            font-medium
            text-primary
          "

        >

          View All


          <ArrowRight

            className="
              h-4
              w-4
            "

          />

        </Link>




      </div>









      {
        forms.length === 0 ? (

          <div

            className="
              flex
              flex-col
              items-center
              justify-center
              px-5
              py-16

              sm:px-8
              sm:py-20
            "

          >


            <div

              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-primary/10

                sm:h-20
                sm:w-20
                sm:rounded-3xl
              "

            >

              <FileText

                className="
                  h-8
                  w-8
                  text-primary

                  sm:h-10
                  sm:w-10
                "

              />

            </div>





            <h3

              className="
                mt-5
                text-lg
                font-semibold

                sm:mt-6
                sm:text-xl
              "

            >

              No forms yet

            </h3>






            <p

              className="
                mt-2
                max-w-sm
                text-center
                text-sm
                text-muted-foreground
              "

            >

              Create your first form to start collecting responses.

            </p>




          </div>


        ) : (



          <div

            className="
              divide-y
              divide-border
            "

          >


            {
              forms.map(

                (form)=>(


                  <Link

                    key={form.id}

                    href={`/dashboard/forms/${form.id}`}

                    className="
                      flex
                      flex-col
                      gap-4
                      px-5
                      py-5
                      transition-colors

                      hover:bg-accent/40

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      sm:px-8
                      sm:py-6
                    "

                  >





                    <div

                      className="
                        min-w-0
                      "

                    >

                      <h3

                        className="
                          truncate
                          font-semibold
                        "

                      >

                        {form.title}

                      </h3>






                      <p

                        className="
                          mt-1
                          text-sm
                          text-muted-foreground
                        "

                      >

                        {form._count.submissions}

                        {" "}Responses •{" "}

                        {form._count.views}

                        {" "}Views

                      </p>



                    </div>









                    <span

                      className={`

                        w-fit

                        rounded-full

                        px-3

                        py-1

                        text-xs

                        font-semibold

                        ${getStatusClasses(form.status)}

                      `}

                    >

                      {form.status}


                    </span>





                  </Link>


                )

              )
            }



          </div>


        )

      }





    </section>

  );

}