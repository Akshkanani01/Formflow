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
        space-y-8
        p-6
      "

    >





      <section

        className="
          rounded-3xl
          border
          bg-background
          p-8
          shadow-sm
        "

      >

        <h1

          className="
            text-3xl
            font-bold
          "

        >

          Analytics

        </h1>


        <p

          className="
            mt-2
            text-muted-foreground
          "

        >

          Track form performance and response insights.

        </p>


      </section>









      <section

        className="
          grid
          gap-6
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
                  rounded-3xl
                  border
                  bg-background
                  p-6
                "

              >

                <div

                  className="
                    flex
                    items-center
                    justify-between
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
                      text-primary
                    "

                  />


                </div>



                <p

                  className="
                    mt-5
                    text-4xl
                    font-bold
                  "

                >

                  {item.value}

                </p>


              </div>

            )

          )
        }


      </section>









      <section

        className="
          rounded-3xl
          border
          bg-background
          p-8
        "

      >

        <h2

          className="
            text-xl
            font-semibold
          "

        >

          Response Trend

        </h2>


        <div

          className="
            mt-6
          "

        >

          <ResponseChart

            data={
              data.responseTrend
            }

          />


        </div>


      </section>









      <section

        className="
          rounded-3xl
          border
          bg-background
          p-8
        "

      >

        <div

          className="
            mb-6
          "

        >

          <h2

            className="
              text-xl
              font-semibold
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





        <FormPerformanceTable

          data={
            data.formPerformance
          }

        />


      </section>









      <section

        className="
          rounded-3xl
          border
          bg-background
          p-8
        "

      >

        <h2

          className="
            text-xl
            font-semibold
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
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    p-5
                  "

                >

                  <div

                    className="
                      flex
                      items-center
                      gap-4
                    "

                  >

                    <div

                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-primary/10
                        font-bold
                      "

                    >

                      {index+1}

                    </div>


                    <span>

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