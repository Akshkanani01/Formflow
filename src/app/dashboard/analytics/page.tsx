import {
  getAnalytics,
} from "@/app/actions/analytics/get-analytics";


import {
  FileText,
  Eye,
  Send,
  TrendingUp,
} from "lucide-react";


import ResponseChart from "@/components/analytics/response-chart";


import FormPerformanceTable from "@/components/analytics/form-performance-table";







export default async function AnalyticsPage(){



  const data =

    await getAnalytics();






  const stats = [

    {

      title:"Total Forms",

      value:data.stats.totalForms,

      icon:FileText,

    },


    {

      title:"Published Forms",

      value:data.stats.publishedForms,

      icon:TrendingUp,

    },


    {

      title:"Total Responses",

      value:data.stats.totalResponses,

      icon:Send,

    },


    {

      title:"Total Views",

      value:data.stats.totalViews,

      icon:Eye,

    },

  ];









  return (

    <main

      className="
        space-y-6
        p-4

        sm:space-y-8
        sm:p-6
      "

    >








      {/* Header */}

      <section

        className="
          rounded-2xl
          border
          bg-background
          p-5
          shadow-sm

          sm:rounded-3xl
          sm:p-8
        "

      >

        <h1

          className="
            text-2xl
            font-bold

            sm:text-3xl
          "

        >

          Analytics

        </h1>



        <p

          className="
            mt-2
            text-sm
            text-muted-foreground

            sm:text-base
          "

        >

          Track form performance and response insights.

        </p>


      </section>









      {/* Stats */}

      <section

        className="
          grid
          gap-4

          sm:gap-6

          md:grid-cols-2

          xl:grid-cols-4
        "

      >


        {
          stats.map(

            (item)=>(


              <div

                key={item.title}

                className="
                  rounded-2xl
                  border
                  bg-background
                  p-5

                  sm:rounded-3xl
                  sm:p-6
                "

              >


                <div

                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "

                >


                  <p

                    className="
                      text-sm
                      text-muted-foreground
                    "

                  >

                    {item.title}

                  </p>



                  <item.icon

                    className="
                      h-5
                      w-5
                      shrink-0
                      text-primary
                    "

                  />


                </div>





                <p

                  className="
                    mt-4
                    text-3xl
                    font-bold

                    sm:mt-5
                    sm:text-4xl
                  "

                >

                  {item.value}

                </p>



              </div>


            )

          )
        }


      </section>









      {/* Response Chart */}

      <section

        className="
          overflow-hidden
          rounded-2xl
          border
          bg-background
          p-5

          sm:rounded-3xl
          sm:p-8
        "

      >

        <h2

          className="
            text-lg
            font-semibold

            sm:text-xl
          "

        >

          Response Trend

        </h2>




        <div

          className="
            mt-5
            min-h-[280px]

            sm:mt-6
            sm:min-h-[350px]
          "

        >

          <ResponseChart

            data={
              data.responseTrend
            }

          />


        </div>


      </section>









      {/* Performance */}

      <section

        className="
          overflow-hidden
          rounded-2xl
          border
          bg-background
          p-5

          sm:rounded-3xl
          sm:p-8
        "

      >


        <div

          className="
            mb-5

            sm:mb-6
          "

        >

          <h2

            className="
              text-lg
              font-semibold

              sm:text-xl
            "

          >

            Form Performance

          </h2>



          <p

            className="
              mt-1
              text-sm
              text-muted-foreground
            "

          >

            Views, responses and conversion rate.

          </p>


        </div>





        <div

          className="
            overflow-x-auto
          "

        >

          <FormPerformanceTable

            data={
              data.formPerformance
            }

          />


        </div>


      </section>









      {/* Top Forms */}

      <section

        className="
          rounded-2xl
          border
          bg-background
          p-5

          sm:rounded-3xl
          sm:p-8
        "

      >

        <h2

          className="
            text-lg
            font-semibold

            sm:text-xl
          "

        >

          Top Performing Forms

        </h2>





        <div

          className="
            mt-5
            space-y-3
          "

        >


          {
            data.topForms.map(

              (form,index)=>(


                <div

                  key={form.id}

                  className="
                    flex
                    flex-col
                    gap-3
                    rounded-2xl
                    border
                    p-4

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:p-5
                  "

                >




                  <div

                    className="
                      flex
                      min-w-0
                      items-center
                      gap-3

                      sm:gap-4
                    "

                  >


                    <div

                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-primary/10
                        font-bold
                      "

                    >

                      {index + 1}

                    </div>





                    <span

                      className="
                        truncate
                        text-sm
                        font-medium

                        sm:text-base
                      "

                    >

                      {form.title}

                    </span>


                  </div>





                  <span

                    className="
                      text-sm
                      text-muted-foreground
                    "

                  >

                    {form.responses} responses

                  </span>



                </div>


              )

            )
          }


        </div>


      </section>





    </main>

  );

}