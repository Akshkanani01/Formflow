import {
  TrendingUp,
  Eye,
  Send,
  FileText,
} from "lucide-react";


type AnalyticsOverviewProps = {

  totalForms:number;

  totalResponses:number;

  totalViews:number;

  publishedForms:number;

};





function percentage(
  value:number,
  total:number
){

  if(total === 0){

    return 0;

  }


  return Math.round(
    (value / total) * 100
  );

}







export default function AnalyticsOverview({

  totalForms,

  totalResponses,

  totalViews,

  publishedForms,

}:AnalyticsOverviewProps){



  const averageResponses =

    totalForms === 0

      ? 0

      : Math.round(
          totalResponses / totalForms
        );





  const publishRate = percentage(

    publishedForms,

    totalForms

  );





  const averageViews =

    totalForms === 0

      ? 0

      : Math.round(
          totalViews / totalForms
        );








  const cards = [

    {

      title:"Publish Rate",

      value:`${publishRate}%`,

      subtitle:"Forms currently published",

      icon:TrendingUp,

    },


    {

      title:"Avg Responses",

      value:averageResponses,

      subtitle:"Per form",

      icon:Send,

    },


    {

      title:"Avg Views",

      value:averageViews,

      subtitle:"Per form",

      icon:Eye,

    },


    {

      title:"Live Forms",

      value:publishedForms,

      subtitle:"Currently collecting data",

      icon:FileText,

    },


  ];








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
          border-b
          border-border
          px-5
          py-5

          sm:px-8
          sm:py-6
        "

      >

        <h2

          className="
            text-xl
            font-semibold
            tracking-tight

            sm:text-2xl
          "

        >

          Analytics Overview

        </h2>





        <p

          className="
            mt-1
            text-sm
            text-muted-foreground
          "

        >

          Live performance metrics from your workspace.

        </p>


      </div>









      <div

        className="
          grid
          gap-4
          p-5

          sm:gap-6
          sm:p-8

          md:grid-cols-2

          xl:grid-cols-4
        "

      >


        {
          cards.map(

            (card)=>(


              <div

                key={card.title}

                className="
                  rounded-2xl
                  border
                  border-border
                  bg-background
                  p-5
                  transition-all
                  duration-300

                  hover:border-primary/30
                  hover:shadow-lg

                  sm:rounded-3xl
                  sm:p-6
                "

              >




                <div

                  className="
                    flex
                    items-center
                    justify-between
                  "

                >

                  <div

                    className="
                      rounded-xl
                      bg-primary/10
                      p-2.5

                      sm:rounded-2xl
                      sm:p-3
                    "

                  >

                    <card.icon

                      className="
                        h-5
                        w-5
                        text-primary

                        sm:h-6
                        sm:w-6
                      "

                    />

                  </div>


                </div>








                <div

                  className="
                    mt-5

                    sm:mt-6
                  "

                >


                  <p

                    className="
                      text-sm
                      text-muted-foreground
                    "

                  >

                    {card.title}

                  </p>





                  <h3

                    className="
                      mt-2
                      text-3xl
                      font-bold
                      tracking-tight

                      sm:text-4xl
                    "

                  >

                    {card.value}

                  </h3>





                  <p

                    className="
                      mt-2
                      text-sm
                      text-muted-foreground
                    "

                  >

                    {card.subtitle}

                  </p>


                </div>




              </div>


            )

          )
        }



      </div>



    </section>

  );

}