import Link from "next/link";

import {
  Plus,
  MessageSquare,
  ClipboardList,
  UserPlus,
  ArrowRight,
} from "lucide-react";



const actions = [

  {
    title:"New Form",
    description:"Create a new form from scratch",
    icon:Plus,
    href:"/dashboard/forms",
    featured:true,
  },

  {
    title:"Contact Form",
    description:"Collect customer enquiries",
    icon:MessageSquare,
    href:"/dashboard/templates",
  },

  {
    title:"Feedback Form",
    description:"Gather valuable feedback",
    icon:ClipboardList,
    href:"/dashboard/templates",
  },

  {
    title:"Registration",
    description:"Event & user registrations",
    icon:UserPlus,
    href:"/dashboard/templates",
  },

];






export default function QuickActions(){


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

            Quick Actions

          </h2>



          <p

            className="
              mt-1
              text-sm
              text-muted-foreground
            "

          >

            Start faster using ready-made actions.

          </p>


        </div>





        <Link

          href="/dashboard/templates"

          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-primary
          "

        >

          Browse Templates


          <ArrowRight

            className="
              h-4
              w-4
            "

          />


        </Link>




      </div>









      <div

        className="
          grid
          gap-4
          p-5

          sm:gap-5
          sm:p-8

          md:grid-cols-2

          xl:grid-cols-4
        "

      >



        {
          actions.map(

            (action)=>(


              <Link

                key={action.title}

                href={action.href}

                className={`

                  group

                  rounded-2xl

                  border

                  p-5

                  transition-all

                  duration-300


                  hover:-translate-y-1

                  hover:shadow-xl


                  sm:rounded-3xl

                  sm:p-6


                  ${
                    action.featured

                    ? "border-primary/30 bg-primary/5"

                    : "border-border bg-background"

                  }

                `}

              >




                <div

                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary
                    text-primary-foreground

                    sm:h-14
                    sm:w-14
                    sm:rounded-2xl
                  "

                >

                  <action.icon

                    className="
                      h-5
                      w-5

                      sm:h-6
                      sm:w-6
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

                  {action.title}


                </h3>





                <p

                  className="
                    mt-2
                    text-sm
                    text-muted-foreground
                  "

                >

                  {action.description}


                </p>








                <div

                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-primary

                    sm:mt-8
                  "

                >

                  Open


                  <ArrowRight

                    className="
                      h-4
                      w-4
                      transition-transform
                      group-hover:translate-x-1
                    "

                  />

                </div>





              </Link>


            )

          )
        }




      </div>



    </section>

  );

}