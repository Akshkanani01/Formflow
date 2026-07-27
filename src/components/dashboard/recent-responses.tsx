import Link from "next/link";

import {
  ArrowRight,
  Inbox,
} from "lucide-react";



type ResponseItem = {

  id:string;

  submittedAt:Date;

  form:{

    id:string;

    title:string;

  };

};





type RecentResponsesProps = {

  responses:ResponseItem[];

};







function formatRelative(date:Date){

  const diff =
    Date.now() -
    new Date(date).getTime();


  const minutes =
    Math.floor(diff / 60000);



  if(minutes < 1){

    return "Just now";

  }



  if(minutes < 60){

    return `${minutes} min ago`;

  }




  const hours =
    Math.floor(minutes / 60);



  if(hours < 24){

    return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  }




  const days =
    Math.floor(hours / 24);



  return `${days} day${days > 1 ? "s" : ""} ago`;

}









export default function RecentResponses({

  responses,

}:RecentResponsesProps){



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

            Recent Responses

          </h2>




          <p

            className="
              mt-1
              text-sm
              text-muted-foreground
            "

          >

            Latest submissions across all forms.

          </p>



        </div>







        <Link

          href="/dashboard/responses"

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
        responses.length === 0 ? (

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

              <Inbox

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

              No responses yet

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

              Responses will appear here once someone submits your forms.

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
              responses.map(

                (response)=>(


                  <Link

                    key={response.id}

                    href={`/dashboard/forms/${response.form.id}`}

                    className="
                      flex
                      flex-col
                      gap-3
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

                        {response.form.title}

                      </h3>





                      <p

                        className="
                          mt-1
                          text-sm
                          text-muted-foreground
                        "

                      >

                        New submission received

                      </p>



                    </div>







                    <span

                      className="
                        text-sm
                        text-muted-foreground
                      "

                    >

                      {formatRelative(response.submittedAt)}

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