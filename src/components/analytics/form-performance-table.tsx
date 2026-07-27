"use client";


type FormPerformanceTableProps = {

  data:{

    id:string;

    title:string;

    views:number;

    responses:number;

    conversion:number;

  }[];

};







export default function FormPerformanceTable({

  data,

}:FormPerformanceTableProps){



  if(data.length === 0){

    return (

      <div

        className="
          rounded-2xl
          border
          border-dashed
          p-8
          text-center
          text-sm
          text-muted-foreground
        "

      >

        No performance data available.

      </div>

    );

  }





  return (

    <div

      className="
        overflow-hidden
        rounded-2xl
        border
      "

    >

      <div

        className="
          overflow-x-auto
        "

      >

        <table

          className="
            min-w-[650px]
            w-full
            text-sm
          "

        >



          <thead>

            <tr

              className="
                border-b
                bg-muted/30
                text-left
              "

            >


              <th

                className="
                  whitespace-nowrap
                  px-5
                  py-4
                  font-medium
                "

              >

                Form

              </th>





              <th

                className="
                  whitespace-nowrap
                  px-5
                  py-4
                  font-medium
                "

              >

                Views

              </th>





              <th

                className="
                  whitespace-nowrap
                  px-5
                  py-4
                  font-medium
                "

              >

                Responses

              </th>





              <th

                className="
                  whitespace-nowrap
                  px-5
                  py-4
                  font-medium
                "

              >

                Conversion

              </th>



            </tr>


          </thead>







          <tbody>


            {
              data.map(

                (form)=>(


                  <tr

                    key={form.id}

                    className="
                      border-b
                      last:border-0
                      transition-colors
                      hover:bg-muted/20
                    "

                  >




                    <td

                      className="
                        max-w-[260px]
                        px-5
                        py-4
                        font-medium
                      "

                    >

                      <span

                        className="
                          block
                          truncate
                        "

                      >

                        {form.title}

                      </span>


                    </td>







                    <td

                      className="
                        px-5
                        py-4
                      "

                    >

                      {form.views}


                    </td>








                    <td

                      className="
                        px-5
                        py-4
                      "

                    >

                      {form.responses}


                    </td>









                    <td

                      className="
                        px-5
                        py-4
                        font-semibold
                      "

                    >

                      {form.conversion}%


                    </td>





                  </tr>


                )

              )
            }



          </tbody>




        </table>


      </div>


    </div>

  );

}